<template>
    <v-container>
        <list-header :headers=selectedListHeaders></list-header>
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
                    <list-row v-for="item in selectedListItems"
                    :key="item.item_meta.id"
                    :item="item"
                    :headers="selectedListHeaders"
                    :ref="item.item_meta.id"
                    class="draggable-row"
                    >
                    </list-row>
                </transition-group>
            </draggable>
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
            /* Probably get rid of this. Saving is async */
            // window.addEventListener('beforeunload', this.saveList, false)
        },
        computed: {
            ...mapGetters({
                selectedListHeaders: 'getSelectedListHeaders',
                selectedListItems: 'getSelectedListItems'
            }),
            dragOptions() {
              return {
                animation: 200,
                group: "description",
                disabled: false,
                ghostClass: "ghost"
            };
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
            console.log("endDrag()");
            this.drag = false;
            console.log("selectedListItems:");
            console.log(this.selectedListItems);
            // remove this
            this.saveListOrderToFirestore();
            this.saveList();

            EventBus.$emit('the-list-drag-event', this.drag);
        },
    }
};
</script>
<style scoped>
.flip-list-move {
  transition: transform 0.5s;
  background-color: #0f0;
}
.flip-list  {
    background-color: #0f0;
}
.no-move {
  transition: transform 0s;
}
.button {
  margin-top: 35px;
}
.ghost {
  opacity: 0.75;
  /*background: #c8ebfb;*/
}

.close {
  float: right;
  padding-top: 8px;
  padding-bottom: 8px;
}
input {
  display: inline-block;
  width: 50%;
}
.text {
  margin: 20px;
}

.list-group {
  min-height: 20px;

  /* Color behind the list draggable-rows */
  background-color: rgba(0,0,0,0);
  /*background-color: #cfc;*/

}
.list-group-item {
  /*cursor: move;*/
}
.list-group-item i {
  /*cursor: pointer;*/
}


/*************************************************/
.list-body  {
    background-color: rgba(0,0,0,0);

    padding-top:    20px;
    padding-bottom: 20px;
    padding-right:  20px;
}

.draggable-row  {
    background-color: #ffffff;

    border-radius: 10px;
}

hr {
    background-color: #000;
    color: #000;
}

</style>
