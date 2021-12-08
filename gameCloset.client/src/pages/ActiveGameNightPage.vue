<template>
  <div class="container-fluid">
    <div class="row justify-content-center p-2">
      <div class="col-md-10 card my-2 elevation-3">
        <div class="row justify-content-center">
          <div class="col-3"></div>
          <div class="col-md-6 text-dark text-center p-3">
            <h3>{{ activeGameNight.name }}</h3>
          </div>
          <div class="col-md-3 text-end p-3">
            <button
              v-if="!player"
              class="btn btn-secondary px-4"
              @click="joinGameNight(activeGameNight.pin)"
            >
              Join
            </button>
            <button
              v-if="player"
              class="btn btn-danger px-4"
              @click="unattendGameNight(player.id)"
            >
              Leave
            </button>
          </div>
        </div>
        <div class="row">
          <div class="col text-dark text-center">
            <h3>{{ formatDate(activeGameNight.gameNightDate) }}</h3>
            <h3>{{ activeGameNight.location }}</h3>
            <h3 v-if="activeGameNight.isCancelled" class="text-dark bg-warning">
              Cancelled
            </h3>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="row mb-2" v-if="player">
              <div class="col-md-4">
                <form @submit.prevent="addGame">
                  <div class="dropdown input-group">
                    <button
                      class="btn btn-secondary dropdown-toggle form-control"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style="background-color: #814cb6"
                    >
                      {{ newGame }}
                    </button>
                    <!-- TODO Filters of gameCloset games in gameQueue -->
                    <ul
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li v-for="game in closetGames" :key="game.atlasGameId">
                        <div
                          class="dropdown-item selectable"
                          :class="
                            arrOfNames.includes(game.name) ? 'disabled' : ''
                          "
                          @click="newGame = game.name"
                        >
                          {{ game.name }}
                        </div>
                      </li>
                    </ul>
                    <button
                      class="
                        btn
                        bg-white
                        border border-secondary
                        text-secondary
                        px-2
                      "
                      type="submit"
                    >
                      <i class="mdi mdi-plus-thick"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-8 mt-3">
            <h3>Vote on the Game(s) to play!</h3>
          </div>
          <!-- //NOTE Voting area will vfor over game Q for active game need to
              also decide on style of selection input like checkbox style or
              toggle button etc. -->
          <div class="col-md-7">
            <!-- TODO change g to gq -->
            <div class="row" v-for="g in gameQueue" :key="g.id">
              <div class="col d-flex">
                <!-- NOTE Checkbox style 
                  <input type="checkbox" class="btn-check" name="game" id="game" autocomplete="off">
                <label class="btn btn-outline-primary mdi mdi-thumb-up px-2 py-1 mb-2" for="game"></label>
                <label class="ms-3" for="game"></label> -->
                <p class="vote">
                  <i
                    class="mdi mdi-thumb-up f-16 pt-0 selectable h-25 me-2"
                    @click="vote(playerId)"
                  ></i>
                  {{ g.game?.name }}
                  <i
                    class="
                      mdi mdi-trash-can mdi-24px
                      text-danger
                      ms-5
                      selectable
                    "
                    @click="removeGameQueue(g.id)"
                    v-if="account.id === g.accountId"
                  ></i>
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-5">
            <div class="row">
              <div class="col-md-10 bg-primary mb-3 pb-2">
                <div class="row">
                  <div class="col text-center mt-3">
                    <h3><b>Total Votes</b></h3>
                    <hr />
                  </div>
                </div>
                <div class="row" v-for="gq in gameQueue" :key="gq.id">
                  <div class="col-9 my-2">{{ gq.game?.name }}</div>
                  <div class="col-3 my-2">{{ gq.votes.length }}</div>
                </div>
              </div>
            </div>
          </div>
          <hr />
        </div>
        <div class="row">
          <div class="col-6">
            <h3 class="mb-5">What everyone's bringing...</h3>
            <form @submit.prevent="editMyItems()">
              <div class="input-group" v-if="player">
                <input
                  required
                  type="text"
                  class="form-control"
                  id="items"
                  placeholder="Add items here..."
                  v-model="editable"
                />
                <button class="btn btn-secondary" type="submit">
                  <i class="mdi mdi-plus-thick"></i>
                </button>
              </div>
            </form>
            <div class="row" v-for="p in players" :key="p.id">
              <div class="col my-2">
                <PlayerItems :player="p" />
              </div>
            </div>
          </div>
          <div class="col-6 text-center">
            <h3 class="mb-5">Attending</h3>
            <div class="row" v-for="p in players" :key="p.id">
              <div class="col">
                <h5 class="mt-3">
                  {{ p.account.name }}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from "../AppState"
