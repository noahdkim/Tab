<template>
<!-- <v-navigation-drawer class="sidebar" hide-overlay> -->
    <v-container class="ma-0 pa-0 sidebar">
    <v-list>
        <draggable
            handle=".handle"
            v-bind="dragOptions"
            @end="endDrag()"
            :list="this.personalLists"
            >
            <sidebar-tile
               v-for="personalList in personalLists"
               :listSelector="personalList"
               :key="personalList.id"
             >
            </sidebar-tile>
        </draggable>

        <!-- Constant sidebar tiles -->
         <v-list-tile
            class="create-new-list-tile"
            @click="openCreateListDialog"
         >
            <v-list-tile-avatar>
                <v-icon class="create-new-list-icon">add</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
                <v-list-tile-title >Create New List</v-list-tile-title>
            </v-list-tile-content>
         </v-list-tile>

         <v-list-tile
         >
            <v-switch
                v-model="showChecked"
                label="Show Checked Items">
            </v-switch>

         </v-list-tile>

         <!-- Create new list dialog form -->
         <v-dialog v-model="dialog"  max-width="600px">
             <sidebar-form @close-dialog="dialog=false">
             </sidebar-form>
         </v-dialog>
   </v-list>
</v-container>
<!-- </v-navigation-drawer> -->
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
                dialog: false,
                showHandle: false,

            }
    },
    computed: {
        personalLists () {
            return this.$store.state.personalLists
        },
         dragOptions() {
              return {
                animation: 200,
                group: "description",
                disabled: false,
                ghostClass: "ghost"
            };
        },
        showChecked:{
            get(){
                return this.$store.state.showChecked
            },
            set(newValue){
                this.$store.state.showChecked = newValue;
            }
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
        endDrag() {
            this.drag = false;
            this.saveSidebarOrder();
            this.saveSidebarToFirestore();
        },
        saveSidebarToFirestore() {
            /* this is async */
            this.$store.dispatch('saveSidebarToFirestore');
        },
        saveSidebarOrder()  {
            this.$store.dispatch('saveSidebarOrder').then((result) => {
                console.log(result);
            });
        },
        openCreateListDialog() {
            this.dialog = true
        },
    },
    name: 'TheSidebar'
}
</script>
<style scoped src="@/assets/styles/TheSidebar.css"></style>
