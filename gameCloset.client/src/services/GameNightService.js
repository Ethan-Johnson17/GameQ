import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api, atlasApi } from "./AxiosService"

class GameNightService {
  async createGameNight(gameData) {
    const res = await api.post('api/gameNight', gameData)
    logger.log('create GNService', res.data)
    AppState.activeGameNight = res.data
  }
}