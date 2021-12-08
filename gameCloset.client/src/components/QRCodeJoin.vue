<template>
  <div class="component">
    <p>QR Code to join a Game Night</p>
    <figure class="qrcode">
      <vue-qrcode :value="'http://localhost:8080/api/gamenight/'+gameNight.id" :options="{
        errorCorrectionLevel: 'Q',
        width: 200, color: {dark: '#840196',
        light: '#ffffff'}
      }"></vue-qrcode>
    </figure>
  </div>
</template>


<script>
  import { computed, ref } from "@vue/reactivity"
  import { AppState } from "../AppState"

  export default {
    props: { gameNight: { type: Object } },
    setup(props) {
      return {
        gameNight: computed(() => AppState.gameNights),

      }
    }
  }
</script>


<style lang="scss" scoped>
  .qrcode {
    display: inline-block;
    font-size: 0;
    margin-bottom: 0;
    position: relative;
  }
</style>