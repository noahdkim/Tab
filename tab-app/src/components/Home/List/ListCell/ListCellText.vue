<template>
    <v-text-field @input="updateItemState"
                          :value="item.values[header.name]"
                          :readonly="!item.item_meta.active"
                          :outline="!item.item_meta.active"
                          :id="header.name"
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
        updateItemState (newValue){
            let itemID = this.item.item_meta.id;
            let header = this.header.name;
            this.$store.dispatch('updateItemState', {itemID, header, newValue});
        }
    }
  }
</script>
