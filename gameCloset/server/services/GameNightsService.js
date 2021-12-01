import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class GameNightsService {
  async create(body) {
    body.pin = this.gameCode()
    const gamenight = await dbContext.GameNight.create(body)
    return gamenight.populate('account')
  }

  async getAll(query = {}) {
    const gamenight = await dbContext.GameNight.find(query).populate('account')
    return gamenight
  }

  gameCode() {
    const digit = Math.floor(Math.random() * 100000)
    return digit
  }
  // TODO integrate this with game night

  async getByPin(pin) {
    const gamenight = await dbContext.GameNight.find({ pin }).populate('account')
    if (!gamenight) {
      throw new BadRequest('not your game night!')
    }
    return gamenight
  }

  async remove()
}
export const gameNightsService = new GameNightsService()
