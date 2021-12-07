import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

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
    const digit = 100000 + (Math.floor(Math.random() * 100000))
    return digit
  }

  async getByPin(pin) {
    const gamenight = await dbContext.GameNight.findOne({ pin }).populate('account')
    // if (!gamenight) {
    //   throw new BadRequest('not your game night!')
    // }
    return gamenight
  }

  async getById(id) {
    const gamenight = await dbContext.GameNight.findById(id).populate('account')
    if (!gamenight) {
      throw new BadRequest('not your game night!')
    }
    return gamenight
  }

  async edit(body) {
    const night = await this.getById(body.id)
    if (night.accountId.toString() !== body.accountId) {
      throw new Forbidden('not your game night')
    }
    const update = await dbContext.GameNight.findOneAndUpdate({ _id: body.id, accountId: body.accountId }, body, { new: true })
    return update
  }

  async cancel(id, update) {
    const night = await this.getById(id)
    if (night.accountId.toString() !== update.accountId) {
      throw new Forbidden('na')
    }
    const newNight = await dbContext.GameNight.findByIdAndUpdate(id, update, { new: true })
    return newNight
  }

  async remove(gamenightId, userId) {
    const gamenight = await this.getById(gamenightId)
    if (gamenight.accountId.toString() !== userId) {
      throw new Forbidden('What is your favorite color... wrong')
    }
    await dbContext.GameNight.findByIdAndDelete(gamenightId)
  }
}
export const gameNightsService = new GameNightsService()
