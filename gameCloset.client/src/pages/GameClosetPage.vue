<template>
  <div
    v-if="!user.isAuthenticated"
    class="
      home
      flex-grow-1
      d-flex
      flex-column
      align-items-center
      justify-content-center
    "
  >
    <h1>SIGN IN FOOL</h1>
  </div>
  <div class="game-closet" v-if="user.isAuthenticated">
    <div class="container-fluid">
      <div class="row">
        <h1>My Game Closet</h1>
        <div
          class="col-md-4 d-flex justify-content-center"
          v-for="game in closetGames"
          :key="game.atlasGameId"
        >
          <Game :game="game" />
        </div>
      </div>
      <div class="row">
        <h1>Wishlist</h1>
        <div
          class="col-md-4 d-flex justify-content-center"
          v-for="game in wishlistGames"
          :key="game.atlasGameId"
        >
          <Game :game="game" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { onMounted } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import { gamesService } from "../services/GamesService"
export default {
  name: 'Home',
  setup() {
    onMounted(async () => {

      try {
        await gamesService.getMyGames('/api/games')
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      user: computed(() => AppState.user),
      closetGames: computed(() => AppState.closetGames),
      wishlistGames: computed(() => AppState.wishlistGames)
    }
  }
}
</script>

<style scoped lang="scss">
h1 {
  text-decoration: underline;
}
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
