<template>
  <div class="gameNight container-fluid p-5">
    <div class="row">
      <div class="col text-center">
        <h1 class="text-light">GAME NIGHTS</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3 my-3 text-center">
        <form @submit.prevent="findGameNight">
          <div class="input-group mb-3">
            <input
              required
              v-model="search"
              type="text"
              class="form-control"
              placeholder="Enter code..."
              aria-label="Enter code..."
              aria-describedby="button-addon2"
              maxlength="6"
            />
            <button class="btn btn-outline-light" title="Find Game">
              Find Game
            </button>
          </div>
        </form>
      </div>
      <div class="col-md-3 ms-auto my-3 text-end">
        <button
          class="btn btn-outline-light"
          data-bs-toggle="modal"
          data-bs-target="#hostModal"
        >
          Host
        </button>
      </div>
    </div>
    <h3 class="text-light">Hosted Game Nights:</h3>
    <div class="row" v-for="g in myGameNights" :key="g.id">
      <div class="col">
        <div class="row justify-content-center">
          <div
            class="col-md-8 mt-3 card elevation-2 selectable grow"
            title="Game Night Details"
          >
            <div class="row">
              <div class="col">
                <div class="col text-end dropdown">
                  <i
                    class="
                      rounded
                      p-2
                      mdi mdi-dots-horizontal mdi-24px
                      text-dark
                      selectable
                      dropdown-toggle
                    "
                    data-bs-toggle="dropdown"
                    title="Options"
                  ></i>
                  <ul class="dropdown-menu">
                    <!-- <li>
                      <button class="dropdown-item selectable text-primary" data-bs-toggle="modal"
                        data-bs-target="#qrCodeModal">
                        QR Code
                        <QRCodeModal />
                    </button>
                    </li> -->
                    <li
                      data-bs-toggle="modal"
                      :data-bs-target="'#editGameNight-' + g.id"
                    >
                      <button class="dropdown-item selectable text-primary">
                        Edit Event
                      </button>
                    </li>

                    <li>
                      <button
                        class="dropdown-item selectable text-primary"
                        @click="cancelGameNight(g.id)"
                      >
                        Cancel Event
                      </button>
                    </li>
                    <li>
                      <button
                        class="dropdown-item selectable text-danger"
                        @click="deleteGameNight(g.id)"
                      >
                        Delete Event
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <div :class="g.isCanceled ? 'disabled' : ''">
                <router-link
                  :to="{ name: 'GameNightDetails', params: { id: g.id } }"
                  @click="setActive(g)"
                >
                  <div class="row">
                    <div class="col-6 mt-2">
                      <h4>{{ g.name }}</h4>
                    </div>
                    <div class="col-6 mt-2 text-end">
                      <h5>Game Pin: {{ g.pin }}</h5>
                    </div>
                  </div>
                  <div class="row justify-content-center" v-if="!g.isCanceled">
                    <div class="col-md-6 my-3">
                      <div class="row">
                        <div class="col">
                          <h3 class="text-danger">
                            {{ compareDate(g.gameNightDate) }}
                          </h3>
                          <h5>{{ formatDate(g.gameNightDate) }}</h5>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col">
                          <h5>{{ g.location }}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="row justify-content-center text-danger"
                    v-if="g.isCanceled"
                  >
                    <div class="col-md-6 my-3">
                      <div class="row">
                        <div class="col">
                          <h5>This game night has been canceled.</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal :id="'editGameNight-' + g.id">
        <template #modal-title>Edit your game night!</template>
        <template #modal-body>
          <EditForm :gameNight="g" />
        </template>
      </Modal>
    </div>
    <div class="row">
      <div class="col">
        <h3 class="text-light my-4">Joined Game Nights:</h3>
        <div class="row" v-for="a in myAttendance" :key="a.gameNightId">
          <div class="col" v-if="a.gameNight.accountId !== account.id">
            <div class="row justify-content-center">
              <div
                class="col-md-8 m-3 card elevation-2 selectable grow"
                title="Game Night Details"
              >
                <div class="row">
                  <div class="col">
                    <div>
                      <div :class="a.gameNight.isCanceled ? 'disabled' : ''">
                        <router-link
                          :to="{
                            name: 'GameNightDetails',
                            params: { id: a.gameNightId },
                          }"
                          @click="setActive(a.gameNight)"
                        >
                          <div class="row">
                            <div class="col-6 mt-2">
                              <h4>{{ a.gameNight.name }}</h4>
                            </div>
                            <div class="col-6 mt-2 text-end">
                              <h5>Game Pin: {{ a.gameNight.pin }}</h5>
                            </div>
                          </div>
                          <div
                            class="row justify-content-center"
                            v-if="!a.gameNight.isCanceled"
                          >
                            <div class="col-md-6 my-3">
                              <div class="row">
                                <div class="col">
                                  <h3 class="text-danger">
                                    {{ compareDate(a.gameNight.gameNightDate) }}
                                  </h3>
                                  <h5>
                                    {{ formatDate(a.gameNight.gameNightDate) }}
                                  </h5>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col">
                                  <h5>{{ a.gameNight.location }}</h5>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            class="row justify-content-center text-danger"
                            v-if="a.gameNight.isCanceled"
                          >
                            <div class="col-md-6 my-3">
                              <div class="row">
                                <div class="col">
                                  <h5>This game night has been canceled.</h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </router-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <QRCodeModal :gameNight="gameNight" /> -->
    </div>
  </div>
  <hostModal />
