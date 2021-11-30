<template>
  <div class="container-fluid game card m-2 p-3">
    <div class="row">
      <img class="m-1 rounded col img-container" :src="game.image_url" alt="" />
      <div class="row">
        <h3 class="col">{{ game.name }}</h3>
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
  props: { game: { type: Object, required: true } },
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

.img-container {
  height: 450px;
  width: 450px;
  object-fit: cover;
}
.card {
  width: 50vh;
}
</style>