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
  }
  newGameQ(newGameQ) {
    AppState.gameQueue.push(newGameQ)
    logger.log('newGameQ Socket', newGameQ)
  }
  onError(e) {
    Pop.toast(e.message, 'error')
  }
}

export const socketService = new SocketService()
