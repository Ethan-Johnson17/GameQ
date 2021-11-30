import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { atlasApi } from "./AxiosService"
const clientId = '&client_id=RhH4WBOfK3'

class GamesService {
  async getAll(query = '') {
    const res = await atlasApi.get(query + clientId)
    logger.log(res)
    AppState.atlasGames.map(g => new Game(g))
  }
}
export const gamesService = new GamesService()