<template>
  <div class="component">
    <div class="card p-2" v-if="player.items">
      <h3>{{ player.account?.name }}</h3>
      <p>{{ player.items }}</p>
    </div>
  </div>
</template>


<script>
import { computed, reactive, ref } from "@vue/reactivity"
import { AppState } from "../AppState"

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

    }
  }
}
</script>


<style lang="scss" scoped>
</style>