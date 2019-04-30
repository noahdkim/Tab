<template>
    <v-textarea class="text-field"
                          @input="updateCellValue"
                          v-model="textValue"
                          :readonly="!item.item_meta.active"
                          :id="header.name"
                          ref="{{item.id}}-{{header.text}}"
                          single-line
                          hide-details
                          solo
                          flat
                          no-resize
                          rows="1"
                          row-height=46
                          auto-grow>
    </v-textarea>
</template>

<script>
export default {
    props: ['item', 'header'],

    data () {
        return{
            /* this is currently not being used */
            checkbox: true,
            listCellTextValue: this.item.values[this.header.id]

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
<style scoped src="@/assets/styles/listcell.css"></style>
