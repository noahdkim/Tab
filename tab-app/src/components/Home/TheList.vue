<template>
    <v-container>
        <v-layout row class="header-row">
            <v-layout col v-for="header in selectedListHeaders" :key="header.name">
                <div class="font-weight-bold">{{ header.name }}</div>
            </v-layout>
        </v-layout>
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
                    <list-row v-for="(item, index) in selectedListItems"
                    :key="index"
                    :item="item"
                    :headers="selectedListHeaders"
                    :ref="item.id"
                    @clicked="modifyActive"

                    class="draggable-row"
                    >
                    </list-row>

                    <!-- https://github.com/SortableJS/Vue.Draggable/blob/master/example/components/handle.vue#L11 -->
                        <!-- <li
                          class="list-group-item"
                          v-for="(item, index) in selectedListItems"
                          :key="index"
                        >
                        <span>{{ index }}</span>
                          <span class="fa fa-align-justify handle">&#9776;</span>

                          <span class="text">{{ item.id }} </span>

                          <input type="text" class="form-control" v-model="item.item" />

                          <i class="fa fa-times close"></i>
                      </li> -->

                </transition-group>
            </draggable>
        </div>
  <v-btn @click.native="saveList">Save</v-btn>
</v-container>

</template>

<script>
    import draggable from 'vuedraggable'
    import ListRow from './List/ListRow'
    import { mapGetters } from 'vuex'
    export default {
        components: {
            draggable,
            ListRow,
        },
        data: () => ({
            drag: false
        }),
        created() {
            window.addEventListener('beforeunload', this.saveList)
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
        modifyActive(prevItemState, new_item_id) {
            this.$store.dispatch('changeActiveItem', new_item_id);
        },
        saveList () {
            /* wait for the promise */
            this.$store.dispatch('saveList').then((result) => {
                console.log(result);
            });
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
        },
        endDrag()   {
            console.log("endDrag()");
            this.drag = false;
            console.log("selectedListItems:");
            console.log(this.selectedListItems);

            this.saveListOrderToFirestore();
            this.saveList();
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
.handle {
    padding: 5px;
    margin-right: 10px;
    /*border: solid #000 1px;*/
    cursor: move;
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

  background-color: #ccc;
}
.list-group-item {
  /*cursor: move;*/
}
.list-group-item i {
  /*cursor: pointer;*/
}


/*************************************************/
.list-body  {
    background-color: #ccc;
}

.draggable-row  {
    background-color: #fafafa;
    
    padding-top: 15px;
    padding-left: 15px;
    padding-right: 15px;
    margin-top: 1px;
    /*margin-right: 30px;*/
}

hr {
    background-color: #000;
    color: #000;
}

</style>