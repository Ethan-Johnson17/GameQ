import { AppState } from "../AppState"
import { api } from "./AxiosService"

class PlayersService{
  async attendGameNight(pin){
    const res = await api.post(`api/gamenight/${pin}`)
    AppState.player = [...AppState.player, res.data]
  }
  async unattendGameNight(playerId){
    await api.delete(`api/players/${playerId}`)
    //  NOTE call the all my attendance function here
  }
  async editMyItems(player){
    const res = await api.put(`api/player/${player.id}`, player)
    const newPlayer = res.data
    AppState.player = newPlayer
    const index = AppState.player.filter(p => p.id === player.id)
      if(index === -1){
        AppState.player.push(newPlayer)
        return
      }
    AppState.player.splice(index, 1, newPlayer)

  }
  async getGameNightsImAttending(){
    const res = await api.get('account/players')
    AppState.myAttending = res.data
  }

}

export const playersService = new PlayersService()