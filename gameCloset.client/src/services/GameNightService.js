import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api, atlasApi } from "./AxiosService"

class GameNightService {
  async createGameNight(gameData) {
    const res = await api.post('api/gamenight', gameData)
    // logger.log('create GNService', res)
    AppState.activeGameNight = res.data
    AppState.myGameNights.push(res.data)
  }

  async getMyGameNights(query = '') {
    const res = await api.get(query)
    AppState.myGameNights = res.data
  }

  async delete(gameNightId) {
    let myGameNights = AppState.myGameNights
    // logger.log('gameNightId', gameNightId)
    const yes = await Pop.confirm('Delete your game night?')
    if (!yes) { return }
    await api.delete('/api/gamenight/' + gameNightId)
    myGameNights = myGameNights.filter(g => g.id !== gameNightId)
  }

  async cancel(gameNightId) {
    // let myGameNights = AppState.myGameNights
    // logger.log(myGameNights, gameNightId)

    const yes = await Pop.confirm('Cancel your game night?')
    if (!yes) { return }
    await api.put(`api/gamenight/${gameNightId}/isCanceled`)
    Pop.toast("You've canceled your event.", 'success')
  }

  async edit(id, gameNight) {
    const res = await api.put(`api/gamenight/${id}`, gameNight)
    const newGameNight = res.data
    // AppState.activeGameNight = newGameNight
    const index = AppState.myGameNights.findIndex(g => g.id === newGameNight)
    // if (index === -1) {
    //   AppState.myGameNights.unshift(newGameNight)
    // }
    AppState.myGameNights.splice(index, 1, newGameNight)

  }
}

export const gameNightService = new GameNightService()