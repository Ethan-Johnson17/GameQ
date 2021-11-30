import { AppState } from "../AppState"
import { Game } from "../Models/Game"
import { logger } from "../utils/Logger"
import { atlasApi } from "./AxiosService"
const clientId = '&client_id=RhH4WBOfK3'

class GamesService {
  async getAll(query = '') {
    const res = await atlasApi.get(query + clientId)
    logger.log('res ', res)
    AppState.atlasGames = res.data.games.map(g => new Game(g))
    logger.log('AppState', AppState.atlasGames)
  }
}
export const gamesService = new GamesService()