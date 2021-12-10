import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api, atlasApi } from "./AxiosService"

class GameNightService {
  async createGameNight(gameData) {
    const res = await api.post('api/gamenight', gameData)
    AppState.activeGameNight = res.data
    AppState.myGameNights.push(res.data)
  }

  async getMyGameNights(query = '') {
    // this res is getting the nights I created
    const res = await api.get(query)

    // this res2 is getting the nights I've joined
    const res2 = await api.get('account/players')

    // sort by date
    let mine = this.sortByDate(res.data)
    let joined = this.sortByDate(res2.data)

    // separate arrays for nights I created and nights I've joined
    AppState.myGameNights = mine
    AppState.myAttendance = joined

    // logger.log('Game nights I created:', AppState.myGameNights)
    // logger.log('Game nights I joined:', AppState.myAttendance)
  }

  sortByDate(arr) {
    return arr.sort((a, b) => {
      return (a.gameNightDate < b.gameNightDate) ? -1 : (a.gameNightDate > b.gameNightDate) ? 1 : 0
    })
  }

  async delete(gameNightId) {


    await api.delete('/api/gamenight/' + gameNightId)
    AppState.myGameNights = AppState.myGameNights.filter(g => g.id !== gameNightId)

  }

  async cancel(gameNightId) {
    let myGameNights = AppState.myGameNights
    const res = await api.put(`api/gamenight/${gameNightId}/isCanceled`)
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
    const index = AppState.myGameNights.findIndex(g => g.id === newGameNight.id)
    if (index === -1) {
      AppState.myGameNights.unshift(newGameNight)
    }
    AppState.myGameNights.splice(index, 1, newGameNight)

  }
  async findGameNight(query = '') {
    const res = await api.get(`api/gamenight/pin/${query}`)
    AppState.activeGameNight = res.data
    return res.data
  }

  async findGameNightId(id) {
    const res = await api.get(`api/gamenight/${id}`)
    AppState.activeGameNight = res.data
    logger.log(res.data)
  }
  async getAllPlayers(gameNightId) {
    const res = await api.get(`api/gamenight/${gameNightId}/players`)
    AppState.players = res.data
    // logger.log('banana', AppState.players, res.data)
  }

}


export const gameNightService = new GameNightService()