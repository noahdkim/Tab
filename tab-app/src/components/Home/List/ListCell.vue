<template>
    <container>
    <ListCellText v-if="cellType === 'string'"
                          @input="updateItemState"
                          :value="cellValue"
                          :readonly="!active"
                          :outline="!active"
                          :id="cellValue"
                          ref="{{item.id}}-{{header.text}}"
                          single-line>
    </ListCellText>
    <ListCellDate v-if="cellType === 'date'"
                    @input="updateItemState"
                    :value="cellValue"
                    :readonly="!active"
                    :outline="!active"
                    :id="cellValue"
                    ref="{{item.id}}-{{header.text}}"
                    single-line>
    </ListCellDate>
</container>
</template>

<script>
import ListCellDate from './ListCell/ListCellDate'
import ListCellText from './ListCell/ListCellText'

export default {
    components: {ListCellDate, ListCellText},
    props: ['cellValue', 'cellType', 'active'],

    data () {
        return{
            /* this is currently not being used */
            checkbox: true,

        }
    },
    methods: {
        updateItemState (newText){
            let itemID = this.item.id;
            let header = this.header
            this.$store.dispatch('updateItemState', {itemID, header, newText});

        }
    }
  }
</script>
