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

function findIndexOfItem(list, id) {
    let foundIndex = list.findIndex(function(item) {
        return item.item_meta.id === id;
    });
    return foundIndex;
}

export const store = new Vuex.Store({
    state: {
        activeItemID: 0,
        appTitle: 'Tab',
        selectedDate: '',
        error: null,
        loading: false,
        user: null,
        personalLists: [],
        selectedList: {},
        selectedListItems: [],
        selectedListHeaders: [],
    },
    getters: {
        selectedDate: (state) => {
            return state.selectedDate;
        },
        activeItemID: (state) => {
            return state.activeItemID
        }
    },
    /* change state values */
    mutations: {
        changeActiveState(state, payload) {
            if (payload.active === true){
                state.activeItemID = payload.ID;
            }
            let foundIndex = findIndexOfItem(state.selectedListItems, payload.ID)
            if(foundIndex >= 0){
                state.selectedListItems[foundIndex].item_meta.active = payload.active;
            }
        },
        setActiveItemID(state, payload){
            state.activeItemID = payload;
        },
        setSelectedDate(state, payload){
            state.selectedDate = payload;
        },
        setError(state, payload) {
            state.error = payload;
        },
        setLoading(state, payload) {
            state.loading = payload;
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
        changeActiveItem({ state, commit, dispatch }, params){
            /* change previously active item to not active */
            let prevActiveItemIndex = findIndexOfItem(state.selectedListItems, state.activeItemID);
            if (prevActiveItemIndex !== -1){
                // save the previously active item and set the state of the item to false
                dispatch('saveItem', state.selectedListItems[prevActiveItemIndex]);
                commit('changeActiveState', {active: false, ID: state.activeItemID});
            }

            /* change new item ID to active */
            commit('changeActiveState', {active: true, ID: params.item_meta.id});
            commit('setActiveItemID', params.item_meta.id);
        },
        changeSelectedList({ state, commit, dispatch }, selectedList){
            let indexOfList = this.state.personalLists.findIndex((list)=>{return list === selectedList})
            commit('setSelectedList', this.state.personalLists[indexOfList]);
            dispatch('loadSelectedListHeaders');
            dispatch('loadSelectedListItems');
        },
        createNewItem({ state, commit }, params){
            let myRef = firebase.database().ref().push();
            var key = myRef.key;
            let today = new Date()
            // need Date object with no seconds or miliseconds in order to parse into timestamp
            let d = new Date(today.getFullYear(),today.getMonth() , today.getDate());
            let firebaseDateSeconds = d.getTime() / 1000;
            let todayTimestamp = new firebase.firestore.Timestamp(firebaseDateSeconds, 0)
            let newItem = {
                            item_meta:{
                                id: key,
                                active: true,
                                index: state.selectedListItems.length,
                            },
                            values: {}
            }
            state.selectedListHeaders.forEach((header) =>{
                if (header.type === "date"){
                    newItem.values[header.name] = todayTimestamp;
                } else {
                    newItem.values[header.name] = "";
                }
            }

            )
            state.selectedListItems.push(newItem);
            return "added";
        },
        createNewList({ state, commit }, params){
            let listName = params.listName;
            let columnOptions = params.columnOptions;

            let myRef = firebase.database().ref().push();
            var listMetaKey = myRef.key;

            myRef = firebase.database().ref().push();
            let listContentKey = myRef.key;
            console.log(listMetaKey, listContentKey);
            // create in db first and then switch in UI or the other way?
            let newListMeta = db.collection("lists_meta")
                                .doc(state.user.uid)
                                .collection("personal_lists")
                                .doc(listMetaKey)
                                .set({listContentKey: listContentKey,
                                      name: listName});
            let newListHeadersRef = db.collection("lists_content")
                                            .doc(listContentKey)
                                            .collection("headers")

            let batch = db.batch();
            for(let i=0; i<columnOptions.length; ++i){
                columnOptions[i].index = i;
                let headerRef = firebase.database().ref().push();
                var newHeaderKey = headerRef.key;
                batch.set(newListHeadersRef.doc(newHeaderKey), (columnOptions[i]));
            }
            batch.commit().then(function () {
                console.log("done!")
            });
        },
        deleteItem({ state, commit, dispatch }, params){
            let item = params;
            // using found index is better than item.item_meta.index bc it allows us to be ahead of the db
            // no lag is experienced for the user. Only user item.item_meta.index to load initial order of items
            let foundIndex = findIndexOfItem(state.selectedListItems, item.item_meta.id)
            state.selectedListItems.splice(foundIndex, 1);
            let itemDocRef = db.collection('lists_content').doc(state.selectedList.listContentKey).collection('items').doc(item.item_meta.id);
            itemDocRef.delete()
                .then(function() {
                    dispatch('saveListOrderToFirestore');
                    console.log("Document successfully deleted!");
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
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
            console.log('load personal list data')
            let user_meta = db.collection("lists_meta").doc(state.user.uid);
            let personal_lists_ref = user_meta.collection("personal_lists");
            let groups = user_meta.collection("groups");
            var personalLists = [];
            personal_lists_ref.get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    personalLists.push(doc.data());
                    console.log(doc.data())
                });
                commit('setPersonalLists', personalLists);
                commit('setSelectedList', personalLists[0]);
                dispatch('loadSelectedListHeaders');
                dispatch('loadSelectedListItems');
            });
        },
        loadSelectedListItems({ state, commit }) {
            console.log("loading selected items")
            let list_items = db.collection("lists_content")
                               .doc(state.selectedList.listContentKey)
                               .collection("items")
                               .orderBy("item_meta.index");

            var selectedListItems = [];
            list_items.get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    //  // Convert Firestore timestamp field to Date class
                    // let timestamp = new Date(item.date.seconds * 1000);
                    // item.date = timestamp;
                    let item = doc.data();
                    item.item_meta.id = doc.id;
                    selectedListItems.push(item);
                });

            });

            commit('setSelectedListItems', selectedListItems);
        },
        loadSelectedListHeaders({ state, commit }) {
            let list_items = db.collection("lists_content")
                               .doc(state.selectedList.listContentKey)
                               .collection("headers")
                               .orderBy("index");

            let newSelectedListHeaders = [];
            list_items.get().then(querySnapshot => {
                querySnapshot.forEach(doc =>    {
                    let header = doc.data();
                    newSelectedListHeaders.push(header);
                });

            });

            commit('setSelectedListHeaders', newSelectedListHeaders);
        },
        saveItem({ state, commit }, params){
            let item = params;
            let itemDocRef = db.collection('lists_content').doc(state.selectedList.id).collection('items').doc(item.item_meta.id);
            itemDocRef.set(item)
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
        },
        saveList({ state, commit }, params){
            let batch = db.batch();
            for (var i = 0, n = state.selectedListItems.length; i < n; i++){
                let item = state.selectedListItems[i];
                let itemDocRef = db.collection('lists_content').doc(state.selectedList.listContentKey).collection('items').doc(item.item_meta.id);
                batch.set(itemDocRef, item, {merge: true});
            }
            batch.commit().then().catch(error=>{console.log(error)});
        },
        saveListOrderToFirestore({ state, commit }, params) {
            let selectedListItems = state.selectedListItems;
            if(selectedListItems == null) {
                return false;
            }

            for(let i = 0; i < state.selectedListItems.length; i++)   {
                selectedListItems[i].item_meta.index = i;
            }
            commit('setSelectedListItems', selectedListItems);
            return "savedListOrder";
        },
        updateItemState({ state, commit }, params){
            let item = params.item;
            let itemIndex = findIndexOfItem(state.selectedListItems, item.item_meta.id)
            let newSelectedListItems = state.selectedListItems;
            newSelectedListItems[itemIndex]['values'][params.header] = params.newValue;
            commit('setSelectedListItems', newSelectedListItems);
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
