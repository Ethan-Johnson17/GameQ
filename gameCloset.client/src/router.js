import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard, authSettled } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)

}

const routes = [
  {
    path: '/',
    name: 'GameCloset',
    component: loadPage('GameClosetPage'),
    beforeEnter: authSettled

  },
  {
    path: '/search',
    name: 'Search',
    component: loadPage('SearchPage'),
    beforeEnter: authSettled
  },
  {
    path: '/gameNight',
    name: 'GameNight',
    component: loadPage('GameNightPage'),
    beforeEnter: authSettled
  },

  {
    path: '/gameNight/:id',
    name: 'GameNightDetails',
    component: loadPage('ActiveGameNightPage'),
    beforeEnter: authSettled
  },

  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
