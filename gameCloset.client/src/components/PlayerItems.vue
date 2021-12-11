<template>
  <div class="component">
    <div class="card p-2" v-if="player.items">
      <div class="d-flex">
        <h3>
          <img
            :src="player.account.picture"
            alt="player picture"
            class="pic me-3"
          />{{ player.account?.name }}
        </h3>
        <i
          v-if="account.id === player.accountId"
          class="mdi mdi-trash-can f-20 text-danger ms-auto selectable"
          @click="removeItems()"
        ></i>
      </div>
      <p>{{ player.items }}</p>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { playersService } from "../services/PlayersService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"

export default {
  props: {
    player: {
      type: Object,
      required: true
    }
  },
  setup() {

    return {
      account: computed(() => AppState.account),
      players: computed(() => AppState.players),
      gameQueue: computed(() => AppState.gameQueue),
      async removeItems() {
        try {
          const player = AppState.players.find(p => p.account.id === AppState.account.id)
          player.items = ''

          await playersService.editMyItems(player)


        } catch (error) {
          logger.error(error)
          Pop.toast(error)
        }

      }
    }
  }
}
</script>


<style lang="scss" scoped>
.pic {
  height: 50px;
  width: 50px;
  object-fit: cover;
  border-radius: 50%;
}
</style>