import { computed, ref } from "@vue/reactivity"
import { gameNightService } from "../services/GameNightService";
import { onMounted, watchEffect } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { gamesService } from "../services/GamesService"
import { useRoute, useRouter } from "vue-router"
import { gameQueuesService } from "../services/GameQueuesService"
import { playersService } from "../services/PlayersService";
import PlayerItems from "../components/PlayerItems.vue";

export default {
  components: { PlayerItems },
  setup() {
    const editable = ref('')
    const route = useRoute()
    const newGame = ref('Choose a game!')
    watchEffect(async () => {
      try {

        if (route.params.id) {
          await gameNightService.findGameNightId(route.params.id)
          await gameQueuesService.getAllGameQueue(route.params.id)
          await gamesService.getMyGames('/account/myGames')
          await gameNightService.getAllPlayers(route.params.id)
        }
        const gameNight = AppState.activeGameNight
        if (gameNight.accountId === AppState.account.id) {
          await gameNightService.getMyGameNights('/account/gamenight')
          const found = AppState.myGameNights.find(g => g.id === route.params.id)
          AppState.activeGameNight = found
        }
      } catch (error) {
        logger.error(error)
        Pop.toast('error', 'error')
      }
    })
    return {
      editable,
      route,
      newGame,
      player: computed(() => AppState.players.find(p => p.accountId === AppState.account.id)),

      players: computed(() => AppState.players),
      activeGameNight: computed(() => AppState.activeGameNight),
      closetGames: computed(() => AppState.myGames.filter(g => g.owned)),
      account: computed(() => AppState.account),
      gameQueue: computed(() => AppState.gameQueue),
      arrOfNames: computed(() => {
        let arrOfNames = []
        AppState.gameQueue.forEach(g => {
          arrOfNames.push(g.game.name)
        })
        return arrOfNames
      }),

      formatDate(dateString) {
        let date = new Date(dateString)
        return date.toLocaleString()
      },

      async addGame(game) {
        try {

          const game = newGame.value
          const found = AppState.myGames.find(g => g.name === game)
          if (newGame.value === 'Choose a game!') { return }
          let gameObject = { gameId: found.id, gameNightId: AppState.activeGameNight.id }
          await gameQueuesService.addToGameQueue(gameObject)
          newGame.value = 'Choose a game!'
        } catch (error) {
          logger.error(error)
          Pop.toast('Someone is bringing that game.', 'warning')

        }
      },

      async removeGameQueue(id) {
        try {
          const yes = await Pop.confirm('Delete your game?')
          if (!yes) { return }
          await gameQueuesService.removeGameQueue(id)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },

      async joinGameNight(pin) {
        try {

          await playersService.attendGameNight(pin)

        } catch (error) {
          logger.error(error)
          Pop.toast("Something went wrong joining the game!", 'error')
        }
      },

      async vote(id) {
        try {
          await gameQueuesService.vote(id)

        } catch (error) {
          logger.error(error)
        }
      },
      async editMyItems() {
        try {
          const player = AppState.players.find(p => p.account.id === AppState.account.id)
          player.items = editable.value
          await playersService.editMyItems(player)
          editable.value = ''

        } catch (error) {
          logger.error(error)
          Pop.toast(error)
        }
      },
      async unattendGameNight(id) {
        try {
          if (await Pop.confirm('Are you sure you want to leave this game night??')) {
            await playersService.unattendGameNight(id)
            await gameNightService.getAllPlayers(route.params.id)
          }

        } catch (error) {
          logger.error(error)
          Pop.toast(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
p:focus {
  background-color: red;
  color: red;
}
</style>