<template>
  <div class="container-fluid body">
    <!-- SEARCH -->
    <div class="main">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="search">
            <div class="mb-3 m-3">
              <form @submit.prevent="searchGames">
                <div class="input-group mb-3 mt-5">
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
          <Game :game="game" :isSearchResult="true" />
        </div>
      </div>
    </div>
    <div class="row footerBottom">
      <div class="col justify-content-between d-flex mt-3">
        <div class="selectable text-light mx-4 mb-3 row" @click="page(-24)">
          <div class="col-md-3">
            <img class="handArrow" src="../assets/img/hand-left.png" alt="" />
            <!-- <i class="mdi mdi-arrow-left-thick f-24"></i> -->
          </div>
          <div class="col-md-9 mt-2 text-end">
            <i class="f-16">Previous Page</i>
          </div>
        </div>
        <div @click="page(24)" class="selectable text-light mx-4 mb-3 row">
          <div class="col-md-8 mt-2 text-center">
            <i class="f-16">Next Page</i>
          </div>
          <div class="col-md-4">
            <img class="handArrow" src="../assets/img/hand.png" alt="" />
            <!-- <i class="mdi mdi-arrow-right-thick f-24"></i> -->
          </div>
        </div>
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
    let next = 0
    let prev = next

    const search = ref('')
    onMounted(async () => {
      try {
        await gamesService.getAll('/search?q=' + search.value)
        await gamesService.getMyGames('account/myGames')
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      search,
      next,
      prev,
      user: computed(() => AppState.user),
      games: computed(() => AppState.atlasGames),
      myGames: computed(() => AppState.myGames),

      async searchGames() {
        try {
          await gamesService.getAll('/search?q=' + search.value)
          search.value = ''
        } catch (error) {
          logger.error(error)
        }
      },

      async page(pageNum) {
        try {
          next += pageNum
          await gamesService.getAll('/search?skip=' + next)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.handArrow {
  height: 40px;
  width: 60px;
}

.body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main {
  flex-grow: 1;
}
</style>