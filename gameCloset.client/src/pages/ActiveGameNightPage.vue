<template>
  <div class="container-fluid">
    <div class="row justify-content-center p-2">
      <div class="col-md-10 card my-2 elevation-3 px-5 py-3">
        <div class="row justify-content-center">
          <div class="col-3">
            <h5 class="m-3">PIN: {{ activeGameNight.pin }}</h5>
          </div>

          <div class="col-md-6 text-dark text-center p-3">
            <h3>{{ activeGameNight.name }}</h3>
          </div>
          <div class="col-md-3 text-end p-1">
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
          <div class="col-md-6">
            <!-- TODO change g to gq -->
            <h3>Vote on the Game(s) to play!</h3>
            <div class="row" v-for="g in gameQueue" :key="g.id">
              <div class="col">
                <!-- NOTE Checkbox style 
                  <input type="checkbox" class="btn-check" name="game" id="game" autocomplete="off">
                <label class="btn btn-outline-primary mdi mdi-thumb-up px-2 py-1 mb-2" for="game"></label>
                <label class="ms-3" for="game"></label> -->
                <div class="vote d-flex">
                  <div v-if="player">
                    <i
                      class="
                        mdi mdi-thumb-up-outline
                        text-secondary
                        f-16
                        pt-0
                        selectable
                        h-25
                        me-2
                      "
                      @click="vote(g.id)"
                      v-if="!g.votes.includes(account.id)"
                    ></i>
                    <i
                      class="
                        mdi mdi-thumb-up
                        text-secondary
                        f-16
                        pt-0
                        selectable
                        h-25
                        me-2
                      "
                      @click="vote(g.id)"
                      v-if="g.votes.includes(account.id)"
                    ></i>
                  </div>
                  <p
                    class="mb-0 selectable"
                    data-bs-toggle="offcanvas"
                    :data-bs-target="'#gameDetails-' + g.game.id"
                  >
                    {{ g.game?.name }}
                  </p>
                  <i
                    class="
                      mdi mdi-trash-can
                      f-20
                      text-danger
                      ms-auto
                      selectable
                    "
                    @click="removeGameQueue(g.id)"
                    v-if="account.id === g.accountId"
                  ></i>
                </div>
              </div>
              <OffCanvas :id="'gameDetails-' + g.game.id">
                <template #offcanvas-title>{{ g.game.name }} Details</template>
                <template #offcanvas-body>
                  <GameDetails :game="g.game" />
                </template>
              </OffCanvas>
            </div>
          </div>
          <div class="col-md-6">
            <div class="row justify-content-end">
              <div class="col-md-10 bg-primary mb-3 pb-2 mx-2">
                <div class="row">
                  <div class="col text-center mt-3">
                    <h3><b>Total Votes</b></h3>
                    <hr />
                  </div>
                </div>
                <div class="row" v-for="gq in sortedGameQueue" :key="gq.id">
                  <div class="col-9 my-2 mdi" v-if="gq == sortedGameQueue[0]">
                    {{ gq.game?.name }} <i class="mdi mdi-chess-king ms-1"> </i>
                    <hr />
                  </div>
                  <div class="col-9 my-2 mdi" v-else>{{ gq.game?.name }}</div>
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
                  maxlength="1000"
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
              <div class="col d-flex">
                <img class="pic me-3 my-1" :src="p.account.picture" alt="" />
                <h5 class="mt-3">
                  {{ p.account.name }}
                </h5>
                <p class="fnt ms-3 py-1 mt-2 text-grey">{{ p.account.rank }}</p>
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
import { socketService } from '../services/SocketService';
import { router } from "../router";
import { accountService } from '../services/AccountService';

export default {
  components: { PlayerItems },
  setup() {
    const editable = ref('')
    const route = useRoute()
    const router = useRouter()
    const newGame = ref('Choose a game!')
    watchEffect(async () => {
      try {

        if (route.params.id) {
          await gameNightService.findGameNightId(route.params.id)
          await gameQueuesService.getAllGameQueue(route.params.id)
          await gamesService.getMyGames('/account/myGames')
          await gameNightService.getAllPlayers(route.params.id)
          socketService.joinRoom(route.params.id)
        }
        const gameNight = AppState.activeGameNight
        if (gameNight.accountId === AppState.account.id) {
          await gameNightService.getMyGameNights('/account/gamenight')
          const found = AppState.myGameNights.find(g => g.id === route.params.id)
          AppState.activeGameNight = found
          socketService.joinRoom(route.params.id)

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
      sortedGameQueue: computed(() => [...AppState.gameQueue].sort((a, b) => {
        return b.votes.length - a.votes.length
      })),
      arrOfNames: computed(() => AppState.gameQueue.map(g => g.game.name)),

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
          this.addXp()
        } catch (error) {
          logger.error(error)
          Pop.toast("Something went wrong joining the game!", 'error')
        }
      },

      async addXp() {
        let account = AppState.account
        account.xp += 5
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

      async minusXp() {
        let account = AppState.account
        account.xp -= 5
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

      async vote(id) {
        try {
          await gameQueuesService.vote(id)
          // await gameQueuesService.getAllGameQueue(route.params.id)
        } catch (error) {
          logger.error(error)
        }
      },
      async editMyItems() {
        try {
          const player = AppState.players.find(p => p.account.id === AppState.account.id)
          // player.items = editable.value
          let update = { ...player, items: editable.value }
          await playersService.editMyItems(update)
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
            router.push({
              name: "GameNight",
            })
          }
          this.minusXp()
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

.pic {
  height: 50px;
  width: 50px;
  object-fit: cover;
  border-radius: 50%;
}

.fnt {
  font-size: 12px;
}
</style>