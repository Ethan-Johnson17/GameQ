import { AppState } from "../AppState"
import { Game } from "../Models/Game"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { atlasApi, api } from "./AxiosService"
const clientId = '&client_id=RhH4WBOfK3'

class GamesService {
  async getAll(query = '') {
    const res = await atlasApi.get(query + clientId)
    // logger.log('res ', res)
    AppState.atlasGames = res.data.games.map(g => new Game(g))
    // logger.log('AppState', AppState.atlasGames)
  }
  async getMyGames(query = '') {
    const res = await api.get(query)
    logger.log('res ', res)
    AppState.closetGames = res.data.filter(g => g.owned)
    AppState.wishlistGames = res.data.filter(g => !g.owned)
    logger.log('closet, wishlist ', AppState.closetGames, AppState.wishlistGames)
  }

  async addToWishlist(game) {
    logger.log('wishlist Service!')
    const res = await api.post('api/games', game)
    logger.log(res)
    AppState.wishlistGames.unshift(res.data)
    Pop.toast('Game added to wishlist', 'success')
  }

  async remove(gameId) {
    logger.log('remove', gameId)
    const yes = await Pop.confirm('Remove game?')
    if (!yes) { return }
    await api.delete('api/games/' + gameId)
    AppState.wishlistGames = AppState.wishlistGames.filter(g => g.id !== gameId)
    AppState.closetGames = AppState.closetGames.filter(g => g.id !== gameId)
  }
}
export const gamesService = new GamesService()