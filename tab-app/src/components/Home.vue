<template>
  <v-container fluid>
    <v-layout row wrap>
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
     }
}
</script>
