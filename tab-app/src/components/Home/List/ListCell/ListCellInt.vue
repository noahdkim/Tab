<template>
    <v-text-field class="textfield"
                          :mask="mask"
                          @input="updateCellValue"
                          v-model="intValue"
                          :value="item.values[header.id]"
                          :readonly="!item.item_meta.active"
                          :id="header.name"
                          ref="{{item.id}}-{{header.text}}"
                          single-line
                          hide-details
                          solo
                          flat>

                          <!-- :outline="!item.item_meta.active" -->
    </v-text-field>
</template>

<script>
export default {
    props: ['item', 'header'],

    data () {
        return{
            checkbox: true,
            /* Only three digit number allowed */
            listCellIntValue: this.item.values[this.header.id],
            mask: '###'

        }
    },
    computed: {
        intValue:{
            get: function(){
                return this.listCellIntValue
            },
            set: function(newValue){
                this.listCellIntValue = newValue
            }
        }
    },
    methods: {
        updateCellValue (newValue){
            this.$emit('update', newValue);
        },
        setValue(newValue){
            this.intValue = newValue
        },
        getValue(){
            return this.intValue
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
