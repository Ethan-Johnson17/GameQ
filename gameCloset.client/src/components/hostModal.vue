<template>
  <div
    class="modal fade"
    id="hostModal"
    aria-hidden="true"
    aria-labelledby="hostModal"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-secondary">
          <h5 class="modal-title" id="exampleModalToggleLabel">
            Host a Game Night
          </h5>
          <button
            type="button"
            class="btn-close bg-secondary"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <form @submit.prevent="createGameNight()">
          <div class="modal-body">
            <div class="row">
              <div class="col m-2">
                <input
                  type="text"
                  aria-label="name"
                  placeholder="Name your game night"
                  class="form-control"
                  v-model="state.editable.name"
                  required
                />
              </div>
            </div>
            <div class="row">
              <div class="col m-2">
                <input
                  type="text"
                  aria-label="location"
                  placeholder="Location"
                  class="form-control"
                  v-model="state.editable.location"
                  required
                />
              </div>
            </div>
            <div class="row">
              <div class="col m-2">
                <input
                  type="datetime-local"
                  aria-label="date"
                  placeholder="Date"
                  class="form-control"
                  v-model="state.editable.gameNightDate"
                  required
                />
              </div>
            </div>
            <div class="dropdown mx-4 my-2">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                required
              >
                {{ gameQueue }}
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li v-for="game in closetGames" :key="game.atlasGameId">
                  <div
                    class="dropdown-item selectable"
                    @click="gameQueue = game.name"
                  >
                    {{ game.name }}
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div class="modal-footer">
            <button
              type="submit"
              class="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import { reactive, computed, ref } from "@vue/reactivity";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { useRoute, useRouter } from "vue-router";
import { AppState } from "../AppState";
import { gameNightService } from "../services/GameNightService";
import { gameQueuesService } from "../services/GameQueuesService"
import { playersService } from "../services/PlayersService";
import { accountService } from '../services/AccountService';



export default {
  setup() {
    let router = useRouter()
    const newPlayer = ref({})
    const gameQueue = ref('Choose a game!')
    const state = reactive({
      editable: {},
    });
    return {
      closetGames: computed(() => AppState.myGames.filter(g => g.owned)),
      gameQueue,
      state,




      async createGameNight() {

        try {
          const game = gameQueue.value
          logger.log('create', state.editable, 'gameQueue', game)
          await gameNightService.createGameNight(state.editable)
          this.addXp()
          const gameNight = AppState.activeGameNight
          await playersService.attendGameNight(gameNight.pin)

          const found = AppState.myGames.find(g => g.name === game)
          logger.log('Active GameNight', AppState.activeGameNight)
          logger.log('Player', AppState.players)
          let gameObject = { gameId: found.id, gameNightId: AppState.activeGameNight.id }
          await gameQueuesService.addToGameQueue(gameObject)
          router.push({
            name: "GameNightDetails",
            params: { id: AppState.activeGameNight.id }
          })
          state.editable = {}

        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }


        // const gameId = AppState.activeGame.id
        // router.push({
        //   name: "active",
        //   params: { id: gameId }
        // })
        // newPlayer.value.accountId = AppState.account.id
        // newPlayer.value.gameNightId = route.params.id
      },

      async addXp() {
        let account = AppState.account
        account.xp += 25
        if (account.xp >= 640) {
          account.rank = 'Noob-Slayer'
        }
        else if (account.xp >= 320) {
          account.rank = 'Royalty'
        }
        else if (account.xp >= 160) {
          account.rank = 'Champion'
        }
        else if (account.xp >= 80) {
          account.rank = 'Knight'
        }
        else if (account.xp >= 40) {
          account.rank = 'Squire'
        }
        logger.log('xp', account)
        await accountService.edit(account)
      },
    }
  }
}
</script>


<style lang="scss" scoped>
</style>