<template>
    <v-container>
        <ListCellText v-if="header.type === 'string'"
                              :item= "item"
                              :header= "header"
                              ref="{{item.id}}-{{header.text}}"
                              single-line>
        </ListCellText>
        <ListCellDate v-if="header.type === 'date'"
                            :item= "item"
                            :header= "header"
                            ref="{{item.id}}-{{header.text}}"
                            single-line>
        </ListCellDate>
    </v-container>
</template>

<script>
import ListCellDate from './ListCell/ListCellDate'
import ListCellText from './ListCell/ListCellText'

export default {
    components: {ListCellDate, ListCellText},
    props: ['item', 'header'],

    data () {
        return{
            /* this is currently not being used */
            checkbox: true,

        }
    },
    methods: {

    }
  }
</script>
