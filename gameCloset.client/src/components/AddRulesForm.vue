<template>
  <!-- <div :id="'g-' + gameNight.id"> -->
  <form @submit.prevent="addRules(game.id)">
    <div class="modal-body">
      <div class="row">
        <div class="col m-2">
          <h6>Add Official Rules with a link:</h6>
          <input type="url" aria-label="OfficialRulesURL" placeholder="Add Link to Official Rules" class="form-control"
            v-model="editable.rules_url" />
        </div>
      </div>
      <div class="row">
        <div class="col m-2">
          <h6>Add House Rules:</h6>
          <textarea type="text" aria-label="HouseRules" placeholder="Add House Rules" class="form-control"
            v-model="editable.houseRules"></textarea>
        </div>
      </div>
      <!-- NOTE To be used if we ever can upload files -->
      <!-- <div class="row">
        <div class="col m-2">
          <div class="mb-3">
            <label for="formFile" class="form-label">Default file input example</label>
            <input class="form-control" type="file" id="formFile">
          </div>
        </div>
      </div> -->
    </div>

    <div class="modal-footer">
      <button type="submit" class="btn btn-outline-secondary" data-bs-dismiss="modal">
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
  import { Modal } from "bootstrap"
  import { AppState } from "../AppState"
  import { gamesService } from "../services/GamesService"


  export default {
    props: { game: { type: Object } },
    setup(props) {
      const editable = ref({})

      // watchEffect(async () => {
      //   try {
      //     editable.value = { ...props.gameNight }
      //     // await gameNightService.getMyGameNights('/account/gamenight')
      //     // await gamesService.getMyGames('/account/myGames')
      //   } catch (error) {
      //     logger.error(error)
      //     Pop.toast(error.message, 'error')
      //   }
      // })

      return {
        editable,
        // gameQueue,

        closetGames: computed(() => AppState.myGames.filter(g => g.owned)),
        myGameNights: computed(() => AppState.myGameNights),
        account: computed(() => AppState.account),

        async addRules(gameId) {
          try {
            await gamesService.addRules(gameId, editable.value)
            Modal.getOrCreateInstance(document.getElementById('addRules-' + gameId)).hide()
            await gamesService.getMyGames('/account/myGames')
          } catch (error) {
            logger.log(error)
            Pop.toast(error.message, 'error')
          }
        }
        // async editGameNight(gameNightId) {
        //   try {
        //     await gameNightService.edit(gameNightId, editable.value)
        //     logger.log('editable.value', editable.value, 'gameNightId', gameNightId)
        //     Modal.getOrCreateInstance(document.getElementById('editGameNight-' + gameNightId)).hide()
        //     await gameNightService.getMyGameNights('/account/gamenight')

        //   } catch (error) {
        //     logger.log(error)
        //     Pop.toast(error.message, 'error')
        //   }
        // }
      }
    }
  }
</script>


<style lang="scss" scoped>
  textarea {
    resize: none;
  }
</style>