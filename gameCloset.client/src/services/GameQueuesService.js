import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class GameQueuesService {

  async addToGameQueue(gameObject) {
    const res = await api.post('api/gamequeue', gameObject)
    logger.log(res)
    AppState.gameQueue.push(res.data)
  }
  async removeGameQueue(gameQueueId) {
    await api.delete(`api/gamequeue/${gameQueueId}`)
    AppState.gameQueue.filter(gq => gq.id === gameQueueId)
    // NOTE we need the gameque id from the component.
    // NOTE  either call the get all game queue functon here or make sure the computed in the component is listening for the right thing

  }
  async getAllGameQueue(gameNightId) {
    // NOTE make sure you have the gamenight id being pulled through the component. this allows all game queues to be pull for that game night
    const res = await api.get(`api/gamenight/${gameNightId}/gamequeue`)
    AppState.gameQueue.push(res.data)
    logger.log('GQ AppState', AppState.gameQueue)
  }
  async vote(gameQueueId) {
    await api.put(`api/gamequeue/${gameQueueId}/votes`)
    // NOTE make sure you have the gamequeue id in the component being passed through so you can vote on that game. also for the vote to pop up something like gamequeue.votes.length. 
    // NOTE either call this.getAllGameQueue here or check the computed to see if its listening to the right thing.will also need the game night id in this function to get all gameques again. no need for votes in the appstate

  }
}

export const gameQueuesService = new GameQueuesService()