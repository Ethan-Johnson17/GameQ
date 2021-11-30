<template>
  <div class="game card m-2 p-3">
    <img class="m-1 rounded" src="https://thiscatdoesnotexist.com" alt="" />
    <h1>GAME</h1>
    <p>Play time:</p>
    <p>Number of players:</p>
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
  height: 100px;
  width: fit-content;
}
.card {
  width: 40vh;
}
</style>