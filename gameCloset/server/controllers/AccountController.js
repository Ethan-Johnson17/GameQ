import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { gameNightsService } from '../services/GameNightsService'
import { gamesService } from '../services/GamesService'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .put('', this.updateAccount)
      .get('/myGames', this.getMyGames)
      .get('/gamenight', this.getMyGameNights)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getMyGameNights(req, res, next) {
    try {
      const accountId = req.userInfo.id
      const gamenight = await gameNightsService.getAll({ accountId: accountId })
      return res.send(gamenight)
    } catch (error) {
      next(error)
    }
  }

  async getMyGames(req, res, next) {
    try {
      const accountId = req.userInfo.id
      const myGames = await gamesService.getMyGames({ accountId: accountId })
      return res.send(myGames)
    } catch (error) {
      next(error)
    }
  }

  async updateAccount(req, res, next) {
    try {
      req.body.id = req.userInfo.id
      const updatedAccount = await accountService.updateAccount(req.userInfo, req.body)
      return res.send(updatedAccount)
    } catch (error) {
      next(error)
    }
  }
}
