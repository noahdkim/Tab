<template>
    <v-layout row @click="makeActive" :id="item.id">
        <v-layout col v-for="header in headers" :key="header.id">
            <list-cell :header = "header"
                          :item = "item"
                          :id="header.text"
                          ref="{{item.id}}-{{header.text}}"
                          single-line>
            </list-cell>

        </v-layout>
    </v-layout>
</template>

<script>
import ListCell from './ListCell'
export default {
    components: {ListCell},
    props: ['item', 'headers'],

    data () {
        return{
            /* this is currently not being used */
            checkbox: true,
        }
    },
    methods: {
        makeActive (event) {
            console.log(event);
            this.$emit('clicked', event.currentTarget.value,  event.currentTarget.id);
        },

    }
  }
</script>
