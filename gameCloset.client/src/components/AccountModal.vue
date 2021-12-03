<template>
  <div class="modal fade" id="accountModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Edit account</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="edit">
            <div class="mb-3 d-flex justify-content-between">
              <div>
                <label for="picture" class="form-label">Picture</label>
                <input type="url" class="form-control" name="picture" id="picture" aria-describedby="picture"
                  placeholder="picture..." v-model="editable.picture" />
              </div>
              <div>
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" name="name" id="name" aria-describedby="name"
                  placeholder="Name..." v-model="editable.name" />
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="submit" class="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import { ref } from '@vue/reactivity'
  import { logger } from '../utils/Logger'
  import { accountService } from '../services/AccountService'
  import Pop from '../utils/Pop'
  import { Modal } from 'bootstrap'
  import { useRouter } from 'vue-router'
  import { AppState } from '../AppState'
  // import { Account } from '../Models/Account'
  import { watchEffect } from '@vue/runtime-core'
  export default {
    // props: {
    //   account: {
    //     type: Account,
    //   }
    // },
    setup() {
      const router = useRouter()
      const editable = ref({})
      watchEffect(() => {
        editable.value = {}
      })
      return {
        editable,
        async edit() {
          try {
            await accountService.edit(editable.value)
            Modal.getOrCreateInstance(document.getElementById('accountModal')).hide()
          } catch (error) {
            logger.error(error)
            Pop.toast('Failed to Edit', 'error')
          }
        }
      }
    }
  }
</script>


<style lang="scss" scoped>

</style>