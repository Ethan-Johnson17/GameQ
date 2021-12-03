<template>
  <div class="row justify-content-center">
    <div class="col-md-10 card">
      <div class="row justify-content-center">
        <div class="col-md-8 text-dark text-center">
          <!-- //NOTE bind date and time of active game here -->
          <h3>{{activeGameNight.name}}</h3>
          <h3>{{formatDate(activeGameNight.gameNightDate)}}</h3>
          <h3>{{activeGameNight.location}}</h3>
          <h3 v-if="activeGameNight.isCancelled" class="text-dark bg-warning">Cancelled</h3>
        </div>
        <div class="row">
          <div class="col-md-8 mt-3">
            <h3>Vote on the Game(s) to play!</h3>
          </div>
          <!-- //NOTE Voting area will vfor over game Q for active game need to
              also decide on style of selection input like checkbox style or
              toggle button etc. -->
          <div class="col-md-8">
            <div class="row">
              <div class="col" v-for="g in gameQueue" :key="g.id">
                <input type="checkbox" name="game" id="game" />
                <label class="ms-3" for="game">{{g.name}}</label>
              </div>
            </div>
            <!-- NOTE these are just example wont be needed -->
            <!-- <div class="row">
              <div class="col">
                <input type="checkbox" name="game" id="game" />
                <label class="ms-3" for="game">(Game Name)</label>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <input type="checkbox" name="game" id="game" />
                <label class="ms-3" for="game">(Game Name)</label>
              </div>
            </div> -->
          </div>
          <div class="col-md-4">
            <div class="row">
              <div class="col-md-10 bg-primary mb-3">
                <div class="row">
                  <div class="col text-center mt-3">
                    <h3><b>Total Votes</b></h3>
                    <hr />
                  </div>
                </div>
                <!-- //NOTE vfor -->
                <div class="row">
                  <div class="col-9 my-2">(Game Name)</div>
                  <div class="col-3 my-2">(Votes)</div>
                  <!-- NOTE Dont need these (for example) -->
                  <div class="col-9 my-2">(Game Name)</div>
                  <div class="col-3 my-2">(Votes)</div>
                  <div class="col-9 my-2">(Game Name)</div>
                  <div class="col-3 my-2">(Votes)</div>
                </div>
              </div>
            </div>
          </div>
          <hr />
        </div>
        <div class="row">
          <div class="col">
            <div class="row">
              <div class="col">
                <h2>Who is bring what (Greg)..</h2>
              </div>
            </div>
            <!-- NOTE Vfor -->
            <div class="row">
              <div class="col my-2">
                <ul>
                  <li>Item: Name of whos bringing it</li>
                </ul>
              </div>
            </div>
            <!-- NOTE wont need these are examples  -->
            <div class="row">
              <div class="col my-3">
                <ul>
                  <li>Item: Name of whos bringing it</li>
                </ul>
              </div>
            </div>
            <div class="row">
              <div class="col my-3">
                <ul>
                  <li>Item: Name of whos bringing it</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import { AppState } from "../AppState"
  import { computed } from "@vue/reactivity"
  import { gameNightService } from "../services/GameNightService";
  import { onMounted, watchEffect } from "@vue/runtime-core"
  import { logger } from "../utils/Logger"
  import Pop from "../utils/Pop"
  import { gamesService } from "../services/GamesService"
  import { useRouter } from "vue-router";

  export default {
    setup() {
      return {
        activeGameNight: computed(() => AppState.activeGameNight),
        gameQueue: computed(() => {
          const found = AppState.gameQueue.find(g => g.gameNightId === AppState.activeGameNight.id)
          logger.log(AppState.activeGameNight.id)
          // Get all gameQueues and try route.params if needed
          return found
        }),

        formatDate(dateString) {
          let date = new Date(dateString)
          return date.toLocaleString()
        },

      }
    }
  }
</script>


<style lang="scss" scoped>
</style>