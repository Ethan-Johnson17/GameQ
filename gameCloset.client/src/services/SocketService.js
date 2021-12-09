import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { SocketHandler } from '../utils/SocketHandler'

class SocketService extends SocketHandler {
  constructor() {
    super()
    this
      .on('error', this.onError)
      .on('New Game Que', this.newGameQ)
      .on('Removed Game Que', this.removedGameQ)
      .on('Votes on Game Que', this.votes)
      .on('Attending Game Night', this.newPlayer)
  }
  newGameQ(newGameQ) {
    AppState.gameQueue.push(newGameQ)
    logger.log('newGameQ Socket', newGameQ)
  }

  removedGameQ(gameQId) {
    AppState.gameQueue = AppState.gameQueue.filter(g => g.id !== gameQId)
  }

  votes(gameQ) {
    let index = AppState.gameQueue.findIndex(g => g.id === gameQ.id)
    AppState.gameQueue.splice(index, 1, gameQ)
  }
  // newPlayer(playerId) {
  //   AppState.players = [...AppState.players, playerId]

  // }

  onError(e) {
    Pop.toast(e.message, 'error')
  }
}

export const socketService = new SocketService()
