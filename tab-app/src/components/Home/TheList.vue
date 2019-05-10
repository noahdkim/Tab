<template>
    <v-layout class="ma-0 pt-2 the-list-parent" justify-center>
            <v-layout column class="ma-0 pa-0 list-all">
                <v-layout row class="ma-0 pa-0 list-title">
                    <v-flex>
                        <div class="list-title">
                            <span class="list-title list-title-text">{{ this.$store.state.selectedList.name }}</span>
                        </div>
                    </v-flex>
                    <v-flex>
                        <v-switch v-if="dateColumnExists" v-model="filterByDate" label="Filter by Date"></v-switch>
                    </v-flex>
                </v-layout>
                <v-layout row class="ma-0 pa-0 list-head">
                    <list-header :headers="selectedListHeaders"></list-header>
                </v-layout>
                <v-layout row class="ma-0 pa-0 list-body">
                    <draggable
                    class="list-group"
                    handle=".handle"
                    v-bind="dragOptions"
                    @start="startDrag()"
                    @end="endDrag()"
                    :list="this.selectedListItems"
                    >
                        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
                            <div class="listRows" v-for="item in filteredAndSortedListItems" :key="item.item_meta.id">
                                <list-row
                                :item="item"
                                :headers="selectedListHeaders"
                                :ref="item.item_meta.id"
                                class="draggable-row align-start"
                                >
                                </list-row>
                            </div>
                        </transition-group>
                    </draggable>
                </v-layout>
                <v-layout row class="ma-0 list-footer">
                    <v-container class="ma-0 add-item-container">
                        <a v-on:click="addNewItem" class="add-item-anchor">
                            <span class="mdi mdi-plus-circle add-item-icon"></span>
                            <span class="add-item-text">Add Item</span>
                        </a>
                    </v-container>
                </v-layout>
            </v-layout>

</v-layout>

</template>

<script>
    import draggable from 'vuedraggable'
    import ListHeader from './List/ListHeader'
    import ListRow from './List/ListRow'
    import { mapGetters } from 'vuex'

    import { EventBus } from '../../store/modules/event-bus.js';

    require('@/assets/styles/main.css');

    export default {
        components: {
            draggable,
            ListHeader,
            ListRow
        },
        data: () => ({
            drag: false,
        }),
        created() {

        },
        computed: {
            ...mapGetters({
                selectedListHeaders: 'getSelectedListHeaders',
                selectedListItems: 'getSelectedListItems',
                dateFilterHeader: 'getDateFilterHeader',
            }),
            dragOptions() {
                return {
                    animation: 200,
                    group: "description",
                    disabled: false,
                    ghostClass: "ghost"
                };
            },
            dateColumnExists(){
                return this.$store.state.dateColumnExists
            },
            filteredListItems: {
                get(){
                    let filteredListItems = this.selectedListItems;
                    if (!this.showChecked){
                        filteredListItems = filteredListItems.filter((item)=>{
                            return !item.item_meta.checked;
                        })
                    }
                    if (this.filterByDate){
                        filteredListItems = filteredListItems.filter((item)=>{
                            return (item.values[this.dateFilterHeader.id].toDate().getTime() === this.selectedDate.getTime()) ||
                                        item.item_meta.active
                        })
                    }
                    return filteredListItems;
                }
            },
            filteredAndSortedListItems: {
                get(){
                    if(this.sortColumnIndex > -1 && this.sorting){
                        this.filteredListItems.sort(this.sortFilteredList)
                        this.$store.commit('setSorting', false)
                    } else {
                        return this.filteredListItems
                    }
                    return this.filteredListItems
                }
            },
            sortColumnIndex:{
                get(){
                    return this.$store.state.sortColumnIndex
                },
            },
            sortDescending: {
                get(){
                    return this.$store.state.sortDescending
                }
            },
            sorting:{
                get(){
                    return this.$store.state.sorting
                }
            },
            selectedDate:{
                get(){
                    return new Date(this.$store.state.selectedDate)
                }
            },
            showCalendar:{
                get(){
                    return this.$store.state.showCalendar;
                }
            },
            showChecked:{
                get(){
                    return this.$store.state.showChecked
                }
            },
            filterByDate:{
                get(){
                    return this.dateColumnExists ? this.$store.state.filterByDate : false;
                },
                set(newValue){
                    this.$store.state.filterByDate = newValue;
                }
            },
            sortKey: {
                get: function() {
                    return this.sortKeyData
                },
                set: function(newKey){
                    this.sortKeyData = newKey
                }
            }
    },
    methods: {
        addNewItem() {
            /* wait for the promise */
            this.$store.dispatch('createNewItem').then((newItemID) => {
                // wait for the new Item to be rendered and then make it active
                Vue.nextTick(() => {
                    this.$refs[newItemID][0].makeActive()
                });

            });
        },
        saveListToFirestore() {
            /* this is async */
            this.$store.dispatch('saveListToFirestore');
        },
        saveListOrder()  {
            this.$store.dispatch('saveListOrder').then((result) => {
                console.log(result);
            });
        },
        startDrag() {
            console.log("startDrag()");
            this.drag = true;
            console.log("selectedListItems:");
            console.log(this.selectedListItems);

            EventBus.$emit('the-list-drag-event', this.drag);
        },
        endDrag() {
            this.drag = false;
            this.saveListOrder();
            this.saveListToFirestore();

            EventBus.$emit('the-list-drag-event', this.drag);
        },
        sortFilteredList(a, b){
            console.log(this.headers)
            let headerID = this.selectedListHeaders[this.sortColumnIndex].id
            let headerType = this.selectedListHeaders[this.sortColumnIndex].type
            console.log(this.selectedListHeaders)
            let sortResult
            if(headerType==="date"){
                sortResult = (a.values[headerID].seconds > b.values[headerID].seconds)
            } else if(headerType === "integer"){
                sortResult = (a.values[headerID] < b.values[headerID])
            }
            else if(headerType ==="string"){
                console.log((a.values[headerID] > b.values[headerID]))
                sortResult = (a.values[headerID] > b.values[headerID])
            }
            return this.sortDescending ? sortResult : !sortResult

        }
    }
};
</script>

<style scoped src="@/assets/styles/thelist.css"></style>
