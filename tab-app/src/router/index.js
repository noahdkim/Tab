import Vue from 'vue'
import Router from 'vue-router'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import firebase from 'firebase'

Vue.use(Router)

/* array routing for each component */
const routerOptions = [
  { path: '/', component: 'Landing' },
  { path: '/SignIn', component: 'SignIn' },
  { path: '/SignUp', component: 'SignUp' },
  { path: '/Home', component: 'Home', meta: { requiresAuth: true } },
  { path: '*', component: 'NotFound' }
]

/*
map the array to create routes
(lazy loading https://router.vuejs.org/guide/advanced/lazy-loading.html)
*/
const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`@/components/${route.component}.vue`)
  }
})

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = firebase.auth().currentUser
  
  if(!requiresAuth && isAuthenticated)   {
      next('/Home')
  }
  else if (requiresAuth && !isAuthenticated) {
    next('/SignIn')
  } else {
    next()
  }
})

export default router
