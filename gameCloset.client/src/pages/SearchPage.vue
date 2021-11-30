<template>
  <div class="container-fluid">
    <!-- SEARCH -->
    <div class="row">
      <div class="col">
        <div class="search">
          <div class="mb-3 w-25 m-3">
            <form @submit.prevent="searchGames">
              <label for="" class="form-label"></label>
              <input
                v-model="search"
                type="text"
                class="form-control"
                name=""
                id=""
                aria-describedby="helpId"
                placeholder="Search Games"
              />
              <input
                name="search"
                id=""
                class="btn btn-primary"
                type="submit"
                value=""
              />
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- GAMES -->
    <div class="row">
      <div
        class="col-md-4 d-flex justify-content-center"
        v-for="game in games"
        :key="game.atlasGameId"
      >
        <Game :game="game" />
      </div>
    </div>
  </div>
</template>


<script>
import { computed, onMounted, ref } from "@vue/runtime-core"
import { gamesService } from "../services/GamesService"
import { logger } from "../utils/Logger"
import { AppState } from "../AppState"
export default {
  setup() {
    const search = ref('')
    // onMounted(async () => {
    //   try {
    //     await gamesService.getAll('/search?q=' + search.value)
    //     // if there's nothing in the appstate, call atlasApi
    //   } catch (error) {
    //     logger.error(error)
    //   }
    // })

    return {
      search,
      user: computed(() => AppState.user),
      games: computed(() => AppState.atlasGames),

      async searchGames() {
        try {
          await gamesService.getAll('/search?q=' + search.value)
          // logger.log(search.value)
          search.value = ''
        } catch (error) {
          logger.error
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>