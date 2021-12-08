<template>
  <div class="offcanvas offcanvas-start rounded" tabindex="-1" aria-labelledby="offcanvasLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title col-md-10" id="offcanvasLabel">
        <slot name="offcanvas-title"> </slot>
      </h5>
      <button type="button" class="btn-close text-reset col-md-2" data-bs-dismiss="offcanvas"
        aria-label="Close"></button>
    </div>
    <div class="grad"></div>
    <div class="offcanvas-body">
      <slot name="offcanvas-body" />
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
  .ocBorder {
    border-bottom: 2px solid #814cb6;
  }

  .grad {
    width: 100%;
    height: 2px;
    background: rgb(33, 0, 65);
    background: linear-gradient(100deg, rgba(33, 0, 65, 1) 0%, rgba(129, 76, 182, 1) 100%);
  }
</style>