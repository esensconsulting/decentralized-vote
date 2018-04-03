import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Signup from '@/components/Signup'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    }
  ]
})

router.beforeEach((to, from, next) => {
  store.state.isLoading = false
  // Look at all routes
  router.options.routes.forEach((route) => {
    // If this is the current route and it's secure
    if (to.matched[0].path === route.path && route.secure) {
      // Verify that the user isn't logged in
      if (!store.state.connectedUser.isLogged) {
        return next('/')
      }
    }
    next()
  })
})

export default router