</template>


<script>
import { AppState } from "../AppState"
import { computed, reactive, ref } from "@vue/reactivity"
import { gameNightService } from "../services/GameNightService";
import { onMounted, watchEffect } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { gamesService } from "../services/GamesService"
import { useRouter } from "vue-router";
import { accountService } from '../services/AccountService';


export default {

  setup() {
    const search = ref('')
    const router = useRouter();
    const state = reactive({
      editable: {}
    })
    onMounted(async () => {

      try {
        await gameNightService.getMyGameNights('/account/gamenight')
        await gamesService.getMyGames('/account/myGames')
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      search,
      state,
      closetGames: computed(() => AppState.myGames.filter(g => g.owned)),
      myGameNights: computed(() => AppState.myGameNights),
      myAttendance: computed(() => AppState.myAttendance),
      account: computed(() => AppState.account),

      async deleteGameNight(gameNightId) {
        try {
          const yes = await Pop.confirm('Delete your game night?')
          if (!yes) { return }
          const res = await gameNightService.delete(gameNightId)
          // logger.log(res)
          Pop.toast('Deleted', 'success')
        } catch (error) {
          logger.error(error)
          Pop.toast("Something went wrong deleting this GameNight!", 'error')
        }
      },

      async cancelGameNight(gameNightId) {
        try {
          // logger.log(gameNightId)
          const yes = await Pop.confirm('Cancel your game night?')
          if (!yes) { return }
          await gameNightService.cancel(gameNightId)
          Pop.toast("You've canceled your event.", 'success')
          this.addXp()
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },

      async addXp() {
        let account = AppState.account
        account.xp -= 25
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

      async findGameNight() {
        try {
          if (await gameNightService.findGameNight(search.value)) {
            search.value = ''
            router.push({
              name: "GameNightDetails",
              params: { id: AppState.activeGameNight.id }
            })
          }
          else { Pop.toast('No game night found', 'error') }

        } catch (error) {
          logger.error(error)
        }
      },

      setActive(gameNight) {
        AppState.activeGameNight = gameNight
      },

      formatDate(dateString) {
        // logger.log('formatDate')
        let date = new Date(dateString)
        return date.toLocaleString()
      },

      compareDate(dateString) {
        let gameNightDate = Date.parse(dateString);
        let now = Date.now();
        // logger.log('dateString', dateString, 'now', now, 'gameNightDate', gameNightDate)
        if (now > gameNightDate) {
          return "This game night has passed."
        } else if (now < gameNightDate) {
          return ""
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
a {
  color: var(--bs-dark);
}

a:hover {
  color: var(--bs-secondary) !important;
}
</style>