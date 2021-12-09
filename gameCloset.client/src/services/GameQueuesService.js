import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class GameQueuesService {

  async addToGameQueue(gameObject) {
    const res = await api.post('api/gamequeue', gameObject)
    logger.log(res)
    AppState.gameQueue.push(res.data)
    // It's pushing it to the AppState because it returns an array, and if we just set it then the way we're preventing duplicates breaks


  }
  async removeGameQueue(gameQueueId) {
    await api.delete(`api/gamequeue/${gameQueueId}`)
    AppState.gameQueue = AppState.gameQueue.filter(g => g.id !== gameQueueId)
  }
  async getAllGameQueue(gameNightId) {
    // NOTE make sure you have the gamenight id being pulled through the component. this allows all game queues to be pull for that game night
    const res = await api.get(`api/gamenight/${gameNightId}/gamequeue`)
    AppState.gameQueue = res.data
    logger.log('GQ AppState', AppState.gameQueue)
  }
  async vote(gameQueueId) {
    await api.put(`api/gamequeue/${gameQueueId}/votes`)
    // NOTE make sure you have the gamequeue id in the component being passed through so you can vote on that game. also for the vote to pop up something like gamequeue.votes.length. 
    // NOTE either call this.getAllGameQueue here or check the computed to see if its listening to the right thing.will also need the game night id in this function to get all gameques again. no need for votes in the appstate

  }
  sortByVote(arr){
    return arr.sort((a, b) => {
      return (a.vote < b.vote) ? -1 : (a.vote > b.vote) ? 1 : 0
    })
  }
}

export const gameQueuesService = new GameQueuesService()