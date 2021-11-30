<template>
  <div class="search">
    <div class="mb-3 w-25">
      <form @submit.prevent="searchGames">
        <label for="" class="form-label"></label>
        <input
          v-model="search"
          type="text"
          class="form-control"
          name=""
          id=""
          aria-describedby="helpId"
          placeholder="Search Games"
        />
        <input
          name="search"
          id=""
          class="btn btn-primary"
          type="submit"
          value=""
        />
      </form>
    </div>
  </div>
</template>


<script>
import { computed, onMounted, ref } from "@vue/runtime-core"
import { gamesService } from "../services/GamesService"
import { logger } from "../utils/Logger"
import { AppState } from "../AppState"
export default {
  setup() {
    const search = ref('')
    // onMounted(async () => {
    //   try {
    //     if (AppState.atlasGames.length > 0) { return }
    //     else { await gamesService.getAll('/search?q=' + search) }
    //     if there's nothing in the appstate, call atlasApi
    //   } catch (error) {
    //     logger.error(error)
    //   }
    // })

    return {
      search,
      user: computed(() => AppState.user),
      atlasGames: computed(() => AppState.atlasGames),

      async searchGames() {
        try {
          // await gamesService.getAll('/search?q=' + search.value)
          logger.log(search.value)
          search.value = ''
        } catch (error) {
          logger.error
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>