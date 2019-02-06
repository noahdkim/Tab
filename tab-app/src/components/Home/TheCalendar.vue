<template>
<v-layout column>
    <v-flex xs12 class="text-xs-center" mt-5>
      <h1>Home page</h1>
    </v-flex>
    <v-flex xs12 class="text-xs-center" mt-3>
      <p>Welcome, {{userEmail}}</p>
    </v-flex>
</v-layout>
</template>

<script>
export default  {
    data(){
        return{
            userEmail:  this.$store.state.user.email
        }
    },
    name: 'TheCalendar'
}
</script>
