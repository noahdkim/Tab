<template>
    <v-textarea class="text-field"
                @input="updateItemState"
                :value="item.values[header.id]"
                :readonly="!item.item_meta.active"
                :id="header.name"
                ref="{{item.id}}-{{header.text}}"
                hide-details
                solo
                flat
                no-resize
                rows="1"
                row-height=46
                auto-grow
                >
    </v-textarea>
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
            this.$emit('update', newValue);
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
