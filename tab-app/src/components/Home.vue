<template>
  <v-container fluid>
    <v-layout row wrap>
        <!-- Sidebar -->
        <the-sidebar></the-sidebar>

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
}
</script>
