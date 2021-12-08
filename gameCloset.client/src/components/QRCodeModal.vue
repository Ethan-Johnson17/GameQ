<template>
  <div class="component">
    <div class="modal" tabindex="-1" id="qrCodeModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Join Game Night</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <QRCodeJoin :gameNight="gameNight" />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
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

</style>