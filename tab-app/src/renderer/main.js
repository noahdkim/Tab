import App from './App'
import axios from 'axios'
import firebase from 'firebase'
import router from './router'
import {store} from './store'
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' /* Vuetify css */
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader




if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false


Vue.use(Vuetify, {
  iconfont: 'md'
})

/* connect to firebase */

firebase.initializeApp({
    apiKey: "AIzaSyBjkYFQB-DX0O9RKf_NFktYiHdHZkSDDX4",
    authDomain: "tab-electron.firebaseapp.com",
    databaseURL: "https://tab-electron.firebaseio.com",
    projectId: "tab-electron",
    storageBucket: "tab-electron.appspot.com",
    messagingSenderId: "784020768295"
})

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
