import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async edit(account) {
    const res = await api.put('account/', account)
    // logger.log(res.data)
    AppState.account = res.data
  }
  async addItem(id){
    const res = await api.put(`api/player/${id}`)
    logger.log(res.data)
    AppState.player =res.data
  }

}

export const accountService = new AccountService()
