<template>
  <div class="flip-card my-4 grow" @click="flipCard">
    <div
      class="flip-card-inner selectable"
      :id="game.atlasGameId"
      style="transform: rotateY(0deg)"
    >
      <div class="flip-card-front elevation-3">
        <div class="container">
          <div class="row">
            <div class="col p-0">
              <img
                class="img-container m-2"
                :src="game.image_url"
                alt=""
                loading="lazy"
              />
            </div>
          </div>
          <div class="row">
            <div class="col text-center my-1">
              <h3 class="col">{{ game.name }}</h3>
            </div>
          </div>
        </div>
      </div>
      <div class="flip-card-back elevation-3">
        <div class="row">
          <div
            class="col text-danger text-end"
            v-if="route.name == 'GameCloset'"
          >
            <i
              class="mdi mdi-trash-can-outline selectable mdi-24px p-2"
              @click="remove(game.id)"
            ></i>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <h3 class="my-4">Game Details</h3>
          </div>
        </div>
        <div class="row" v-if="game.min_playtime && game.max_playtime">
          <h4
            class="col text-start mx-3"
            v-if="game.min_playtime === game.max_playtime"
          >
            Play time: {{ game.min_playtime }} minutes
          </h4>
          <h4 class="col text-start ms-3" v-else>
            Play time: {{ game.min_playtime }} - {{ game.max_playtime }} minutes
          </h4>
        </div>
        <div class="row" v-if="game.min_players && game.max_players">
          <h4
            class="col text-start ms-3"
            v-if="game.min_players === game.max_players"
          >
            Number of players: {{ game.min_players }}
          </h4>
          <h4 class="col text-start ms-3" v-else>
            Number of players: {{ game.min_players }} - {{ game.max_players }}
          </h4>
        </div>

        <div class="row" v-if="!game.owned">
          <div class="col text-start ms-3" v-if="game.price > 0">
            <h4>Cost: ${{ game.price }}</h4>
          </div>
        </div>
        <div class="row">
          <div class="col text-start mt-3 ms-3">
            <h5 v-if="!game.owned">
              <a target="_blank" :href="game.atlasUrl">See More Details</a>
            </h5>
            <h5 v-else>
              <a data-bs-toggle="offcanvas" :href="'#gameDetails-' + game.id"
                >See More Details</a
              >
            </h5>
          </div>
        </div>
        <div class="row" v-if="user.isAuthenticated">
          <div class="col mt-3" v-if="isSearchResult">
            <div class="row" v-if="!hasGame">
              <div class="col-6 text-center" @click.stop>
                <button
                  v-if="route.name == 'Search' && !game.owned"
                  @click="addToWishlist(game)"
                  class="btn btn-secondary"
                  title="add to wishlist"
                >
                  Wishlist
                </button>
              </div>
              <div class="col-6 text-center px-2" @click.stop>
                <button
                  class="btn btn-secondary"
                  title="add to game closet"
                  v-if="!game.owned"
                  @click="addToGameCloset(game)"
                >
                  Closet
                </button>
              </div>
            </div>
            <div class="col m-2 text-danger" v-else>
              <p>You have this game!</p>
            </div>
          </div>
          <div class="col mt-3" v-else>
            <div class="text-end" @click.stop>
              <button
                class="btn btn-secondary me-3"
                title="add to game closet"
                v-if="!game.owned"
                @click="addToGameCloset(game)"
              >
                Closet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, ref } from "@vue/reactivity"
import { gamesService } from "../services/GamesService"
import { logger } from "../utils/Logger"
import { AppState } from "../AppState"
import { useRoute } from "vue-router"
import Pop from "../utils/Pop"
export default {
  props: {
    game: { type: Object },
    isSearchResult: { type: Boolean, default: false }
  },
  setup(props) {
    const route = useRoute()
    let flipped = ref(false)
    return {
      flipped,
      route,
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      hasGame: computed(() => {
        const found = AppState.myGames.find(g => g.atlasGameId === props.game.atlasGameId)
        return found
      }),


      async addToWishlist() {
        try {
          const game = props.game
          const response = await gamesService.addToWishlist(game)
          logger.log('wishlist response', response)
          Pop.toast('Added to Wishlist', 'success')
        } catch (error) {
          Pop.toast("Already in your wishlist!:" + error.message, 'error')
          logger.error(error)
        }
      },

      async addToGameCloset() {
        try {
          const closetGame = props.game
          closetGame.owned = true
          logger.log('add', closetGame)
          await gamesService.addToGameCloset(closetGame)
          Pop.toast('Added to Game Closet', 'success')
        } catch (error) {
          Pop.toast("Already in your closet!" + error.message, 'error')
          logger.error(error)
        }
      },

      async remove(id) {
        try {
          await gamesService.remove(id)
        } catch (error) {
          Pop.toast(error.message, 'error')
          logger.error(error)
        }
      },

      flipCard() {
        flipped.value = !flipped.value
        if (flipped.value) {
          document.getElementById(props.game.atlasGameId).style.transform = 'rotateY(180deg)';
        }
        else {
          document.getElementById(props.game.atlasGameId).style.transform = 'rotateY(0deg)';
        }

      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>