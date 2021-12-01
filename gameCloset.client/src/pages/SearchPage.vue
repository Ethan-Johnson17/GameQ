<template>
  <div class="container-fluid">
    <!-- SEARCH -->
    <div class="row">
      <div class="col">
        <div class="search">
          <div class="mb-3 w-25 m-3">
            <form @submit.prevent="searchGames">
              <div class="input-group mb-3">
                <input
                  v-model="search"
                  type="text"
                  class="form-control"
                  placeholder="Search Games"
                  aria-label="Search Games"
                  aria-describedby="button-addon2"
                />
                <button
                  class="btn btn-outline-light"
                  type="submit"
                  id="button-addon2"
                >
                  Search
                </button>
              </div>
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
    onMounted(async () => {
      try {
        await gamesService.getAll('/search?q=' + search.value)
        await gamesService.getMyGames('/api/games')
      } catch (error) {
        logger.error(error)
      }
    })

    return {
      search,
      user: computed(() => AppState.user),
      games: computed(() => AppState.atlasGames),

      // this might be a way to filter out games we own or have on our wishlist

      // games: computed(() => {
      //   const myGames = AppState.myGames
      //   let filteredGames = []
      //   AppState.atlasGames.forEach(atlasGame => {
      //     if (!(myGames.find(g => g.atlasUrl === atlasGame.atlasUrl))) {
      //       filteredGames.push(atlasGame)
      //     }
      //   })
      //   return filteredGames
      // }),
      // myGames: computed(() => AppState.myGames),



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