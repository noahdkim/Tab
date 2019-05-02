<template>
  <v-container id="home-layout" class="ma-0 pa-0" fluid>
    <!-- <v-layout align-space-around justify-start row fill-height/> -->
    <!-- <v-layout align-center justify-space-between row style="height: 100%"> -->
    <v-layout id="parent-flex" class="ma-0 pa-0">
        <!-- Sidebar -->
        <v-flex id="the-sidebar-flex">
            <the-sidebar :show=showTheSidebar></the-sidebar>
        </v-flex>
        <!-- Expand/Collapse TheSidebar -->
        <button v-on:click="showTheSidebar = !showTheSidebar">
            <v-icon>{{showTheSidebar ? 'keyboard_arrow_left' : 'keyboard_arrow_right'}}</v-icon>
        </button>
        <!-- List -->
        <v-flex id="the-list-flex" grow>
            <the-list></the-list>
        </v-flex>
        <!-- Calendar -->
        <!-- <v-flex shrink v-if="showCalendar" xs7
            style="
                min-width: 300px;
                background-color: #fafafa;
                border-left: 1px solid #dbdbdb;
            ">
            <the-calendar ></the-calendar>
        </v-flex> -->

        <!-- Expand/Collapse TheCalendar -->
        <button v-on:click="showTheCalendar = !showTheCalendar">
            <v-icon>{{showTheCalendar ? 'keyboard_arrow_right' : 'keyboard_arrow_left'}}</v-icon>
        </button>

        <v-flex id="the-calendar-flex">
            <the-calendar :show=showTheCalendar></the-calendar>
        </v-flex>
    </v-layout>
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
             showTheSidebar:    true,
             showTheCalendar:   true,
         }
     },
     computed: {
         showCalendar () {
             let listHeaders = this.$store.state.selectedListHeaders
             this.$store.state.showCalendar = false;
             for(var i = 0; i < listHeaders.length; ++i){
                 if (listHeaders[i].type === "date"){
                     this.$store.state.showCalendar = true;
                 }
             }
             return this.$store.state.showCalendar;
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
         window.addEventListener('resize', this.handleResize)
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