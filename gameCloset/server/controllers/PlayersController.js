import { Auth0Provider } from '@bcwdev/auth0provider'
import { playersService } from '../services/PlayersService'
import BaseController from '../utils/BaseController'

export class PlayersController extends BaseController {
  constructor() {
    super('/api/players')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      // NOTE the player id is created when a user has used the pin to enter a gamenight
      .post('/:pin', this.create)
      // NOTE this id is the player id
      .put('/:id', this.edit)
      // NOTE this id is the player id
      .delete('/:id', this.unattend)
  }

  async edit(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      req.body.id = req.params.id
      const player = await playersService.edit(req.body)
      return res.send(player)
    } catch (error) {
      next(error)
    }
  }

  async unattend(req, res, next) {
    try {
      const userId = req.userInfo.id
      const playerId = req.params.id
      await playersService.unattend(playerId, userId)
      res.send('later tader')
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.pin = req.params.pin
      req.body.accountId = req.userInfo.id
      const player = await playersService.create(req.body)
      return res.send(player)
    } catch (error) {
      next(error)
    }
  }
}
