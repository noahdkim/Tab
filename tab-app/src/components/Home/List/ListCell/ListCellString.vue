<template>
    <v-flex
        xs4
        shrink
        align-start
         pa-0 ma-0>
        <v-textarea
              @input="updateCellValue"
              v-model="textValue"
              :readonly="!item.item_meta.active"
              :id="column.name"
              ref="{{item.id}}-{{column.text}}"
              auto-grow
              :filled="item.item_meta.active"
              flat
              hide-details
              rows="1"
              placeholder=""
              row-height=10
              solo
              slot="activator"
              >
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
