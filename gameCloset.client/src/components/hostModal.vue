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
        <form @submit.prevent="createGameNight">
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
          </div>

          <div class="modal-footer">
            <button
              type="submit"
              class="btn btn-outline-secondary"
              data-bs-target="#exampleModalToggle2"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div
    class="modal fade"
    id="exampleModalToggle2"
    aria-hidden="true"
    aria-labelledby="exampleModalToggleLabel2"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalToggleLabel2">Modal 2</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <form @submit.prevent="addGames()">
          <div class="modal-body">
            <!-- NOTE This is the game choosing drop down  -->
            <div class="row">
              <div class="col">
                <h5 class="mx-3">Choose 3 games to bring to the vote!</h5>
              </div>
            </div>
            <div class="dropdown mx-4 my-2">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{ gameQueue.selected1 }}
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li v-for="game in closetGames" :key="game.atlasGameId">
                  <div
                    class="dropdown-item selectable"
                    @click="gameQueue.selected1 = game.name"
                  >
                    {{ game.name }}
                  </div>
                </li>
              </ul>
            </div>
            <div class="dropdown mx-4 my-2">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{ gameQueue.selected2 }}
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                <li v-for="game in closetGames" :key="game.atlasGameId">
                  <div
                    class="dropdown-item selectable"
                    @click="gameQueue.selected2 = game.name"
                  >
                    {{ game.name }}
                  </div>
                </li>
              </ul>
            </div>
            <div class="dropdown mx-4 my-2">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton3"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{ gameQueue.selected3 }}
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton3">
                <li v-for="game in closetGames" :key="game.atlasGameId">
                  <div
                    class="dropdown-item selectable"
                    @click="gameQueue.selected3 = game.name"
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
              data-bs-target="#exampleModalToggle2"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Add Games
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




export default {
  setup() {
    const newPlayer = ref({})
    const state = reactive({
      editable: {},

    });
    const gameQueue = reactive({
      selected1: 'Choose a game!',
      selected2: 'Choose a game!',
      selected3: 'Choose a game!',
    })
    return {
      closetGames: computed(() => AppState.myGames.filter(g => g.owned)),
      state,
      gameQueue,




      async createGameNight() {
        logger.log('create', state.editable)
        await gameNightService.createGameNight(state.editable)
        // const gameId = AppState.activeGame.id
        // router.push({
        //   name: "active",
        //   params: { id: gameId }
        // })
        // newPlayer.value.accountId = AppState.account.id
        // newPlayer.value.gameNightId = route.params.id
      },

      async addGames() {
        logger.log(gameQueue)
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>