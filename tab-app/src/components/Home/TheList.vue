<template>
    <v-container>
        <v-layout row>
            <v-layout col v-for="header in selectedListHeaders" :key="header">
                <div class="font-weight-bold">{{header}}</div>
            </v-layout>
        </v-layout>
        <draggable 
                    tag="ul"    :list="selectedListItems"
                    class="list-group"
                    handle=".handle">

                    <!-- temporarily commented out -->
            <!-- <list-row v-for="(item, index) in selectedListItems"
                        :key="index"
                        :item="item"
                        :headers="selectedListHeaders"
                        :ref="item.id"
                        @clicked="modifyActive"
                        >
            </list-row> -->

<!-- https://github.com/SortableJS/Vue.Draggable/blob/master/example/components/handle.vue#L11 -->
            <li
              class="list-group-item"
              v-for="(item, index) in selectedListItems"
              :key="index"
            >
              <i class="fa fa-align-justify handle"></i>

              <span class="text">{{ item.id }} </span>

              <input type="text" class="form-control" v-model="item.item" />

              <i class="fa fa-times close"></i>
            </li>
        </draggable>
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

    }),
    created() {
        window.addEventListener('beforeunload', this.saveList)
    },
    computed: {
        ...mapGetters({
            selectedListHeaders: 'getSelectedListHeaders',
            selectedListItems: 'getSelectedListItems'
        })
    },
    methods: {
            modifyActive(prevItemState, new_item_id) {
                this.$store.dispatch('changeActiveItem', new_item_id);
            },
            saveList () {
                /* wait for the promise */
                this.$store.dispatch('saveList').then((result) => {
                    console.log(result)
                })
            }

    }
  };
</script>
<style scoped>
.button {
  margin-top: 35px;
}
.handle {
  float: left;
  padding-top: 8px;
  padding-bottom: 8px;
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
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
</style>