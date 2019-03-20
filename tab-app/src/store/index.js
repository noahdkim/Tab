import firebase from 'firebase'
import router from '@/router'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

firebase.initializeApp({
    apiKey: "AIzaSyBQMf7_dSLWXAj4LkeCLyomJVrMYsVfVW4",
    authDomain: "tab-notes-54d8a.firebaseapp.com",
    databaseURL: "https://tab-notes-54d8a.firebaseio.com",
    projectId: "tab-notes-54d8a",
    storageBucket: "tab-notes-54d8a.appspot.com",
    messagingSenderId: "833049930285"
})

export const db = firebase.firestore();

/*
    appTitle - title of the app
    user     - authorized user date (post login)
    error    - storing any errors
    loading  - flag to indicate if data is being loaded
*/

export const store = new Vuex.Store({
    state: {
        appTitle: 'Tab',
        error: null,
        loading: false,
        user: null,
        personalLists: [],
        selectedList: {},
        selectedListItems: [],
    },
    /* change state values */
    mutations: {
        setError(state, payload) {
            state.error = payload
        },
        setLoading(state, payload) {
            state.loading = payload
        },
        setUser(state, payload) {
            state.user = payload
        },
        setSelectedList(state, payload) {
            state.selectedList = payload;
        },
        setPersonalLists(state, payload) {
            state.personalLists = payload;
        },
        setSelectedListItems(state, payload) {
            state.selectedListItems = payload;
        }
    },
    actions: {
        autoSignIn({
            commit
        }, payload) {
            commit('setUser', {
                email: payload.email,
                uid: payload.uid,
            })
        },
        userSignUp({
            commit
        }, payload) {
            commit('setLoading', true)
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(firebaseUser => {
                    /* add new user to list collection */
                    db.collection('lists_meta').doc(firebaseUser.user.uid).set({
                        "email": firebaseUser.user.email,
                    })
                    /* add new user to list_names collection */
                    db.collection('lists_content').doc(firebaseUser.user.uid).set({
                        "email": firebaseUser.user.email,
                    })
                    commit('setUser', {
                        email: firebaseUser.user.email,
                        uid: firebaseUser.user.uid
                    })
                    commit('setLoading', false)
                    commit('setError', null)
                    router.push('/Home')
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
                        email: firebaseUser.user.email,
                        uid: firebaseUser.user.uid
                    })
                    commit('setLoading', false)
                    commit('setError', null)
                    router.push('/Home')
                })
                .catch(error => {
                    commit('setError', error.message)
                    commit('setLoading', false)
                })
        },
        userSignOut({
            commit
        }) {
            firebase.auth().signOut()
            .then(()=>{
                commit('setUser', null)
                router.push('/')
            })
            .catch(error => {
                commit('setError', error.message)
                commit('setLoading', false)
            })

        },
        loadPersonalListData({ state, commit, dispatch }) {
            console.log(state.user);
            let user_meta = db.collection("lists_meta").doc(state.user.uid);
            let personal_lists_ref = user_meta.collection("personal_lists");
            let groups = user_meta.collection("groups");
            var personalLists = [];
            personal_lists_ref.get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    personalLists.push(doc.data());
                });
                console.log("load personal list data");
                commit('setPersonalLists', personalLists);
                console.log(personalLists[0])
                commit('setSelectedList', personalLists[0]);
                console.log(state.selectedList)
                dispatch('loadSelectedListItems');
            });
        },
        loadGroupListData({ state, commit }) {
            console.log("store/index.js: getSelectedListItems");
            console.log(state.user.email);
            let user_meta = db.collection("lists_meta").doc(state.user.uid);
            let personal_lists_ref = user_meta.collection("personal_lists");
            let groups = user_meta.collection("groups")
            personal_lists_ref.get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                });
            });
        },
        loadSelectedListItems({ state, commit }) {
            console.log(state.selectedList.id);
            let list_items = db.collection("lists_content").doc(state.selectedList.id).collection('items');
            var selectedListItems = [];
            list_items.get().then(function(querySnapshot){
                querySnapshot.forEach(function(doc){
                    selectedListItems.push(doc.data());
                })
            });
            commit('setSelectedListItems', selectedListItems);
        }
    },
    getters: {
        isAuthenticated(state) {
            return state.user !== null && state.user !== undefined
        },

    }
})
