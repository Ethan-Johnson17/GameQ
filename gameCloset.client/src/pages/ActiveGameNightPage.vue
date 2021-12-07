<template>
  <div class="row justify-content-center container-fluid">
    <div class="col-md-10 card my-2 elevation-3">
      <div class="row justify-content-center">
        <div class="col-md-8 text-dark text-center">
          <!-- //NOTE bind date and time of active game here -->
          <h3>{{ activeGameNight.name }}</h3>
          <h3>{{ formatDate(activeGameNight.gameNightDate) }}</h3>
          <h3>{{ activeGameNight.location }}</h3>
          <h3 v-if="activeGameNight.isCancelled" class="text-dark bg-warning">
            Cancelled
          </h3>
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
                  ></i>
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-5">
            <div class="row mb-2">
              <div class="col-md-12 d-flex">
                <form @submit.prevent="addGame">
                  <div class="dropdown mx-4 my-2 input-group">
                    <button
                      class="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
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
          <div class="col">
            <div class="row">
              <div class="col">
                <h2>What everyone's bringing...</h2>
              </div>
            </div>
            <!-- NOTE Vfor -->
            <div class="row">
              <div class="col my-2">
                <ul>
                  <li>Item: Name of whose bringing it</li>
                </ul>
              </div>
            </div>
            <!-- NOTE wont need these are examples  -->
            <div class="row">
              <div class="col my-3">
                <ul>
                  <li>Item: Name of whose bringing it</li>
                </ul>
              </div>
            </div>
            <div class="row">
              <div class="col my-3">
                <ul>
                  <li>Item: Name of whose bringing it</li>
                </ul>
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

export default {
  setup() {
    const route = useRoute()
    const newGame = ref('Choose a game!')
    const newGameQueue = ref({})
    onMounted(async () => {
      try {
        const gameNight = AppState.activeGameNight
        if (gameNight.accountId === AppState.user.id) {
          await gameNightService.getMyGameNights('/account/gamenight')
          const found = AppState.myGameNights.find(g => g.id === route.params.id)
          AppState.activeGameNight = found
          await gamesService.getMyGames('/account/myGames')
          await gameQueuesService.getAllGameQueue(route.params.id)
        }
      } catch (error) {
        logger.error(error)
        Pop.toast('error', 'error')
      }
    })
    return {
      route,
      newGame,
      // newGameQueue,
      activeGameNight: computed(() => AppState.activeGameNight),
      closetGames: computed(() => AppState.myGames.filter(g => g.owned)),
      user: computed(() => AppState.user),
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
          // REVIEW wat ???
          // newGameQueue.value.gameId = game.id
          const game = newGame.value
          const found = AppState.myGames.find(g => g.name === game)
          logger.log('found', found)
          if (newGame.value === 'Choose a game!') { return }
          let gameObject = { gameId: found.id, gameNightId: AppState.activeGameNight.id }
          await gameQueuesService.addToGameQueue(gameObject)
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

      async vote(id) {
        try {
          logger.log('vote', id)
          await gameQueuesService.vote(id)

        } catch (error) {
          logger.error(error)
        }
      },
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