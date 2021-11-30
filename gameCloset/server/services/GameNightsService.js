import { dbContext } from '../db/DbContext'

class GameNightsService {
  async create(body) {
    body.pin = this.gameCode()
    const gamenight = await dbContext.GameNight.create(body)
    return gamenight.populate('account')
  }

  gameCode() {
    const digit = Math.floor(Math.random() * 100000)
    return digit
  }
// TODO integrate this with game night
}
export const gameNightsService = new GameNightsService()
