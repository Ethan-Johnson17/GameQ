import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { SocketHandler } from '../utils/SocketHandler'
import { gameNightService } from './GameNightService'

class SocketService extends SocketHandler {
  constructor() {
    super()
    this
      .on('error', this.onError)
      .on('New Game Que', this.newGameQ)
      .on('Removed Game Que', this.removedGameQ)
      .on('Votes on Game Que', this.votes)
      .on('Attending Game Night', this.newPlayer)
      .on('Leaving Game Night', this.deletePlayer)
      .on('Bringing Game Night', this.bringing)
  }
  newGameQ(newGameQ) {
    AppState.gameQueue.push(newGameQ)
  }

  removedGameQ(gameQId) {
    AppState.gameQueue = AppState.gameQueue.filter(g => g.id !== gameQId)
  }

  votes(gameQ) {
    let index = AppState.gameQueue.findIndex(g => g.id === gameQ.id)
    AppState.gameQueue.splice(index, 1, gameQ)
  }
  newPlayer(playerId) {
    AppState.players = [...AppState.players, playerId]
  }
  deletePlayer(player) {
    AppState.players = AppState.players.filter(p => p.id !== player.id)
    AppState.gameQueue = AppState.gameQueue.filter(g => g.accountId !== player.accountId)
  }
  bringing(player) {
    let index = AppState.players.findIndex(p => p.id === player.id)
    if (index === -1) {
      AppState.players.push(player)
      return
    }
    AppState.players.splice(index, 1, player)
  }

  onError(e) {
    Pop.toast(e.message, 'error')
  }
}

export const socketService = new SocketService()
