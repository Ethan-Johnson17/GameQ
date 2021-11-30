import { Auth0Provider } from '@bcwdev/auth0provider'
import { gameNightsService } from '../services/GameNightsService'
import BaseController from '../utils/BaseController'

export class GameNightsController extends BaseController {
  constructor() {
    super('/api/gamenight')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
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
}
