<template>
    <v-text-field class="text-field"
                          :mask="mask"
                          @input="updateItemState"
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
            mask: '###'

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
