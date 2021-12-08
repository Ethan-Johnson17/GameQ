<template>
  <div v-if="!user.isAuthenticated" class="
      home
      flex-grow-1
      d-flex
      flex-column
      align-items-center
      justify-content-center
    ">
    <h1 @click="login" class="selectable">Please sign in to view your games</h1>
  </div>
  <div class="game-closet p-5" v-if="user.isAuthenticated">
    <div class="container-fluid">
      <div class="row">
        <div class="col mt-2 text-light">
          <h1>My Game Closet</h1>
        </div>
        <div class="row">
          <div class="col-md-4 d-flex justify-content-center" v-for="game in closetGames" :key="game.atlasGameId">
            <Game :game="game" />
            <Modal :id="'addRules-' + game.id">
              <template #modal-title>Add Rules</template>
              <template #modal-body>
                <AddRulesForm :game="game" />
              </template>
            </Modal>
            <OffCanvas :id="'gameDetails-' + game.id">
              <template #offcanvas-title>{{game.name}} Details</template>
              <template #offcanvas-body>
                <GameDetails :game="game" />
              </template>
            </OffCanvas>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col text-light mt-5">
          <h1>Wishlist</h1>
        </div>
        <div class="row">
          <div class="col-md-4 d-flex justify-content-center" v-for="game in wishlistGames" :key="game.atlasGameId">
            <Game :game="game" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { computed } from "@vue/reactivity"
  import { AppState } from "../AppState"
  import { onMounted, watchEffect } from "@vue/runtime-core"
  import { logger } from "../utils/Logger"
  import { gamesService } from "../services/GamesService"
  import { AuthService } from "../services/AuthService"
  import Pop from "../utils/Pop"
  export default {
    name: 'Home',
    setup() {
      onMounted(async () => {

        try {
          await gamesService.getMyGames('/account/myGames')
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      })



      return {
        user: computed(() => AppState.user),
        closetGames: computed(() => AppState.myGames.filter(g => g.owned)),
        wishlistGames: computed(() => AppState.myGames.filter(g => !g.owned)),
        async login() {
          AuthService.loginWithPopup()
        },
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

      >img {
        height: 200px;
        max-width: 200px;
        width: 100%;
        object-fit: contain;
        object-position: center;
      }
    }
  }
</style>