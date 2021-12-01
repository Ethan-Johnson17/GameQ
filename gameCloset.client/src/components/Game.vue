<template>
  <div class="container-fluid game card elevation-3 m-2 p-3">
    <div class="row">
      <div class="col text-danger text-end" v-if="route.name == 'GameCloset'">
        <!-- TODO consider moving this to the bottom of the card because we don't need the buttons there if they're in the closet and wishlist -->
        <i
          class="mdi mdi-trash-can-outline selectable mdi-24px p-2"
          @click="remove(game.id)"
        ></i>
      </div>
    </div>

    <div class="row m-auto">
      <img class="m-1 rounded col img-container" :src="game.image_url" alt="" />
      <div class="row">
        <h3 class="col">{{ game.name }}</h3>
      </div>
      <div class="row" v-if="game.min_playtime && game.max_playtime">
        <p class="col" v-if="game.min_playtime === game.max_playtime">
          Play time: {{ game.min_playtime }} minutes
        </p>
        <p class="col" v-else>
          Play time: {{ game.min_playtime }} - {{ game.max_playtime }} minutes
        </p>
      </div>
      <div class="row" v-if="game.min_players && game.max_players">
        <p class="col" v-if="game.min_players === game.max_players">
          Number of players: {{ game.min_players }}
        </p>
        <p class="col" v-else>
          Number of players: {{ game.min_players }} - {{ game.max_players }}
        </p>
      </div>
      <!-- v-if="game.owned" -->
      <div class="row" v-if="game.rules_url">
        <div class="col">
          <p><a target="_blank" :href="game.rules_url">Game Rules</a></p>
        </div>
      </div>

      <!-- v-if="!game.owned" -->
      <div class="row">
        <div class="col" v-if="game.price > 0">
          <p>Cost: ${{ game.price }}</p>
        </div>
      </div>
      <div class="row">
        <div class="col-md-8">
          <p><a target="_blank" :href="game.atlasUrl">See More Details</a></p>
        </div>
      </div>
      <div class="row m-0 p-0">
        <div class="col">
          <p class="text-end">
            <!-- v-ifs for the icons when you're on the closet / wishlist -->
            <i
              @click="addToWishlist(game)"
              class="selectable mdi mdi-playlist-plus me-3 p-2 rounded"
            ></i>
            <i class="selectable mdi mdi-heart-outline p-2 rounded"></i>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { gamesService } from "../services/GamesService"
import { logger } from "../utils/Logger"
import { AppState } from "../AppState"
import { useRoute } from "vue-router"
import Pop from "../utils/Pop"
export default {
  props: { game: { type: Object, required: true } },
  setup(props) {
    const route = useRoute()
    return {
      route,
      async addToWishlist() {
        try {
          const game = props.game
          await gamesService.addToWishlist(game)
          logger.log(game)
        } catch (error) {
          logger.error(error)
        }
      },

      async remove(id) {
        try {
          await gamesService.remove(id)
        } catch (error) {
          logger.error(error)
          Pop.toast('error', 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
p {
  // padding: 0;
  margin: 0;
}

.img-container {
  height: 450px;
  width: 450px;
  object-fit: cover;
}
.card {
  width: 50vh;
}
</style>