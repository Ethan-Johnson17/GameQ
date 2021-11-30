<template>
  <div class="search"></div>
</template>


<script>
export default {
  setup() {
    onMounted(async () => {

      try {
        await gamesService.getAll('/search?q=')
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      user: computed(() => AppState.user),

    }
  }
}
</script>


<style lang="scss" scoped>
</style>