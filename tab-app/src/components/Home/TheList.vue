<template>
    <v-container>
        <v-layout row>
            <v-layout col v-for="header in selectedListHeaders" :key="header">
                <div class="font-weight-bold">{{header}}</div>
            </v-layout>
        </v-layout>
        <draggable>
            <list-row v-for="(item, index) in selectedListItems"
                        :key="index"
                        :item="item"
                        :headers="selectedListHeaders"
                        :ref="item.id"
                        @clicked="modifyActive"
                        >
            </list-row>
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
  }
</script>
