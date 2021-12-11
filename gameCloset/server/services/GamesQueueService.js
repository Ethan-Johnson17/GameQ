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
    const gameq = await dbContext.GameQueue.findById(id).populate('account game')
    if (!gameq) {
      throw new BadRequest('na qqqqueueueueueueu')
    }
    return gameq
  }

  async edit(body) {
    // NOTE we first have to find the gameq id
    const gameq = await this.getById(body.id)
    // NOTE here we are setting votes to the accountId's votes if any
    const votes = gameq.votes
    // STUB here we are assigning index to the actual index of the votes(schema) array that matches your own accountId
    const index = votes.findIndex(v => v.toString() === body.accountId)
    // SECTION the if statement is checking if it exists. -1 means it doesnt so it will then push it to the array
    if (index === -1) {
      votes.push(body.accountId)
      // STUB if it does find your id in the array it will take it out thus preventing you from voting multiple times
    } else {
      votes.splice(index, 1)
    }
    // ANCHOR[epic=Scott] here it will save anytime it changes wether it adds or removes then return you the new array
    await gameq.save()
    return gameq
  }

  async remove(gameqId, userId) {
    const gameq = await this.getById(gameqId)
    if (gameq.accountId.toString() !== userId) {
      throw new Forbidden('removed ')
    }
    await dbContext.GameQueue.findByIdAndDelete(gameqId)
    return gameq
  }
}

export const gamesQueueService = new GamesQueueService()
