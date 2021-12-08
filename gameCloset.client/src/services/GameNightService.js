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
    let response = this.sortByDate(res.data)
    AppState.myGameNights = response
  }

  sortByDate(arr) {
    return arr.sort((a, b) => {
      return (a.gameNightDate < b.gameNightDate) ? -1 : (a.gameNightDate > b.gameNightDate) ? 1 : 0
    })
  }

  async delete(gameNightId) {

    // logger.log('gameNightId', gameNightId)

    await api.delete('/api/gamenight/' + gameNightId)
    AppState.myGameNights = AppState.myGameNights.filter(g => g.id !== gameNightId)
    // NOTE[epic=Tristan] It won't be responsive if you alias out appstate

  }

  async cancel(gameNightId) {
    let myGameNights = AppState.myGameNights
    // logger.log(myGameNights, gameNightId)
    const res = await api.put(`api/gamenight/${gameNightId}/isCanceled`)
    // TODO update appstate with upto date information
    const editedGameNight = res.data
    const index = AppState.myGameNights.findIndex(g => g.id === editedGameNight.id)
    if (index === -1) {
      AppState.myGameNights.unshift(editedGameNight)
    }
    myGameNights.splice(index, 1, editedGameNight)

  }

  async edit(id, gameNight) {
    const res = await api.put(`api/gamenight/${id}`, gameNight)
    const newGameNight = res.data
    // AppState.activeGameNight = newGameNight
    // REVIEW[epic=Tristan] test this 
    const index = AppState.myGameNights.findIndex(g => g.id === newGameNight.id)
    if (index === -1) {
      AppState.myGameNights.unshift(newGameNight)
    }
    AppState.myGameNights.splice(index, 1, newGameNight)

  }
  async findGameNight(query = '') {
    const res = await api.get(`api/gamenight/pin/${query}`)
    AppState.activeGameNight = res.data
    // logger.log(AppState.activeGameNight)
  }

  async findGameNightId(id) {
    // debugger
    const res = await api.get(`api/gamenight/${id}`)
    AppState.activeGameNight = res.data
    logger.log(res.data)
  }

}


export const gameNightService = new GameNightService()