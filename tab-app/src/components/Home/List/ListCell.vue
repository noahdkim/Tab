<template>
    <v-container class="listcell">
        <ListCellDate v-if="header.type === 'date'"
                            :item= "item"
                            :header= "header"
                            @update="updateCellValue"
                            :ref="item.item_meta.id + '-' + header.id"
                            single-line>
        </ListCellDate>
        <ListCellInt v-if="header.type === 'integer'"
                            :item= "item"
                            :header= "header"
                            @update="updateCellValue"
                            :ref="item.item_meta.id + '-' + header.id"
                            single-line>
        </ListCellInt>
        <ListCellText v-if="header.type === 'string'"
                              :item= "item"
                              :header= "header"
                              @update="updateCellValue"
                              :ref="item.item_meta.id + '-' + header.id"
                              single-line>
        </ListCellText>
    </v-container>
</template>

<script>
import ListCellDate from './ListCell/ListCellDate'
import ListCellInt from './ListCell/ListCellInt'
import ListCellText from './ListCell/ListCellText'

export default {
    components: {ListCellDate, ListCellInt, ListCellText},
    props: ['item', 'header'],

    data () {
        return{
            /* this is currently not being used */
            checkbox: true,
            value: this.item.values[this.header.id]
        }
    },
    computed:{
        cellValue:{
            get: function(){
                return this.value;
            },
            set: function(newValue){
                this.$refs[this.item.item_meta.id+'-'+this.header.id].setValue(newValue)
                this.value = newValue
            }
        }
    },
    methods: {
        updateCellValue (newValue){
            this.cellValue = newValue
        },
        getValue(){
            return this.$refs[this.item.item_meta.id+'-'+this.header.id].getValue()
        },
        setValue(newValue){
            this.$refs[this.item.item_meta.id+'-'+this.header.id].setValue(newValue)
        }
    }
  }
</script>
<style scoped>
.listcell   {
    /*background-color: #0ab;*/
    padding: 0px;
}

v-text-field    {
    margin: 0px;
    padding: 0px;
}
</style>
