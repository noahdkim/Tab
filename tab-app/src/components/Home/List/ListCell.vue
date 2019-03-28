<template>
    <v-text-field @input="updateItemState"
                          :value="item[header]"
                          :readonly="!item.active"
                          :outline="!item.active"
                          :id="header.text"
                          ref="{{item.id}}-{{header.text}}"
                          single-line>
    </v-text-field>
</template>

<script>
export default {
    props: ['item', 'header'],

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
