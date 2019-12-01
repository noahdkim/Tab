import firebase from 'firebase';
import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/router';

Vue.use(Vuex);

firebase.initializeApp({
  apiKey: 'AIzaSyBQMf7_dSLWXAj4LkeCLyomJVrMYsVfVW4',
  authDomain: 'tab-notes-54d8a.firebaseapp.com',
  databaseURL: 'https://tab-notes-54d8a.firebaseio.com',
  projectId: 'tab-notes-54d8a',
  storageBucket: 'tab-notes-54d8a.appspot.com',
  messagingSenderId: '833049930285',
});

export const db = firebase.firestore();
const functions = firebase.functions();
const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
firebase.auth().useDeviceLanguage();


/*
    appTitle - title of the app
    user     - authorized user date (post login)
    error    - storing any errors
    loading  - flag to indicate if data is being loaded
*/

function findIndexOfItem(list, id) {
  const foundIndex = list.findIndex((item) => item.item_meta.id === id);
  return foundIndex;
}

function listComparator(a, b) {
  let sortResult;
  if (this.sortColumnIndex === 'checked') {
    sortResult = ((a.item_meta.checked === b.item_meta.checked) ? 0 : !a.item_meta.checked);
  } else {
    const columnID = this.selectedListColumns[this.sortColumnIndex].id;
    const columnType = this.selectedListColumns[this.sortColumnIndex].type;
    if (columnType === 'date') {
      sortResult = (a.values[columnID].seconds > b.values[columnID].seconds);
    } else if (columnType === 'integer') {
      sortResult = (parseInt(a.values[columnID]) < parseInt(b.values[columnID]));
    } else if (columnType === 'string') {
      sortResult = (a.values[columnID] > b.values[columnID]);
    }
  }
  return this.sortDescending ? sortResult : !sortResult;
}

function initialState() {
  return {
    activeItemID: 0,
    appTitle: 'Tab',
    dateFilterColumn: {},
    dateColumnExists: false,
    filterByDate: false,
    selectedDate: '',
    selectedIntegerField: '',
    error: null,
    loading: false,
    user: null,
    personalLists: [],
    selectedListMeta: {},
    selectedListItems: {
      checkedItems: [],
      uncheckedItems: [],
    },
    selectedListColumns: [],
    selectedListSettings: [],
    showChecked: false,
    sortSettings: {
      columnID: '...',
      ascending: true,
    },
    sorting: false,
  };
}

