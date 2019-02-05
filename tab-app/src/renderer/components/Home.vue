<template>
  <v-container fluid>
    <v-layout row wrap>
        <!-- Sidebar -->
        <sidebar></sidebar>

        <!-- List -->
        <list></list>

        <!-- Calendar -->
        <calendar></calendar>
    </v-layout>
  </v-container>
</template>

<script>
    import Sidebar from './Home/Sidebar'
    import List from './Home/List'
    import Calendar from './Home/Calendar'

export default {
     components: { Sidebar },
}
</script>
