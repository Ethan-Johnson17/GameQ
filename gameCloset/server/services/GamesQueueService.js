import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class GamesQueueService {
  async create(body) {
    const gameq = await dbContext.GameQueue.create(body)
    return gameq.populate('game')
  }

  async getAll(query = {}) {
    const gameq = await dbContext.GameQueue.find(query).populate('account game')
    return gameq
  }

  async getById(id) {
    const gameq = await dbContext.GameQueue.findById(id).populate('account')
    if (!gameq) {
      throw new BadRequest('na qqqqueueueueueueu')
    }
    return gameq
  }

  async edit(body) {
    const vote = await this.getById(body.id)
    // if (vote) {
    //   throw new Forbidden('stay in yo lane playa')
    // }
    const update = await dbContext.GameQueue.findByIdAndUpdate({ _id: body.id, accountId: body.accountId }, body, { new: true })
    return update
  }

  async remove(gameqId, userId) {
    const gameq = await this.getById(gameqId)
    if (gameq.accountId.toString() !== userId) {
      throw new Forbidden('removed ')
    }
    await dbContext.GameQueue.findByIdAndDelete(gameqId)
  }
}

export const gamesQueueService = new GamesQueueService()
