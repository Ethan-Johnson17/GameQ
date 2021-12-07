<template>
  <div class="gameNight container-fluid p-5">
    <div class="row">
      <div class="col text-center">
        <h1 class="text-light">GAME NIGHT</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3 my-3 text-center">
        <form @submit.prevent="findGameNight">
          <div class="input-group mb-3">
            <input
              v-model="search"
              type="text"
              class="form-control"
              placeholder="Enter code..."
              aria-label="Enter code..."
              aria-describedby="button-addon2"
            />
            <button class="btn btn-outline-light" title="Find Game">
              Find Game
            </button>
          </div>
        </form>
      </div>
    </div>
    <!-- NOTE this is where the template starts for landing page for game nights 
    Parenthesis is where the data will need to be bound  -->
    <div class="row">
      <div class="col text-light">
        <h1>Active Event(s)</h1>
      </div>
    </div>
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
  </div>
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

      async deleteGameNight(gameNightId) {
        try {
          const yes = await Pop.confirm('Delete your game night?')
          if (!yes) { return }
          const res = await gameNightService.delete(gameNightId)
          // logger.log(res)
          Pop.toast('Deleted', 'success')
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },

      async cancelGameNight(gameNightId) {
        try {
          // logger.log(gameNightId)
          const yes = await Pop.confirm('Cancel your game night?')
          if (!yes) { return }
          await gameNightService.cancel(gameNightId)
          Pop.toast("You've canceled your event.", 'success')
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },

      async findGameNight() {
        try {
          await gameNightService.findGameNight(search.value)
          search.value = ''
          router.push({
            name: "GameNightDetails",
            params: { id: AppState.activeGameNight.id }
          })
        } catch (error) {
          logger.error(error)
        }
      },

      setActive(gameNight) {
        AppState.activeGameNight = gameNight
      },

      formatDate(dateString) {
        let date = new Date(dateString)
        return date.toLocaleString()
      },
    }
  }
}
</script>


<style lang="scss" scoped>
.grow {
  transition: all 0.2s ease-in-out;
}

.grow:hover {
  transform: scale(1.06);
}

a {
  color: var(--bs-dark);
}

a:hover {
  color: var(--bs-secondary) !important;
}
</style>