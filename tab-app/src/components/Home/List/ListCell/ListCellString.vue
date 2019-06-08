<template>
    <v-flex
        grow
        align-start
        class="listcells" pa-0 ma-0>
        <v-textarea
                              @input="updateCellValue"
                              v-model="textValue"
                              :readonly="!item.item_meta.active"
                              :id="column.name"
                              ref="{{item.id}}-{{column.text}}"
                              hide-details
                              solo
                              flat
                              rows="1"
                              row-height=10
                              auto-grow
                              placeholder="________________________">
        </v-textarea>
    </v-flex>
</template>

<script>
export default {
    props: ['item', 'column'],

    data () {
        return{
            /* this is currently not being used */
            checkbox: true,
            listCellTextValue: this.item.values[this.column.id]

        }
    },
    computed: {
        textValue:{
            get: function(){
                return this.listCellTextValue
            },
            set: function(newValue){
                this.listCellTextValue = newValue
            }
        }
    },
    methods: {
        updateCellValue (newValue){
            this.$emit('update', newValue);
        },
        setValue(newValue){
            this.textValue = newValue
        },
        getValue(){
            return this.textValue
        }
    }
  }
</script>

<style scoped>

v-text-field    {
    margin: 0px;
    padding: 0px;
}

</style>
<style scoped src="@/assets/styles/ListCell.css"></style>
