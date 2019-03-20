<template>
    <v-layout row @click="makeEditable" :id="item.id">
        <v-layout col v-for="header in headers" :key="header.id">
            <v-text-field :value="item[header]"
                          :readonly="!item.editable"
                          :outline="!item.editable"
                          ref="{{item.id}}-{{header.text}}"
                          single-line>
            </v-text-field>

        </v-layout>
    </v-layout>
</template>

<script>
export default {
    props: ['item', 'headers'],

    data () {
        return{
            /* this is currently not being used */
            checkbox: true,
        }
    },

    methods: {
        makeEditable (event) {
            this.$emit('clicked', event.currentTarget.id);
        }
    }
  }
</script>
