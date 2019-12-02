import axios from 'axios';
import firebase from 'firebase';
import 'firebase/firestore';
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';/* Vuetify css */
import 'material-design-icons-iconfont/dist/material-design-icons.css'; // Ensure you are using css-loader
import '@mdi/font/css/materialdesignicons.css'; // Ensure you are using css-loader
import 'vuetify/dist/vuetify.min.css';
/*
 * Use pretty-checkbox-vue from
 * https://hamed-ehtesham.github.io/pretty-checkbox-vue/
 */
import PrettyInput from 'pretty-checkbox-vue/input';
import PrettyCheck from 'pretty-checkbox-vue/check';
import PrettyRadio from 'pretty-checkbox-vue/radio';
import { store } from './store';
import router from './router';
import EventBus from './event-bus';
import App from './App.vue';
import vuetify from './plugins/vuetify';

Vue.component('p-input', PrettyInput);
Vue.component('p-check', PrettyCheck);
Vue.component('p-radio', PrettyRadio);

Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;
Vue.prototype.$bus = EventBus;
window.Vue = Vue;

Vue.use({ Vuetify });

/* connect to firebase */
require('firebase/functions');


/* eslint-disable no-new */
const unsubscribe = firebase.auth()
  .onAuthStateChanged((firebaseUser) => {
    new Vue({
      el: '#app',
      router,
      store,

      created() {
        if (firebaseUser) {
          store.dispatch('autoSignIn', firebaseUser);
        }
      },
      render: (h) => h(App),
      vuetify,
    });
    unsubscribe();
  });
