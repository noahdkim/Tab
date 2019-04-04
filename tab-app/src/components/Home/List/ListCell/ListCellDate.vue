<template>
<div>
    <v-text-field @input="updateItemState"
                          :value="picker2"
                          :readonly="!item.active"
                          :outline="!item.active"
                          :id="header.name"
                          ref="{{item.id}}-{{header.text}}"
                          single-line>
    </v-text-field>
    <v-date-picker v-model="picker2" :landscape="landscape" :reactive="reactive"></v-date-picker>

</div>
</template>

<script>
export default {
    props: ['item', 'header'],

    data () {
        return{
            /* this is currently not being used */
            checkbox: true,
            landscape: false,
            reactive: true,
            picker: new Date()
        }
    },
    computed: {
        picker2(){
            return new Date(this.item.values[this.header.name].seconds * 1000).toISOString().substr(0, 10);
        }

    },
    methods: {
        updateItemState (newValue){
            let itemID = this.item.id;
            let header = this.header.name;
            this.$store.dispatch('updateItemState', {itemID, header, newValue});
        },
        changeVisibilityDatePicker(visibility)  {
            this.showDatePicker = visibility;
        },

    }
  }
</script>
