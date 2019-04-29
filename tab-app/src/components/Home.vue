<template>
  <v-container class="ma-0 pa-0 side-list-cal" fluid>
    <v-layout row style="height: 100%">
        <!-- Sidebar -->
        <v-flex style="max-width: 300px">
            <the-sidebar :show=show></the-sidebar>
        </v-flex>
        <!-- Expand/Collapse sidebar -->
        <button v-on:click="show = !show">
            <v-icon>{{show ? 'keyboard_arrow_left' : 'keyboard_arrow_right'}}</v-icon>
        </button>
        <!-- List -->
        <v-flex grow xs5>
            <the-list></the-list>
        </v-flex>
        <!-- Calendar -->
        <v-flex v-if="showCalendar" xs7 style="min-width: 300px">
            <the-calendar ></the-calendar>
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
             show: true,
         }
     },
     computed: {
         showCalendar () {
             let listHeaders = this.$store.state.selectedListHeaders
             for(var i = 0; i < listHeaders.length; ++i){
                 if (listHeaders[i].type === "date"){
                     return true
                 }
             }
             return false
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
