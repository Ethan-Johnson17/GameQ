import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class GameQueuesService {

  async addToGameQueue(gameObject) {
    const res = await api.post('api/gamequeue', gameObject)
    logger.log(res)
    AppState.gameQueue.push(res.data)
  }
}

export const gameQueuesService = new GameQueuesService()