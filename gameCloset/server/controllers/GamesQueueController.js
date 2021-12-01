import { Auth0Provider } from '@bcwdev/auth0provider'
import { gamesQueueService } from '../services/GamesQueueService'
import BaseController from '../utils/BaseController'

export class GamesQueueController extends BaseController {
  constructor() {
    super('/api/gamequeue')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .get('/:id', this.getById)
      .get('', this.getAll)
      .put('/:id/votes', this.edit)
      .delete('/:id', this.remove)
  }

  async create(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const gameq = await gamesQueueService.create(req.body)
      return res.send(gameq)
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      const query = req.query
      const gameq = await gamesQueueService.getAll(query)
      return res.send(gameq)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const gameq = await gamesQueueService.getById(req.params.id)
      return res.send(gameq)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      req.body.id = req.params.id
      const vote = await gamesQueueService.edit(req.body)
      return res.send(vote)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      const userId = req.userInfo.id
      const gameqId = req.params.id
      await gamesQueueService.remove(gameqId, userId)
      res.send('no more gq games')
    } catch (error) {
      next(error)
    }
  }
}
