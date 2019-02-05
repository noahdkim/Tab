import firebase from 'firebase'
import router from '@/router'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


/*
    appTitle - title of the app
    user     - authorized user date (post login)
    error    - storing any errors
    loading  - flag to indicate if data is being loaded
*/

export const store = new Vuex.Store({
    state: {
        appTitle: 'Tab',
        user: null,
        error: null,
        loading: false,
    },
    /* change state values */
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        setError(state, payload) {
            state.error = payload
        },
        setLoading(state, payload) {
            state.loading = payload
        }
    },
    actions: {
        userSignUp({
            commit
        }, payload) {
            commit('setLoading', true)
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(firebaseUser => {
                    commit('setUser', {
                        email: firebaseUser.user.email
                    })
                    commit('setLoading', false)
                    commit('setError', null)
                    router.push('/home')
                })
                .catch(error => {
                    commit('setError', error.message)
                    commit('setLoading', false)
                })
        },
        userSignIn({
            commit
        }, payload) {
            commit('setLoading', true)
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(firebaseUser => {
                    commit('setUser', {
                        email: firebaseUser.user.email
                    })
                    commit('setLoading', false)
                    commit('setError', null)
                    router.push('/home')
                })
                .catch(error => {
                    commit('setError', error.message)
                    commit('setLoading', false)
                })
        },
        autoSignIn({
            commit
        }, payload) {
            commit('setUser', {
                email: payload.email
            })
        },
        userSignOut({
            commit
        }) {
            firebase.auth().signOut()
            commit('setUser', null)
            router.push('/')
        },
    },
    getters: {
        isAuthenticated(state) {
            return state.user !== null && state.user !== undefined
        }
    }
})
