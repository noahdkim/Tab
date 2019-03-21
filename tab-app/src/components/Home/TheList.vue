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
                    @clicked="modifyActive"
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

    }),
    computed: {
        ...mapGetters({
            selectedListHeaders: 'getSelectedListHeaders',
            selectedListItems: 'getSelectedListItems'
        })
    },
    methods: {
            modifyActive(prevItemState, new_item_id) {
                this.$store.dispatch('saveChangedItem', {prevItemState, new_item_id});
            },

    }
  }
</script>
