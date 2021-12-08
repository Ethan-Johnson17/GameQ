<template>
  <div class="component">
    <form @submit.prevent="addItem(player.id)">
      <input
        type="text"
        class="form-control"
        id="items"
        placeholder="Add items here..."
        v-model="player.items"
      />
      <button class="btn btn-secondary" type="submit">Post items</button>
    </form>

    <!-- <div class="card p-2">
      <img :src="player.account.picture" alt="" />
      <h3>{{ player.account.name }}</h3>
      <p>{{ player.items }}</p>
    </div> -->
  </div>
</template>


<script>
import { computed, ref } from "@vue/reactivity"
import { AppState } from "../AppState"
import { accountService } from "../services/AccountService"
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
    const items = ref('')
    return {
      items,
      players: computed(() => AppState.players),
      async addItem() {
        try {
          player.items = items
          await accountService.addItem(player.id, player)

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
</style>