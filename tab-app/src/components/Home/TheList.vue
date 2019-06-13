<template>
    <v-container pt-2 >
            <!-- <v-layout column class="ma-0 pa-0 list-all"> -->
                <v-layout row ma-0 pa-0 class=" list-title">
                    <v-flex>
                        <div class="list-title">
                            <span class="list-title list-title-text">{{ this.$store.state.selectedList.name }}</span>
                        </div>
                    </v-flex>
                    <v-flex>
                        <v-switch v-if="dateColumnExists" v-model="filterByDate" label="Filter by Date"></v-switch>
                    </v-flex>
                </v-layout>

                <v-layout row ma-0 pa-0 class="list-head">
                    <list-column-header-row
                        :columns="selectedListColumns">
                    </list-column-header-row>
                </v-layout>
                <v-divider light></v-divider>
                <v-layout row ma-0 pa-0 class="list-body">
                    <draggable
                    handle=".handle"
                    v-bind="dragOptions"
                    @start="startDrag()"
                    @end="endDrag()"
                    :list="filteredAndSortedListItems"
                    ref="draggable"
                    style="width: 100%"
                    >
                        <transition-group type="transition" :name="sorting || filtering || drag ? 'flip-list' : null">
                                <list-row
                                    v-for="item in filteredAndSortedListItems"
                                    :key="item.item_meta.id"
                                    :item="item"
                                    :columns="selectedListColumns"
                                    :ref="item.item_meta.id"
                                    class="draggable-row align-start"
                                >
                                </list-row>
                        </transition-group>
                    </draggable>
                </v-layout>

                <v-layout row ma-0 class="list-footer">
                    <v-flex xs-12 class="ma-0 add-item-container">
                        <a v-on:click="addNewItem" class="add-item-anchor">
                            <span class="mdi mdi-plus-circle add-item-icon"></span>
                            <span class="add-item-text">Add Item</span>
                        </a>
                    </v-flex>
                </v-layout>
            <!-- </v-layout> -->

</v-container>

</template>

<script>
    import draggable from 'vuedraggable'
    import ListColumnHeaderRow from './List/ListColumnHeaderRow'
    import ListRow from './List/ListRow'
    import { mapGetters } from 'vuex'
    import { EventBus } from '../../store/modules/event-bus.js';

    require('@/assets/styles/main.css');

    export default {
        components: {
            draggable,
            ListColumnHeaderRow,
            ListRow
        },
        data: () => ({
            drag: false,
        }),
        created() {

        },
        computed: {
            ...mapGetters({
                selectedListColumns: 'getSelectedListColumns',
                selectedListItems: 'getSelectedListItems',
                dateFilterColumn: 'getDateFilterColumn',
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
            filterByDate:{
                get(){
                    return this.dateColumnExists ? this.$store.state.selectedListSettings.filterByDate : false;
                },
                set(newValue){
                    this.filtering = true;
                    this.$store.commit('setFilterByDate', newValue);
                }
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
                            return (item.values[this.dateFilterColumn.id].toDate().getTime() === this.selectedDate.getTime()) ||
                                        item.item_meta.active
                        })
                    }
                    Vue.nextTick(() => {
                        this.$store.commit('setFiltering', false)
                    });
                    return filteredListItems;
                }
            },
            filteredAndSortedListItems: {
                get(){
                    // sorting is set in ListColumn
                    if((this.sortColumnIndex === "checked" || this.sortColumnIndex > -1) && this.sorting){
                        this.filteredListItems.sort(this.sortFilteredList)
                        Vue.nextTick(() => {
                            this.$store.commit('setSorting', false)
                        });
                    } else {
                        return this.filteredListItems
                    }
                    return this.filteredListItems
                }
            },
            filtering:{
                get(){
                    return this.$store.state.filtering
                },
                set(newValue){
                    this.$store.commit('setFiltering', newValue)
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
                    return this.$store.state.selectedListSettings.showChecked
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
        endDrag() {
            this.drag = false;
            this.saveListOrder();
            this.saveListToFirestore();

            EventBus.$emit('the-list-drag-event', this.drag);
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
            console.log(this.filteredAndSortedListItems);

            EventBus.$emit('the-list-drag-event', this.drag);
        },
        sortFilteredList(a, b){
            let sortResult
            if (this.sortColumnIndex === 'checked'){
                sortResult = ((a.item_meta.checked === b.item_meta.checked)? 0 : a.item_meta.checked ? false : true)
            }
            else{
                let columnID = this.selectedListColumns[this.sortColumnIndex].id
                let columnType = this.selectedListColumns[this.sortColumnIndex].type
                if(columnType==="date"){
                    sortResult = (a.values[columnID].seconds > b.values[columnID].seconds)
                } else if(columnType === "integer"){
                    sortResult = (parseInt(a.values[columnID]) < parseInt(b.values[columnID]))
                }
                else if(columnType ==="string"){
                    console.log((a.values[columnID] > b.values[columnID]))
                    sortResult = (a.values[columnID] > b.values[columnID])
                }
            }
            return this.sortDescending ? sortResult : !sortResult

        },
        filterList(){
            let filteredListItems = this.selectedListItems;
            if (!this.showChecked){
                filteredListItems = filteredListItems.filter((item)=>{
                    return !item.item_meta.checked;
                })
            }
            if (this.filterByDate){
                filteredListItems = filteredListItems.filter((item)=>{
                    return (item.values[this.dateFilterColumn.id].toDate().getTime() === this.selectedDate.getTime()) ||
                                item.item_meta.active
                })
            }
            return filteredListIT
        }
    }
};
</script>

<style scoped src="@/assets/styles/TheList.css"></style>
