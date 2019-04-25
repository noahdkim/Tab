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
                    <list-row v-for="item in filteredListItems"
                    :key="item.item_meta.id"
                    :item="item"
                    :headers="selectedListHeaders"
                    :ref="item.item_meta.id"
                    class="draggable-row"
                    >
                    </list-row>
                </transition-group>
            </draggable>
            <span class="mdi mdi-plus-circle"></span>
        </div>
        </div>
  <v-btn @click.native="saveList">Save</v-btn>
  <v-btn @click.native="addNewItem">Add item</v-btn>

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
                    if(this.$store.state.showAll){
                        return this.selectedListItems;
                    }
                    let selectedDate = new Date(this.selectedDate)
                    let filteredListItems = [];
                    console.log(this.dateFilterHeader.name);
                    this.selectedListItems.forEach((item)=>{
                        if (item.values[this.dateFilterHeader.name].toDate().getTime() === selectedDate.getTime() ||
                                item.item_meta.active === true){
                            filteredListItems.push(item);
                        }
                    })
                    return filteredListItems;
                }
            }
    },
    methods: {
        addNewItem() {
            /* wait for the promise */
            this.$store.dispatch('createNewItem').then((result) => {
                this.saveList();
            });
        },
        saveList() {
            /* this is async */
            this.$store.dispatch('saveList');
        },
        saveListOrderToFirestore()  {
            this.$store.dispatch('saveListOrderToFirestore').then((result) => {
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
            this.saveListOrderToFirestore();
            this.saveList();

            EventBus.$emit('the-list-drag-event', this.drag);
        },
    }
};
</script>

<style scoped src="@/assets/styles/thelist.css"></style>
