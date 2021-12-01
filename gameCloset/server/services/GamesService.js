import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class GamesService {
  async getAll(query = {}) {
    const games = await dbContext.Game.find(query)
    return games
  }

  async getById(id) {
    const game = await dbContext.Game.findById(id).populate('account')
    if (!game) {
      throw new BadRequest('na Bro')
    }
    return game
  }

  async create(body) {
    const gameurl = await this.getById(body.id)
    if (gameurl.id.toString() === body.id) {
      throw new BadRequest('you cant have two of the same game')
    }
    const game = await dbContext.Game.create(body)
    return game.populate('account')
  }

  async edit(body) {
    const game = await this.getById(body.id)
    if (game.accountId.toString() !== body.accountId) {
      throw new Forbidden('stop that!!')
    }
    const myGame = await dbContext.Game.findOneAndUpdate({ _id: body.id, accountId: body.accountId }, body, { new: true })
    return myGame
  }

  async goodwillit(gameId, userId) {
    const game = await this.getById(gameId)
    // if (game.accountId.toString() !== userId) {
    //   throw new Forbidden('Wat!!')
    // }
    await dbContext.Game.findByIdAndDelete(gameId)
  }
}
export const gamesService = new GamesService()
