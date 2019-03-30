<template>
    <v-container class="text-xs-center">
          <v-date-picker
            mode='single'
            v-model='selectedValue'
            is-inline>
          </v-date-picker>
          {{selectedValue}}
    </v-container>
</template>

<script>
export default  {
    data(){
        return{
            userEmail:  this.$store.state.user.email,
            selectedValue: new Date(),
        }
    },
    name: 'TheCalendar'
}
</script>
