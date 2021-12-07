<template>
  <nav
    class="
      navbar navbar-expand-lg navbar-dark
      bg-primary
      px-3
      border-bottom border-2 border-dark
    "
  >
    <div class="d-flex flex-column align-items-center me-5">
      <a href="/">
        <img alt="logo" src="../assets/img/GameQ2.png" height="60" />
      </a>
    </div>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>
          <router-link
            :to="{ name: 'GameCloset' }"
            class="btn text-ep selectable text-uppercase text-light"
          >
            Game Closet
          </router-link>
        </li>

        <li>
          <router-link
            :to="{ name: 'Search' }"
            class="
              btn
              text-ep
              selectable
              text-uppercase text-light
              search-borders
            "
          >
            Search Games
          </router-link>
        </li>

        <li>
          <router-link
            :to="{ name: 'GameNight' }"
            class="btn text-ep selectable text-uppercase text-light"
          >
            Game Night
          </router-link>
        </li>
      </ul>
      <button
        class="btn btn-light me-5"
        title="Host Game"
        data-bs-target="#hostModal"
        data-bs-toggle="modal"
      >
        Host Game Night
      </button>
      <span class="navbar-text">
        <button
          class="btn selectable text-ep text-light text-uppercase my-2 my-lg-0"
          @click="login"
          v-if="!user.isAuthenticated"
        >
          Login
        </button>
        <div class="dropdown my-2 my-lg-0" v-else>
          <div
            class="dropdown-toggle selectable"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            id="authDropdown"
          >
            <img
              :src="account.picture"
              alt="user photo"
              height="40"
              class="rounded-circle profile-img"
            />
            <span class="mx-3 text-ep">{{ account.name }}</span>
          </div>
          <div
            class="dropdown-menu p-0 list-group w-100"
            aria-labelledby="authDropdown"
          >
            <!-- <router-link :to="{ name: 'Account' }"> -->
            <div
              class="list-group-item list-group-item-action hoverable"
              data-bs-target="#accountModal"
              data-bs-toggle="modal"
            >
              Manage Account
            </div>
            <!-- </router-link> -->
            <div
              class="
                list-group-item list-group-item-action
                hoverable
                text-danger
              "
              @click="logout"
            >
              <i class="mdi mdi-logout"></i>
              logout
            </div>
          </div>
        </div>
      </span>
    </div>
  </nav>
  <hostModal />
  <AccountModal />
</template>



<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed } from 'vue'
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}

.dropdown-menu.show {
  transform: scale(1);
}

.hoverable {
  cursor: pointer;
}

a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-secondary);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.search-borders {
  border-right: 1px solid var(--bs-light);
  border-left: 1px solid var(--bs-light);
}

.profile-img {
  height: 50px;
  width: 50px;
  object-fit: cover;
}
</style>