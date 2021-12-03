import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
import { gameNightsService } from '../services/GameNightsService'

class PlayersService {
  async edit(body) {
    const player = await this.getById(body.id)
    if (player.accountId.toString() !== body.accountId) {
      throw new Forbidden('stawp, na player')
    }
    const updatePlayer = await dbContext.Player.findByIdAndUpdate({ _id: body.id, accountId: body.accountId }, body, { new: true })
    return updatePlayer
  }

  async getById(id) {
    const player = await dbContext.Player.findById(id).populate('account')
    if (!player) {
      throw new BadRequest('na playa')
    }
    return player
  }

  async create(body) {
    const game = await gameNightsService.getByPin(body.pin)
    body.gameNightId = game.id
    const found = await dbContext.Player.findOne({ gameNightId: game.id, accountId: body.accountId, gameNightPin: body.pin })
    if (found) {
      throw new BadRequest('ya silly willy')
    }
    const attend = await dbContext.Player.create(body)
    await attend.populate('account gameNight')
    return attend
  }

  async getGameNightPlayers(query = {}) {
    const gameNight = await dbContext.Player.find(query).populate('account')
    return gameNight
  }

  async unattend(playerId, userId) {
    const found = await dbContext.Player.findById(playerId)
    if (found.accountId.toString() !== userId) {
      throw new Forbidden('what are you doing??')
    }
    await dbContext.Player.findByIdAndDelete(playerId)
  }

  async getMyAttendance(query = {}) {
    const myAttendance = await dbContext.Player.find(query).populate('gameNight')
    return myAttendance
  }
}

export const playersService = new PlayersService()
