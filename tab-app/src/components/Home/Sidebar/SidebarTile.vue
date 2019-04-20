<template>
    <v-list-tile
        @click="changeSelectedList"
    >
       <v-list-tile-action
        >
          <v-icon>{{ listSelector.icon }}</v-icon>
       </v-list-tile-action>
       <v-list-tile-content>
          <v-list-tile-title>{{ listSelector.name }}</v-list-tile-title>
       </v-list-tile-content>
    </v-list-tile>
</template>

<script>
    export default{
        props: ['listSelector'],
        data(){
            return{}
        },
        methods: {
            changeSelectedList(event) {
                this.$store.dispatch('changeSelectedList', listSelector)
            }
        }
    }
</script>
