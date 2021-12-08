<template>
  <div class="component">
    <p>QR Code for rules</p>
    <figure class="qrcode">
      <vue-qrcode :value="game.rules_url" :options="{
        errorCorrectionLevel: 'Q',
        width: 200, color: {dark: '#840196',
        light: '#ffffff'}
      }"></vue-qrcode>
      <img class="qrcode__image" :src="game.image_url" alt="game.name" />
    </figure>
  </div>
</template>


<script>
  import { computed, ref } from "@vue/reactivity"

  export default {
    props: { game: { type: Object } },
    setup(props) {
      return {
        closetGames: computed(() => AppState.myGames.filter(g => g.owned)),

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

  .qrcode__image {
    background-color: #fff;
    border: 0.25rem solid #fff;
    border-radius: 0.25rem;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.25);
    height: 25%;
    left: 50%;
    overflow: hidden;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 25%;
  }
</style>