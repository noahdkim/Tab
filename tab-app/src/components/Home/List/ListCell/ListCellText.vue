<template>
    <v-text-field @input="updateItemState"
                          :value="cellValue"
                          :readonly="!active"
                          :outline="!active"
                          :id="cellValue"
                          ref="{{item.id}}-{{header.text}}"
                          single-line>
    </v-text-field>
</template>

<script>
export default {
    props: ['cellValue', 'active'],

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