export const store = new Vuex.Store({
  state: {
    activeItemID: 0,
    appTitle: 'Tab',
    dateFilterColumn: {},
    dateColumnExists: false,
    filterByDate: false,
    filtering: false,
    selectedDate: '',
    selectedIntegerField: '',
    error: null,
    loading: false,
    user: null,
    personalLists: [],
    selectedListMeta: {},
    selectedListItems: {
      checkedItems: [],
      uncheckedItems: [],
    },
    selectedListColumns: [],
    selectedListSettings: [],
    showChecked: true,
    sortSettings: {
      columnID: '...',
      ascending: true,
    },
    sorting: false,
  },
  /* change state values */
  mutations: {
    changeActiveState(state, payload) {
      const foundIndex = findIndexOfItem(state.selectedListItems.uncheckedItems, payload.id);
      if (foundIndex < 0) {
        return;
      }
      if (payload.active === true) {
        state.activeItemID = payload.id;
      }
      state.selectedListItems.uncheckedItems[foundIndex].item_meta.active = payload.active;
    },
    setActiveItemID(state, payload) {
      state.activeItemID = payload;
    },
    setSelectedDate(state, payload) {
      state.selectedDate = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    setFiltering(state, payload) {
      state.filtering = payload;
    },
    setFilterByDate(state, payload) {
      Vue.set(state.selectedListSettings, 'filterByDate', payload);
      // state.selectedListSettings.filterByDate = payload;
      const { listMetaKey } = state.selectedListMeta;
      const listMetaRef = db.collection('lists_meta')
        .doc(state.user.uid)
        .collection('personal_lists')
        .doc(listMetaKey);
      listMetaRef.update(state.selectedListSettings);
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setPersonalLists(state, payload) {
      state.personalLists = payload;
    },
    setSelectedList(state, payload) {
      state.selectedListMeta = payload;
    },
    setSelectedListCheckedItems(state, payload) {
      state.selectedListItems.checkedItems = payload;
    },
    setSelectedListUncheckedItems(state, payload) {
      state.selectedListItems.uncheckedItems = payload;
    },
    setSelectedListColumns(state, payload) {
      state.selectedListColumns = payload;
    },
    setSelectedIntegerField(state, payload) {
      state.selectedIntegerField = payload;
    },
    setSelectedListSettings(state, payload) {
      state.selectedListSettings = payload;
    },
    setShowChecked(state, payload) {
      state.selectedListSettings.showChecked = payload;
      const { listMetaKey } = state.selectedListMeta;
      const listMetaRef = db.collection('lists_meta')
        .doc(state.user.uid)
        .collection('personal_lists')
        .doc(listMetaKey);
      listMetaRef.update(state.selectedListSettings);
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setSortColumnID(state, newColumnID) {
      state.sortColumnID = newColumnID;
    },
    setSortDescending(state, newValue) {
      state.sortDescending = newValue;
    },
    setSorting(state, newValue) {
      state.sorting = newValue;
    },
    reset(state) {
      // acquire initial state
      const s = initialState();
      Object.keys(s).forEach((key) => {
        state[key] = s[key];
      });
    },
  },
  actions: {
    autoSignIn({
      commit,
    }, payload) {
      commit('setUser', {
        email: payload.email,
        uid: payload.uid,
      });
    },
    changeActiveItem({ state, commit, dispatch }, item) {
      /* change previously active item to not active */
      // save the previously active item and set the state of the item to false
      const prevActiveItemIndex = findIndexOfItem(state.selectedListItems.uncheckedItems, state.activeItemID);
      if (prevActiveItemIndex >= 0) {
        dispatch('saveItem', state.selectedListItems.uncheckedItems[prevActiveItemIndex]);
        commit('changeActiveState', { active: false, id: state.activeItemID });
      }

      /* change new item ID to active */
      commit('changeActiveState', { active: true, id: item.item_meta.id });
      commit('setActiveItemID', item.item_meta.id);
    },
    changeSelectedList({ state, commit, dispatch }, selectedList) {
      const indexOfList = this.state.personalLists.findIndex((list) => list === selectedList);
      commit('setSelectedList', this.state.personalLists[indexOfList]);
      dispatch('loadListColumns', state.selectedListMeta.listContentKey).then((columns) => {
        commit('setSelectedListColumns', columns);
      });
      dispatch('loadSelectedListItems');
      dispatch('loadListSettings', this.state.selectedListMeta.listMetaKey).then((settings) => {
        commit('setSelectedListSettings', settings);
      });
    },
    createNewItem({ state, commit, dispatch }, params) {
      const myRef = firebase.database().ref().push();
      const { key } = myRef;
      const today = new Date();
      // need Date object with no seconds or miliseconds in order to parse into timestamp
      const d = new Date(this.state.selectedDate);
      const firebaseDateSeconds = d.getTime() / 1000;
      const todayTimestamp = new firebase.firestore.Timestamp(firebaseDateSeconds, 0);
      const newItem = {
        item_meta: {
          active: false,
          checked: false,
          id: key,
          index: state.selectedListItems.uncheckedItems.length,
        },
        values: {},
      };
      state.selectedListColumns.forEach((column) => {
        if (column.type === 'date') {
          newItem.values[column.id] = todayTimestamp;
        } else {
          newItem.values[column.id] = '';
        }
      });
      state.selectedListItems.uncheckedItems.push(newItem);

      // dispatch('changeActiveItem', newItem);
      return key;
    },
    createNewList({ state, commit }, params) {
      const { listName } = params;
      const { columns } = params;

      let myRef = firebase.database().ref().push();
      const listMetaKey = myRef.key;

      myRef = firebase.database().ref().push();
      const listContentKey = myRef.key;
      const newListData = {
        listContentKey,
        filterByDate: false,
        listMetaKey,
        name: listName,
        index: state.personalLists.length,
        showChecked: false,
      };
      // create in db first and then switch in UI or the other way?
      const newListMeta = db.collection('lists_meta')
        .doc(state.user.uid)
        .collection('personal_lists')
        .doc(listMetaKey)
        .set(newListData);
      const newListColumnsRef = db.collection('lists_content')
        .doc(listContentKey)
        .collection('columns');


      const batch = db.batch();
      for (let i = 0; i < columns.length; ++i) {
        const columnRef = firebase.database().ref().push();
        const newColumnKey = columnRef.key;
        columns[i].index = i;
        columns[i].id = newColumnKey;
        batch.set(newListColumnsRef.doc(newColumnKey), (columns[i]));
      }
      batch.commit().then((result) => {
        const { personalLists } = state;
        personalLists.push(newListData);
        commit('setPersonalLists', personalLists);
      }).catch((error) => {
      });
    },
    deleteItem({ state, commit, dispatch }, item) {
      // using found index is better than item.item_meta.index bc it allows us to be ahead of the db
      // no lag is experienced for the user. Only user item.item_meta.index to load initial order of items
      const list = item.item_meta.checked ? state.selectedListItems.checkedItems : state.selectedListItems.uncheckedItems;
      const foundIndex = findIndexOfItem(list, item.item_meta.id);
      list.splice(foundIndex, 1);
      const itemDocRef = db.collection('lists_content').doc(state.selectedListMeta.listContentKey).collection('items').doc(item.item_meta.id);
      itemDocRef.delete()
        .then(() => {
          dispatch('saveListOrder');
        })
        .catch((error) => {
        });
    },
    deleteList({ state, commit, dispatch }, list) {
      const listMetaRef = db.collection('lists_meta')
        .doc(state.user.uid)
        .collection('personal_lists')
        .doc(list.listMetaKey);
      const listContentRef = db.collection('lists_content')
        .doc(list.listContentKey);
      // let recursiveDelete = firebase.functions().httpsCallable('recursiveDelete');
      // let data = {path:'/lists_content/'+list.listContentKey}
      // recursiveDelete(data).then((result) => console.log(result))
      listMetaRef.delete().then((result) => {
        const { personalLists } = state;
        const listIndex = personalLists
          .findIndex((personalList) => personalList === list);
        personalLists.splice(listIndex, 1);
        commit('setPersonalLists', personalLists);
        if (state.selectedListMeta === list) {
          dispatch('changeSelectedList', state.personalLists[0]);
        }
      }).catch((error) => {
      });
    },
    editList({ state, commit, dispatch }, params) {
      const { columns } = params;
      const { listSelector } = params;
      const { listName } = params;
      const newListData = { name: listName };

      // create in db first and then switch in UI or the other way?
      const listMeta = db.collection('lists_meta')
        .doc(state.user.uid)
        .collection('personal_lists')
        .doc(listSelector.listMetaKey)
        .update(newListData);
      const listColumnsRef = db.collection('lists_content')
        .doc(listSelector.listContentKey)
        .collection('columns');

      // batch set all columns
      const batch = db.batch();
      for (let i = 0; i < columns.length; ++i) {
        const myRef = firebase.database().ref().push();
        const columnKey = columns[i].id ? columns[i].id : myRef.key;
        columns[i].index = i;
        columns[i].id = columnKey;
        batch.set(listColumnsRef.doc(columnKey), columns[i]);
      }

      // commit, update in store, change to that list
      batch.commit().then((result) => {
        const { personalLists } = state;
        listSelector.name = listName;
        personalLists[listSelector.index] = listSelector;
        dispatch('changeSelectedList', personalLists[listSelector.index]);
      }).catch((error) => {
      });
    },
    listDragSwap({ state, commit }, newList) {
      const selectedListUncheckedItems = state.selectedListItems.uncheckedItems;
      newList.forEach((item, index) => {
        const itemIndex = findIndexOfItem(selectedListUncheckedItems, item.item_meta.id);
        [selectedListUncheckedItems[index], selectedListUncheckedItems[itemIndex]] = [selectedListUncheckedItems[itemIndex], selectedListUncheckedItems[index]];
      });
      commit('setSelectedListUncheckedItems', selectedListUncheckedItems);
    },
    loadGroupListData({ state, commit }) {
      const user_meta = db.collection('lists_meta').doc(state.user.uid);
      const personal_lists_ref = user_meta.collection('personal_lists');
      const groups = user_meta.collection('groups');
      personal_lists_ref.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
        });
      });
    },
    loadPersonalListData({ state, commit, dispatch }) {
      const userMeta = db.collection('lists_meta').doc(state.user.uid);
      const personal_lists_ref = userMeta.collection('personal_lists').orderBy('index');
      const personalLists = [];
      personal_lists_ref.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          personalLists.push(doc.data());
        });
        commit('setPersonalLists', personalLists);
        commit('setSelectedList', personalLists[0]);
        dispatch('loadListColumns', state.selectedListMeta.listContentKey).then((columns) => {
          commit('setSelectedListColumns', columns);
        });
        dispatch('loadListSettings', state.selectedListMeta.listMetaKey).then((settings) => {
          commit('setSelectedListSettings', settings);
        });
        dispatch('loadSelectedListItems');
      });
    },
    loadSelectedListItems({ state, commit }) {
      const listItemsRef = db.collection('lists_content')
        .doc(state.selectedListMeta.listContentKey)
        .collection('items')
        .orderBy('item_meta.index');

      const selectedListCheckedItems = [];
      const selectedListUncheckedItems = [];

      listItemsRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const item = doc.data();
          item.item_meta.active = false;
          if (item.item_meta.checked) {
            selectedListCheckedItems.push(item);
          } else {
            selectedListUncheckedItems.push(item);
          }
        });
      });
      commit('setSelectedListCheckedItems', selectedListCheckedItems);
      commit('setSelectedListUncheckedItems', selectedListUncheckedItems);
    },
    loadListColumns({ state, commit }, listContentKey) {
      const listItems = db.collection('lists_content')
        .doc(listContentKey)
        .collection('columns')
        .orderBy('index');

      const listColumns = [];
      return listItems.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const column = doc.data();
          listColumns.push(column);
        });
        return listColumns;
      });
    },
    loadListSettings({ state, commit }, listMetaKey) {
      const listMetaRef = db.collection('lists_meta')
        .doc(state.user.uid)
        .collection('personal_lists')
        .doc(listMetaKey);
      return listMetaRef.get().then((querySnapshot) => querySnapshot.data());
    },
    saveItem({ state, commit }, item) {
      if (item == null) {
        return;
      }
      const itemDocRef = db.collection('lists_content').doc(state.selectedListMeta.listContentKey).collection('items').doc(item.item_meta.id);
      itemDocRef.set(item)
        .catch((error) => {
          console.error('Error writing document: ', error);
        });
    },
    saveListToFirestore({ state, commit }, params) {
      const batch = db.batch();
      // save uncheckedItems
      for (var i = 0, n = state.selectedListItems.uncheckedItems.length; i < n; i++) {
        const item = state.selectedListItems.uncheckedItems[i];
        const itemDocRef = db.collection('lists_content').doc(state.selectedListMeta.listContentKey).collection('items').doc(item.item_meta.id);
        batch.set(itemDocRef, item, { merge: true });
      }

      // save checked items
      for (var i = 0, n = state.selectedListItems.checkedItems.length; i < n; i++) {
        const item = state.selectedListItems.checkedItems[i];
        const itemDocRef = db.collection('lists_content').doc(state.selectedListMeta.listContentKey).collection('items').doc(item.item_meta.id);
        batch.set(itemDocRef, item, { merge: true });
      }
      batch.commit().then().catch((error) => { console.log(error); });
    },
    saveListOrder({ state, dispatch }, listName) {
      const { selectedListItems } = state;
      const list = listName === 'uncheckedItems' ? selectedListItems.uncheckedItems : selectedListItems.checkedItems;
      if (list == null) {
        return false;
      }

      for (let i = 0; i < list.length; i++) {
        list[i].item_meta.index = i;
      }
      dispatch('saveListToFirestore');
      // commit('setSelectedListUncheckedItems', selectedListUncheckedItems);
      return 'savedListOrder';
    },
    saveSidebarOrder({ state, commit }, params) {
      const { personalLists } = state;
      if (personalLists == null) {
        return false;
      }
      for (let i = 0; i < personalLists.length; i++) {
        personalLists[i].index = i;
      }
      commit('setPersonalLists', personalLists);
      return 'savedSidebarOrder';
    },
    saveSidebarToFirestore({ state }, params) {
      const batch = db.batch();
      for (let i = 0, n = state.personalLists.length; i < n; i++) {
        const list = state.personalLists[i];
        const listDocRef = db.collection('lists_meta').doc(state.user.uid).collection('personal_lists').doc(list.listMetaKey);
        batch.set(listDocRef, list, { merge: true });
      }
      batch.commit().then().catch((error) => { console.log(error); });
    },
    sortList({ state, commit }, column) {
      const list = this.state.selectedListItems.uncheckedItems;
      // sorting is set in ListColumn
      const columnID = column.id;
      const columnType = column.type;
      const { ascending } = this.state.sortSettings;
      this.state.sortSettings.ascending = (this.state.sortSettings.columnID === columnID) ? !ascending : ascending;
      this.state.sortSettings.columnID = columnID;

      if (columnType === 'date') {
        list.sort((a, b) => {
          [a, b] = ascending ? [b, a] : [a, b];
          return (a.values[columnID].seconds > b.values[columnID].seconds);
        });
      } else if (columnType === 'integer') {
        list.sort((a, b) => {
          [a, b] = ascending ? [b, a] : [a, b];
          return (parseInt(a.values[columnID]) < parseInt(b.values[columnID]));
        });
      } else if (columnType === 'string') {
        list.sort((a, b) => {
          [a, b] = ascending ? [b, a] : [a, b];
          return (a.values[columnID] > b.values[columnID]);
        });
      }
      return true;
    },

    toggleItemChecked({ state, dispatch }, item) {
      const arrWithItem = item.item_meta.checked ? this.state.selectedListItems.checkedItems : this.state.selectedListItems.uncheckedItems;
      const arrWithoutItem = !item.item_meta.checked ? this.state.selectedListItems.checkedItems : this.state.selectedListItems.uncheckedItems;

      item.item_meta.checked = !item.item_meta.checked;
      arrWithoutItem.push(item);
      arrWithItem.splice(item.item_meta.index, 1);
      dispatch('saveListOrder', 'uncheckedItems');
      dispatch('saveListOrder', 'checkedItems');
    },
    updateItemState({ state, commit }, params) {
      const { item } = params;
      const list = item.item_meta.checked ? state.selectedListItems.checkedItems : state.selectedListItems.uncheckedItems;
      const itemIndex = findIndexOfItem(list, item.item_meta.id);
      list[itemIndex].values[params.columnId] = params.newValue;
      if (item.item_meta.checked) {
        commit('setSelectedListCheckedItems', list);
      } else {
        commit('setSelectedListUncheckedItems', list);
      }
    },
    userSignInWithEmail({
      commit,
    }, payload) {
      commit('setLoading', true);
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then((result) => {
          const { user } = result;
          commit('setUser', {
            email: user.email,
            uid: user.uid,
          });
          commit('setLoading', false);
          commit('setError', null);
          router.push('/Home');
        })
        .catch((error) => {
          commit('setError', error.message);
          commit('setLoading', false);
        });
    },
    userSignInWithGoogle({ commit }, payload) {
      firebase.auth().signInWithPopup(provider).then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.credential.accessToken;
        // The signed-in user info.
        const { user } = result;
        // ...
        commit('setUser', {
          email: user.email,
          uid: user.uid,
        });
        commit('setLoading', false);
        commit('setError', null);
        router.push('/Home');
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const { email } = error;
        // The firebase.auth.AuthCredential type that was used.
        const { credential } = error;
        // ...
      });
    },
    userSignUp({
      commit,
    }, payload) {
      commit('setLoading', true);
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then((firebaseUser) => {
          /* add new user to list collection */
          db.collection('lists_meta').doc(firebaseUser.user.uid).set({
            email: firebaseUser.user.email,
          });
          db.collection('settings').doc(firebaseUser.user.uid).set({
            email: firebaseUser.user.email,
          });
          commit('setUser', {
            email: firebaseUser.user.email,
            uid: firebaseUser.user.uid,
          });
          commit('setLoading', false);
          commit('setError', null);
          router.push('/Home');
        })
        .catch((error) => {
          commit('setError', error.message);
          commit('setLoading', false);
        });
    },
    userSignOut({
      commit,
    }) {
      firebase.auth().signOut()
        .then(() => {
          commit('setUser', null);
          commit('reset');
          router.push('/');
        })
        .catch((error) => {
          commit('setError', error.message);
          commit('setLoading', false);
        });
    },


  },
  getters: {
    isAuthenticated(state) {
      return state.user !== null && state.user !== undefined;
    },
    getSelectedListItems(state) {
      return state.selectedListItems;
    },
    getSelectedListCheckedItems(state) {
      return state.selectedListItems.checkedItems;
    },
    getSelectedListUncheckedItems(state) {
      return state.selectedListItems.uncheckedItems;
    },
    getSelectedListColumns(state) {
      return state.selectedListColumns;
    },
    getDateFilterColumn: (state) => state.dateFilterColumn,
    getSelectedDate: (state) => state.selectedDate,

  },
});
