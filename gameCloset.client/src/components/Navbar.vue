<template>
  <div class="navigation">
    <img
      id="siteLogo"
      class="ms-2 me-5 mt-2"
      alt="logo"
      src="../assets/img/GameQ2.png"
      height="35"
      width="75"
    />
    <ul class="p-0">
      <li
        class="list"
        :class="{ 'router-link-active': $route.name == 'GameCloset' }"
      >
        <router-link :to="{ name: 'GameCloset' }">
          <a href="#" class="mt-4">
            <span class="text text-light">Home</span>
            <span class="icon">
              <i class="text-light mdi mdi-home"></i>
            </span>
          </a>
        </router-link>
      </li>
      <li
        class="list"
        :class="{ 'router-link-active': $route.name == 'Search' }"
      >
        <router-link :to="{ name: 'Search' }">
          <a href="#" class="mt-4">
            <span class="text text-light">Search</span>
            <span class="icon">
              <i class="text-light mdi mdi-magnify"></i>
            </span>
          </a>
        </router-link>
      </li>
      <li
        class="list"
        :class="{
          'router-link-active':
            $route.name == 'GameNight' || $route.name == 'GameNightDetails',
        }"
      >
        <router-link :to="{ name: 'GameNight' }">
          <a
            href="#"
            class="mt-4"
            :class="{ 'router-link-active': $route.name == 'GameNightDetails' }"
          >
            <span class="text text-light">GameNights</span>
            <span class="icon">
              <i class="text-light mdi mdi-chess-knight"></i>
            </span>
          </a>
        </router-link>
      </li>
      <div class="indicator"></div>
    </ul>
    <span class="ms-auto mt-2">
      <button
        class="btn selectable text-ep text-light text-uppercase my-2 my-lg-0"
        @click="login"
        v-if="!user.isAuthenticated"
      >
        Login
      </button>
      <span class="icon me-3" v-else>
        <i
          class="text-light mdi mdi-account"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
        ></i>
      </span>
    </span>
  </div>
  <AccountOffcanvas />
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

.profile-img {
  height: 50px;
  width: 50px;
  object-fit: cover;
}
.mdi-account {
  font-size: 1.5em;
  cursor: pointer;
}

.navigation {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--bs-primary);
  display: flex;
  justify-content: center;
  align-items: center;
}
.navigation ul {
  display: flex;
  width: 100%;
}
.navigation ul li {
  position: relative;
  list-style: none;
  width: 70px;
  z-index: 1;
}
.navigation ul li a {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  text-align: center;
  font-weight: 500;
}
.navigation ul li a .icon {
  position: relative;
  display: block;
  line-height: 30px;
  font-size: 1.5em;
  text-align: center;
  transition: 0.5s;
  color: var(--bs-clr);
}
.navigation ul li a.router-link-active .icon {
  transform: translateY(32px);
}
.navigation ul li a .text {
  position: absolute;
  color: var(--bs-clr) font-weight 400;
  font-size: 0.75em;
  letter-spacing: 0.05em;
  transition: 0.5s;
  opacity: 0;
  transform: translateY(-20px);
}
.navigation ul li a.router-link-active .text {
  opacity: 1;
  transform: translateY(-15px);
}
.indicator {
  position: absolute;
  top: 50%;
  width: 70px;
  height: 70px;
  background: var(--bs-secondary);
  border-radius: 50%;
  border: 6px solid #43394d;
  transition: 0.05s;
}
.indicator::before {
  content: "";
  position: absolute;
  top: 15%;
  left: -24px;
  width: 20px;
  height: 21px;
  background: transparent;
  border-bottom-right-radius: 15px;
  box-shadow: 1px 10px 0 0 #43394d;
}
.indicator::after {
  content: "";
  position: absolute;
  top: 15%;
  right: -23px;
  width: 20px;
  height: 21px;
  background: transparent;
  border-bottom-left-radius: 17px;
  box-shadow: -1px 10px 0 0 #43394d;
}

.navigation ul li:nth-child(1).router-link-active ~ .indicator {
  transform: translateX(calc(70px * 0));
}
.navigation ul li:nth-child(2).router-link-active ~ .indicator {
  transform: translateX(calc(70px * 1));
}
.navigation ul li:nth-child(3).router-link-active ~ .indicator {
  transform: translateX(calc(70px * 2));
}
.navigation ul li:nth-child(4).router-link-active ~ .indicator {
  transform: translateX(calc(70px * 3));
}
</style>