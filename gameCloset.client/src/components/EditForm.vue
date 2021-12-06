<template>
  <!-- <div :id="'g-' + gameNight.id"> -->
  <form @submit.prevent="editGameNight(gameNight.id)">
    <div class="modal-body">
      <div class="row">
        <div class="col m-2">
          <input
            type="text"
            aria-label="name"
            placeholder="Name your game night"
            class="form-control"
            v-model="editable.name"
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
            v-model="editable.location"
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
            v-model="editable.gameNightDate"
            required
          />
        </div>
      </div>
      <div class="dropdown mx-4 my-2" hidden>
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
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
        Save Changes
      </button>
    </div>
  </form>
</template>


<script>
import { computed, ref } from "@vue/reactivity"
import { watchEffect } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { gameNightService } from "../services/GameNightService"
import { Modal } from "bootstrap"
import { AppState } from "../AppState"

export default {
  props: { gameNight: { type: Object } },
  setup(props) {
    const editable = ref({})
    const gameQueue = ref('Pick a game')

    watchEffect(async () => {
      try {
        editable.value = { ...props.gameNight }
        // await gameNightService.getMyGameNights('/account/gamenight')
        // await gamesService.getMyGames('/account/myGames')
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })

    return {
      editable,
      gameQueue,

      closetGames: computed(() => AppState.myGames.filter(g => g.owned)),
      myGameNights: computed(() => AppState.myGameNights),
      account: computed(() => AppState.account),

      async editGameNight(gameNightId) {
        try {
          await gameNightService.edit(gameNightId, editable.value)
          logger.log('editable.value', editable.value, 'gameNightId', gameNightId)
          Modal.getOrCreateInstance(document.getElementById('editGameNight-' + gameNightId)).hide()
          await gameNightService.getMyGameNights('/account/gamenight')

        } catch (error) {
          logger.log(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>