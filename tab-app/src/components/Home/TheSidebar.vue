<template>
<v-navigation-drawer class="blue" dark permanent v-if="show">
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
            this.$store.dispatch('loadPersonalListData').then(
                response => {
                    console.log("DURING dispatch response:");
                    console.log(response);
                    console.log(this.$store.state.personalLists[0]);
                },
                err => {
                    console.log("DURING dispatch err:")
                    console.log(err)
                }
            );
        }
    },
    name: 'TheSidebar'
}
</script>
