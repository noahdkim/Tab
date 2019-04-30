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
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import './stylus/main.styl'

/* 
 * Use pretty-checkbox-vue from 
 * https://hamed-ehtesham.github.io/pretty-checkbox-vue/
 */
import PrettyInput from 'pretty-checkbox-vue/input';
import PrettyCheck from 'pretty-checkbox-vue/check';
import PrettyRadio from 'pretty-checkbox-vue/radio';

Vue.component('p-input', PrettyInput);
Vue.component('p-check', PrettyCheck);
Vue.component('p-radio', PrettyRadio);

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false


Vue.use(Vuetify, {
  iconfont: 'mdi'
})

/* connect to firebase */
require("firebase/functions");


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
