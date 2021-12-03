<template>
  <div class="gameNight container-fluid">
    <div class="row">
      <div class="col text-center">
        <h1 class="text-light">GAME NIGHT</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3 my-3 text-center">
        <form @submit.prevent="gameCodeSearch()">
          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Enter code..." aria-label="Enter code..."
              aria-describedby="button-addon2" />
            <button class="btn btn-outline-light" title="Find Game">
              Find Game
            </button>
          </div>
        </form>
      </div>
      <div class="col-md-9 my-3 text-end">
        <button class="btn btn-outline-light" title="Add Game">Add Game</button>
      </div>
    </div>
    <!-- NOTE this is where the template starts for landing page for game nights 
    Parenthesis is where the data will need to be bound  -->
    <div class="row">
      <div class="col text-light">
        <h1>Active Event(s)</h1>
      </div>
    </div>
    <div class="row" v-for="g in myGameNights" :key="g.id">
      <div class="col">
        <div class="row justify-content-center">
          <div class="col-md-6 card elevation-2 mt-3 selectable grow" title="Game Night Details">
            <div class="row">
              <div class="col-6 mt-2">
                <h4>{{g.name}}</h4>
              </div>
              <div class="col-6 text-end dropdown">
                <i class="
                    mdi mdi-dots-horizontal mdi-16px
                    text-dark
                    selectable
                    dropdown-toggle
                  " data-bs-toggle="dropdown" title="Options"></i>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item selectable text-danger" @click="cancelEvent(activeEvent)">Cancel Event</a>
                  </li>
                  <li>
                    <a class="dropdown-item selectable text-primary" data-bs-toggle="modal"
                      data-bs-target="#editEventForm">Edit Event</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="row justify-content-center">
              <div class="col-md-6 my-3">
                <div class="row">
                  <div class="col">
                    <h5>{{g.gameNightDate}}</h5>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <h5>{{g.location}}</h5>
                  </div>
                </div>
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


  export default {
    props: {
      gameNight: {
        type: Object
      }
    },
    setup() {
      onMounted(async () => {

        try {
          await gameNightService.getMyGameNights('/account/gamenight')
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      })
      return {
        myGameNights: computed(() => AppState.myGameNights)
      }
    }
  }
</script>


<style lang="scss" scoped>
  .grow {
    transition: all 0.2s ease-in-out;
  }

  .grow:hover {
    transform: scale(1.1);
  }
</style>