import { AppState } from "../AppState"
import { Game } from "../Models/Game"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { atlasApi, api } from "./AxiosService"
const clientId = '&client_id=RhH4WBOfK3'

class GamesService {
  async getAll(query = '') {
    const res = await atlasApi.get(query + '&limit=24' + clientId)
    AppState.atlasGames = res.data.games.map(g => new Game(g))
  }
  async getMyGames(query = '') {
    const res = await api.get(query)
    AppState.myGames = res.data.map(g => new Game(g))
  }

  async addToWishlist(game) {
    const found = AppState.myGames.find(g => g.atlasUrl == game.atlasUrl)
    if (!found) {
      const res = await api.post('api/games', game)
      AppState.myGames.unshift(res.data)
    } else {
      Pop.toast('Already in wishlist.', 'error')
    }
  }

  async addToGameCloset(closetGame) {
    if (!closetGame.id) {
      const res = await api.post('api/games', closetGame)
      AppState.myGames.unshift(res.data)
    }
    else {
      await api.put('api/games/' + closetGame.id, closetGame)
    }
  }

  async addRules(gameId, closetGame) {
    logger.log('adding rules', gameId, closetGame)
    const res = await api.put('api/games/' + gameId, closetGame)
    // logger.log('adding', res.data)
  }

  async remove(gameId) {
    const yes = await Pop.confirm('Remove game?')
    if (!yes) { return }
    await api.delete('api/games/' + gameId)
    AppState.myGames = AppState.myGames.filter(g => g.id !== gameId)
  }
}
export const gamesService = new GamesService()