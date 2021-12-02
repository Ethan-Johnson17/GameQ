import { AppState } from "../AppState"
import { Game } from "../Models/Game"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { atlasApi, api } from "./AxiosService"
const clientId = '&client_id=RhH4WBOfK3'

class GamesService {
  async getAll(query = '') {
    const res = await atlasApi.get(query + clientId)
    AppState.atlasGames = res.data.games.map(g => new Game(g))
    logger.log(res)
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
      Pop.toast('no way.', 'error')
    }
  }

  async addToGameCloset(closetGame) {
    if (!closetGame.id) {
      const res = await api.post('api/games', closetGame)
      AppState.myGames.unshift(res.data)
      logger.log('post', closetGame.id, 'res', res)
    }
    else {
      const res = await api.put('api/games/' + closetGame.id, closetGame)
      AppState.myGames.unshift(res.data)
    }
  }

  async remove(gameId) {
    const yes = await Pop.confirm('Remove game?')
    if (!yes) { return }
    await api.delete('api/games/' + gameId)
    AppState.myGames = AppState.myGames.filter(g => g.atlasGameId !== gameId)
  }
}
export const gamesService = new GamesService()