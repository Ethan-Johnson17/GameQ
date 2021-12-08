<template>
  <div class="component">
    <form @submit.prevent="addItem">
      <input
        type="text"
        class="form-control"
        id="items"
        placeholder="Add items here..."
        v-model="player.items"
      />
      <button class="btn btn-secondary" type="submit">Post items</button>
    </form>

    <div class="card p-2">
      <img :src="player.account.picture" alt="" />
      <h3>{{ player.account.name }}</h3>
      <p>{{ player.items }}</p>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
export default {

  setup() {
    return {
      player: computed(() => AppState.player)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>