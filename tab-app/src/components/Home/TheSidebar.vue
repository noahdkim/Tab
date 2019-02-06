<template>
<v-navigation-drawer class="blue" dark permanent v-if="show">
    <v-list>
     <v-list-tile
       v-for="item in items"
       :key="item.title"
       @click=""

     >
       <v-list-tile-action>
         <v-icon>{{ item.icon }}</v-icon>
       </v-list-tile-action>

       <v-list-tile-content>
         <v-list-tile-title>{{ item.title }}</v-list-tile-title>
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
            items: [{
                    title: 'List 1',
                    icon: 'dashboard'
                },
                {
                    title: 'List 2',
                    icon: 'account_box'
                },
                {
                    title: 'List 3',
                    icon: 'gavel'
                }
            ]
        }
    },
    props:{
        show: Boolean,
    },
    name: 'TheSidebar'
}
</script>
