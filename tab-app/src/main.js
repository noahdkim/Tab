import App from './App.vue'
import axios from 'axios'
import firebase from 'firebase'
import 'firebase/firestore'
import router from './router'
import {store} from './store'
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' /* Vuetify css */
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader


Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false


Vue.use(Vuetify, {
  iconfont: 'md'
})

/* connect to firebase */



/* eslint-disable no-new */
const unsubscribe = firebase.auth()
.onAuthStateChanged((firebaseUser) => {
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    created () {
      if (firebaseUser) {
        store.dispatch('autoSignIn', firebaseUser)
      }
    }
  })
  unsubscribe()
})
