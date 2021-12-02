import { Auth0Provider } from '@bcwdev/auth0provider'
import { gamesService } from '../services/GamesService'
import BaseController from '../utils/BaseController'

export class GamesController extends BaseController {
  constructor() {
    super('/api/games')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .post('', this.create)
      // NOTE everything below id is the game id
      .get('/:id', this.getById)
      .delete('/:id', this.goodwillit)
      .put('/:id', this.edit)
  }

  async getAll(req, res, next) {
    try {
      const query = req.query
      const games = await gamesService.getAll(query)
      return res.send(games)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const game = await gamesService.getById(req.params.id)
      return res.send(game)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const game = await gamesService.create(req.body)
      return res.send(game)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      req.body.id = req.params.id
      const game = await gamesService.edit(req.body)
      return res.send(game)
    } catch (error) {
      next(error)
    }
  }

  async goodwillit(req, res, next) {
    try {
      const userId = req.userInfo.id
      const gameId = req.params.id
      await gamesService.goodwillit(gameId, userId)
      res.send('you have successfully donated to goodwill, good for you')
    } catch (error) {
      next(error)
    }
  }
}
