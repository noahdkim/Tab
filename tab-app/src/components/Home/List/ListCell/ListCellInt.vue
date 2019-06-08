<template>
    <v-flex
        xs2
        align-start
        class="listcells" pa-0 ma-0>
        <v-text-field
                              :mask="mask"
                              @input="updateCellValue"
                              v-model="intValue"
                              :value="item.values[column.id]"
                              :readonly="!item.item_meta.active"
                              :id="column.name"
                              ref="{{item.id}}-{{column.text}}"
                              solo
                              flat
                              reverse
                              placeholder="###">

                              <!-- :outline="!item.item_meta.active" -->
        </v-text-field>
    </v-flex>
</template>

<script>
export default {
    props: ['item', 'column'],

    data () {
        return{
            checkbox: true,
            /* Only three digit number allowed */
            listCellIntValue: this.item.values[this.column.id],
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
<style scoped src="@/assets/styles/ListCell.css"></style>
