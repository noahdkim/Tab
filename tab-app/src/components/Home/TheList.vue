<template>
    <v-container>
        <v-layout row>
            <v-layout col v-for="header in selectedListHeaders" :key="header">
                <div class="font-weight-bold">{{header}}</div>
            </v-layout>
        </v-layout>
        <list-row v-for="(item, index) in selectedListItems"
                    :key="index"
                    :item="item"
                    :headers="selectedListHeaders"
                    :ref="item.id"
                    @clicked="modifyEditable"
                    >
        </list-row>
    </v-container>
</template>

<script>
import ListRow from './List/ListRow'
import { mapGetters } from 'vuex'
export default {
    components: {ListRow},
    data: () => ({
      headers: [{text: "item", id:1}, {text:"Date", id: 2}, {text: "Priority", id: 3}],
    }),
    computed: {
        ...mapGetters({
            selectedListHeaders: 'getSelectedListHeaders',
            selectedListItems: 'getSelectedListItems'
        })
    },
    methods: {
            modifyEditable(item_id) {
                this.$store.commit('makeListItemEditable', item_id)
            },

    }
  }
</script>
