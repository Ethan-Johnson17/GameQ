import { AppState } from "../AppState"
import { Game } from "../Models/Game"
import { logger } from "../utils/Logger"
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
}
export const gamesService = new GamesService()