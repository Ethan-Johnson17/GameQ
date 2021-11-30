<template>
  <div class="game card m-2 p-3">
    <div class="row">
      <img
        class="m-1 rounded col"
        src="https://thiscatdoesnotexist.com"
        alt=""
      />
      <div class="row">
        <h3 class="col">It's a really long game name!</h3>
      </div>
      <div class="row">
        <p class="col">Play time:</p>
      </div>
      <div class="row">
        <p class="col">Number of players:</p>
      </div>
      <!-- v-if="game.owned" -->
      <div class="row">
        <div class="col">
          <p>Rules:</p>
        </div>
      </div>
      <div class="row">
        <div class="col-md-8"><p>See More Details</p></div>
        <div class="col-md-4">
          <p class="text-end">
            <i class="text-end selectable mdi mdi-heart-outline"></i>
          </p>
        </div>
      </div>

      <!-- v-if="!game.owned" -->
      <div class="row">
        <div class="col">
          <p>Cost:</p>
        </div>
      </div>
      <div class="row">
        <div class="col-md-8"><p>See More Details</p></div>
        <div class="col-md-4">
          <p class="text-end">
            <i class="text-end selectable mdi mdi-playlist-play"></i>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
img {
  // height: fit-content;
  // width: fit-content;
}

p {
  // padding: 0;
  margin: 0;
}
.card {
  width: 50vh;
}
</style>