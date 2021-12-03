import { Auth0Provider } from '@bcwdev/auth0provider'
import { dbContext } from '../db/DbContext'
import { gameNightsService } from '../services/GameNightsService'
import { playersService } from '../services/PlayersService'
import BaseController from '../utils/BaseController'

export class GameNightsController extends BaseController {
  constructor() {
    super('/api/gamenight')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)

      .get('/:pin', this.getByPin)
      // NOTE this id is the Gamenight id
      .delete('/:id', this.remove)
      // NOTE  this id is the Gamenight id
      .put('/:id', this.edit)
      .put('/:id/isCanceled', this.cancel)
      // NOTE this id is the gamenight id
      .get('/:id/players', this.getPlayers)
  }

  async create(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const gamenight = await gameNightsService.create(req.body)
      return res.send(gamenight)
    } catch (error) {
      next(error)
    }
  }

  async getByPin(req, res, next) {
    try {
      const gamenight = await gameNightsService.getByPin(req.params.pin)
      return res.send(gamenight)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      req.body.id = req.params.id
      const night = await gameNightsService.edit(req.body)
      return res.send(night)
    } catch (error) {
      next(error)
    }
  }

  async cancel(req, res, next) {
    try {
      const accountId = req.userInfo.id
      const id = req.params.id
      const cancelGamenight = await gameNightsService.cancel(id, { isCanceled: true, accountId: accountId })
      return res.send(cancelGamenight)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      const userId = req.userInfo.id
      const gamenightId = req.params.id
      await gameNightsService.remove(gamenightId, userId)
      res.send('Sad day, you cancelled on me')
    } catch (error) {
      next(error)
    }
  }

  async getPlayers(req, res, next) {
    try {
      const gameNight = await playersService.getGameNightPlayers({ id: req.params.id })
      return res.send(gameNight)
    } catch (error) {
      next(error)
    }
  }
}
