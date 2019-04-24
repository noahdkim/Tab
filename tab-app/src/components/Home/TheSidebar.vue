<template>
<v-navigation-drawer class="sidebar" permanent v-if="show">
    
    <v-list>
        <draggable>
            <sidebar-tile
               v-for="personalList in personalLists"
               :listSelector="personalList"
               :key="personalList.id"
             >
            </sidebar-tile>
        </draggable>
         <v-list-tile
            @click="openCreateListDialog"
         >
            <v-list-tile-action>
                <v-icon>add</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title >Create New List</v-list-tile-title>
            </v-list-tile-content>
         </v-list-tile>
         <v-dialog v-model="dialog"  max-width="600px">
             <sidebar-form @close-dialog="dialog=false">
             </sidebar-form>
         </v-dialog>
   </v-list>
</v-navigation-drawer>
</template>

<script>
import SidebarForm from './Sidebar/SidebarForm'
import SidebarTile from './Sidebar/SidebarTile'
import router from '@/router'

import draggable from 'vuedraggable'


export default {
    components: {
        SidebarForm,
        SidebarTile,
        draggable
    },
    data() {
            return {
                userEmail: this.$store.state.user.email,
                dialog: false
            }
    },
    computed: {
        personalLists () {
            console.log(this.$store.state.selectedList)

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
        },
        openCreateListDialog() {
            this.dialog=true
        },
    },
    name: 'TheSidebar'
}
</script>
<style scoped src="@/assets/styles/main.css"></style>
