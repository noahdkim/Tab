<template>
<div>
    <v-text-field @input="updateItemState"
                          :value="item.values[header.name]"
                          :readonly="!item.active"
                          :outline="!item.active"
                          :id="header.name"
                          ref="{{item.id}}-{{header.text}}"
                          single-line>
    </v-text-field>
    <v-date-picker v-model="picker" :landscape="landscape" :reactive="reactive"></v-date-picker>

</div>
</template>

<script>
export default {
    props: ['item', 'header'],

    data () {
        return{
            /* this is currently not being used */
            checkbox: true,
            picker: new Date().toISOString().substr(0, 10),
            landscape: false,
            reactive: true

        }
    },
    methods: {
        updateItemState (newValue){
            let itemID = this.item.id;
            let header = this.header.name;
            this.$store.dispatch('updateItemState', {itemID, header, newValue});
        }
    }
  }
</script>
