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
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalToggleLabel">
            Host a Game Night
          </h5>
          <button
            type="button"
            class="btn-close"
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
                  v-model="state.editable.date"
                  required
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="submit"
              class="btn btn-primary"
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
  <!-- <div
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
        <div class="modal-body">
          Hide this modal and show the first with the button below.
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-primary"
            data-bs-target="#exampleModalToggle2"
            data-bs-toggle="modal"
            data-bs-dismiss="modal"
          >
            Add Games
          </button>
        </div>
      </div>
    </div>
  </div> -->
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
    return {
      state,



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
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>