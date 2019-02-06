<template>
  <v-container fluid>
    <v-layout row>
        <!-- Sidebar -->
        <the-sidebar :show=show></the-sidebar>
        <!-- Expand/Collapse sidebar -->
        <button v-on:click="show = !show">
            <v-icon>{{show ? 'keyboard_arrow_left' : 'keyboard_arrow_right'}}</v-icon>
        </button>
        <!-- List -->
        <the-list></the-list>

        <!-- Calendar -->
        <the-calendar></the-calendar>
    </v-layout>
  </v-container>
</template>

<script>
    import TheSidebar from './Home/TheSidebar'
    import TheList from './Home/TheList'
    import TheCalendar from './Home/TheCalendar'

export default {
     components: { TheSidebar, TheList, TheCalendar },
     data () {
         return{
             show: true,
         }
     },
     /* https://github.com/vuejs/vue/issues/1915#issuecomment-159334432 */
     created() {
         // alert('ready function');
         console.log("ready function");
         window.addEventListener('resize', this.handleResize)
     },
     destroyed() {
         // alert('beforeDestroy function');
         console.log("beforeDestroy");
         window.removeEventListener('resize', this.handleResize)
     },
     methods: {
         handleResize: function()    {
             // console.log("document.documentElement.clientWidth = " +document.documentElement.clientWidth);
             /* Only disappear navigation side bar if window is greater than Extra Small Vue size (600px) */
             this.show = (document.documentElement.clientWidth >= 935);
             // console.log('handleResize');
         }
     },
}
</script>
