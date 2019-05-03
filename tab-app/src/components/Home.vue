<template>
    <v-container id="parent-flex" class="ma-0 pa-0">
        <!-- Sidebar -->
        <v-navigation-drawer class="the-sidebar-nav-drawer" v-model="showSidebar" clipped app :light="false">
            <the-sidebar></the-sidebar>
        </v-navigation-drawer>
        <!-- List -->
    	<v-flex id="the-list-flex" class="ma-0 pa-0" grow>
    		<the-list></the-list>
    	</v-flex>
        <!-- Calendar -->
        <v-navigation-drawer v-if="dateColumnExists" class="the-calendar-nav-drawer" v-model="showCalendar" clipped app right :light="false" :width="500">
            <the-calendar></the-calendar>
        </v-navigation-drawer>
    </v-container>
</template>

<script>
    import TheSidebar from './Home/TheSidebar'
    import TheList from './Home/TheList'
    import TheCalendar from './Home/TheCalendar'

    require("@/assets/styles/main.css");

    export default {
       components: { TheSidebar, TheList, TheCalendar },
       data () {
           return{
               showCalendar: true,
               showSidebar: true
           }
       },
       computed: {
           dateColumnExists () {
               let listHeaders = this.$store.state.selectedListHeaders
               this.$store.state.showCalendar = false;
               for(var i = 0; i < listHeaders.length; ++i){
                   if (listHeaders[i].type === "date"){
                       this.$store.state.dateColumnExists = true;
                   }
               }
               return this.$store.state.dateColumnExists;
           }
       },
       mounted() {
           /* polyfillScript for vCalendar */
           let polyfillScript = document.createElement('script')
           polyfillScript.setAttribute('src', 'https://cdn.polyfill.io/v2/polyfill.min.js?features=Array.prototype.find,Intl')
           document.head.appendChild(polyfillScript)
       },
       /* https://github.com/vuejs/vue/issues/1915#issuecomment-159334432 */
       created() {
           window.addEventListener('resize', this.handleResize);
           this.$bus.$on('toggleShowCalendar', () => {
             this.showCalendar = !this.showCalendar
           })
           this.$bus.$on('emitToggleShowSidebar', () => {
               this.showSidebar = !this.showSidebar
           })

       },
       destroyed() {
           window.removeEventListener('resize', this.handleResize)
       },
       methods: {
           handleResize: function()    {
               this.show = (document.documentElement.clientWidth >= 935);
           }
       },
   }
</script>

<style scoped src="@/assets/styles/main.css"></style>

<style scoped src="@/assets/styles/Home.css"></style>
