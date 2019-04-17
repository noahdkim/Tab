<template>
<v-navigation-drawer class="sidebar" permanent v-if="show">
    <v-list>
     <v-list-tile
       v-for="personalList in personalLists"
       :key="personalList.id"
       @click=""
     >
       <v-list-tile-action>
         <v-icon>{{ personalList.icon }}</v-icon>
       </v-list-tile-action>
       <v-list-tile-content>
         <v-list-tile-title>{{ personalList.name }}</v-list-tile-title>
       </v-list-tile-content>
     </v-list-tile>

     <v-list-tile
     @click=""
     >
       <v-list-tile-action>
           <v-icon>add</v-icon>
       </v-list-tile-action>
       <v-list-tile-content>
         <v-list-tile-title>Add List</v-list-tile-title>
       </v-list-tile-content>
     </v-list-tile>


   </v-list>
</v-navigation-drawer>
</template>

<script>
export default {
    data() {
            return {
                userEmail: this.$store.state.user.email,
            }
    },
    computed: {
        personalLists () {
            return this.$store.state.personalLists
        }
    },
    props:{
        show: Boolean,
    },
    mounted() {
                this.loadUserLists();
    },
    methods: {
        loadUserLists() {
            console.log("loading user lists....")
            this.$store.dispatch('loadPersonalListData');
        }
    },
    name: 'TheSidebar'
}
</script>
<style scoped src="@/assets/styles/main.css"></style>
