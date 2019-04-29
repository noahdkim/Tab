<template>
    <v-container>
        <div class="list-all">
            <div class="list-head">
                <list-header :headers=selectedListHeaders></list-header>
            </div>
            <div class="list-body">
                <draggable
                class="list-group"
                handle=".handle"
                v-bind="dragOptions"
                @start="startDrag()"
                @end="endDrag()"
                :list="this.selectedListItems"
                >
                    <transition-group type="transition" :name="!drag ? 'flip-list' : null">
                        <div class="listRows" v-for="item in filteredListItems" :key="item.item_meta.id">
                            <list-row
                            :item="item"
                            :headers="selectedListHeaders"
                            :ref="item.item_meta.id"
                            class="draggable-row"
                            >
                            </list-row>
                        </div>
                    </transition-group>
                </draggable>
            </div>
            <div class="list-footer">
                <div class="add-item-container">
                    <a v-on:click="addNewItem" class="add-item-anchor">
                        <span class="mdi mdi-plus-circle add-item-icon"></span>
                        <span class="add-item-text">Add Item</span>
                    </a>
                </div>
            </div>
        </div>
  <!-- <v-btn @click.native="saveList">Save</v-btn> -->
  <!-- <v-btn @click.native="addNewItem">Add item</v-btn> -->

</v-container>

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
            drag: false
        }),
        created() {
        },
        computed: {
            ...mapGetters({
                selectedListHeaders: 'getSelectedListHeaders',
                selectedListItems: 'getSelectedListItems',
                dateFilterHeader: 'getDateFilterHeader',
                selectedDate: 'getSelectedDate',
            }),
            dragOptions() {
                return {
                    animation: 200,
                    group: "description",
                    disabled: false,
                    ghostClass: "ghost"
                };
            },
            filteredListItems: {
                get(){
                    let filteredListItems = this.selectedListItems;
                    if (!this.$store.state.showAll){
                        filteredListItems = filteredListItems.filter((item)=>{
                            return item.values[this.dateFilterHeader.name].toDate().getTime() === selectedDate.getTime() ||
                                        item.item_meta.active
                        })
                    }

                    return filteredListItems;
                }
            }
    },
    methods: {
        addNewItem() {
            /* wait for the promise */
            this.$store.dispatch('createNewItem').then((newItemID) => {
                // wait for the new Item to be rendered and then make it active
                Vue.nextTick(() => {
                    console.log(Object.keys(this.$refs))
                    console.log(newItemID)
                    console.log(this.$refs[newItemID])                                      // changed here
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
    }
};
</script>

<style scoped src="@/assets/styles/thelist.css"></style>
