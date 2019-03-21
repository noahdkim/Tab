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
        activeItemIndex: 0,
        appTitle: 'Tab',
        error: null,
        loading: false,
        user: null,
        personalLists: [],
        selectedList: {},
        selectedListItems: [],
        selectedListHeaders: [],
    },
    /* change state values */
    mutations: {
        setActiveItemIndex(state, payload) {
            console.log("SET ACTIVE ITEM INDEX");
            state.selectedListItems[state.activeItemIndex].active = false;
            /* find index of new item and set to active */
            let foundIndex = state.selectedListItems.findIndex(function(item) {
                return item.id == payload;
            });
            state.activeItemIndex = foundIndex;
            state.selectedListItems[foundIndex].active = true;
        },
        setError(state, payload) {
            state.error = payload
        },
        setLoading(state, payload) {
            state.loading = payload
        },
        setPersonalLists(state, payload) {
            state.personalLists = payload;
        },
        setSelectedList(state, payload) {
            state.selectedList = payload;
        },
        setSelectedListItems(state, payload) {
            state.selectedListItems = payload;
        },
        setSelectedListHeaders(state, payload) {
            state.selectedListHeaders = payload;
        },
        setUser(state, payload) {
            state.user = payload;
        },


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
        loadGroupListData({ state, commit }) {
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
        loadPersonalListData({ state, commit, dispatch }) {
            let user_meta = db.collection("lists_meta").doc(state.user.uid);
            let personal_lists_ref = user_meta.collection("personal_lists");
            let groups = user_meta.collection("groups");
            var personalLists = [];
            personal_lists_ref.get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    personalLists.push(doc.data());
                });
                commit('setPersonalLists', personalLists);
                commit('setSelectedList', personalLists[0]);
                dispatch('loadSelectedListHeaders');
                dispatch('loadSelectedListItems');

            });
        },
        loadSelectedListItems({ state, commit }) {
            let list_items = db.collection("lists_content").doc(state.selectedList.id).collection('items');
            var selectedListItems = [];
            list_items.get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    let item = doc.data();
                    item.id = doc.id;
                    item.active = false;
                    selectedListItems.push(item);
                })
                commit('setSelectedListItems', selectedListItems);
            });
        },
        loadSelectedListHeaders({ state, commit }) {
            let list_items = db.collection("lists_content").doc(state.selectedList.id);
            list_items.get().then(docSnapshot => {
                if (docSnapshot.exists){
                    commit('setSelectedListHeaders', docSnapshot.data().headers);
                } else {
                    console.log('No document found!');
                }
            });
        },
        saveChangedItem({ state, commit }, params){
            /* change previously active item to not active */
            if(state.selectedListItems[state.activeItemIndex]) {
                let prevActiveID = state.selectedListItems[state.activeItemIndex].id;
                /* save state of previously active item */
                let prevItemDocRef = db.collection('lists_content').doc(state.selectedList.id).collection('items').doc(prevActiveID);
                prevItemDocRef.get().then(thisDoc => {
                    if (thisDoc.exists) {
                        let newDocState = state.selectedListItems[state.activeItemIndex];
                        prevItemDocRef.update(newDocState);
                        commit('setActiveItemIndex', params.new_item_id);

                    } else {
                        console.log("doesn't exist");
                    }
                })
            }
            /* This is necessary because other commit is in an asynch call */
            else{
                commit('setActiveItemIndex', params.new_item_id);
            }

        },
        updateItemState({ state, commit }, params){
            let foundIndex = state.selectedListItems.findIndex(function(item) {
                return item.id === params.itemID;
            });
            let newSelectedListItems = state.selectedListItems;
            newSelectedListItems[foundIndex][params.header] = params.newText;
            commit('setSelectedListItems', newSelectedListItems);
            console.log(state.selectedListItems);
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


    },
    getters: {
        isAuthenticated(state) {
            return state.user !== null && state.user !== undefined
        },
        getSelectedListItems(state) {
            return state.selectedListItems;
        },
        getSelectedListHeaders(state) {
            return state.selectedListHeaders;
        },

    }
})
