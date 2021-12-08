<template>
  <div class="offcanvas-body">
    <div class="col text-center">
      <img class="img-container m-2" :src="game.image_url" alt="" />
    </div>
    <div class="col my-2">
      <h2>{{game.name}}</h2>
    </div>
    <div class="col" v-if="game.min_players !== game.max_players">{{game.min_players}} to {{game.max_players}} players
    </div>
    <div class="col" v-else>{{game.min_players}} players</div>
    <div class="col">{{game.min_playtime}} to {{game.max_playtime}} minute playtime</div>
    <div class="accordion mb-5 col mt-3" id="accordionExample">
      <div class="accordion-item bgColor">
        <h2 class="accordion-header" id="headingOne">
          <button class="accordion-button bg-light" type="button" data-bs-toggle="collapse"
            data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            Official Rules
          </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne"
          data-bs-parent="#accordionExample">
          <div class="accordion-body" v-if="game.rules_url">
            <a target="_blank" :href="game.rules_url">{{ game.name }} Rules</a>
          </div>
          <div class="accordion-body" v-else>
            <p>
              No {{ game.name }} rules found.
              <span data-bs-toggle="modal" :data-bs-target="'#addRules-' + game.id" class="selectable">Add
                now?</span>
            </p>
            <i class="mdi mdi-plus-thick text-secondary selectable btn" data-bs-toggle="modal"
              :data-bs-target="'#addRules-' + game.id" title="Add Official Rules">
              Add Rules</i>
          </div>
        </div>
      </div>
      <div class="accordion-item bgColor">
        <h2 class="accordion-header" id="headingTwo">
          <button class="accordion-button collapsed bg-light" type="button" data-bs-toggle="collapse"
            data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            House Rules
          </button>
        </h2>
        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
          data-bs-parent="#accordionExample">
          <div class="accordion-body">
            {{ game.houseRules }}
          </div>
          <i class="mdi mdi-plus-thick text-secondary selectable" data-bs-toggle="modal"
            :data-bs-target="'#addRules-' + game.id" title="Add House Rules">
            Add Rules</i>
        </div>
      </div>
    </div>

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
  .bgColor {
    background-color: #d8d8d8;
  }
</style>