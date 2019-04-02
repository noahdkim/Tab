<template>
    <v-container class="text-xs-center">
          <v-date-picker
            mode='single'
            v-model='date'
            is-inline>
          </v-date-picker>
          {{date}}
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
    computed:{
        date: {
            get() {
                return this.$store.state.date;
            },
            set(newDate) {
                return this.$store.commit('setDate', newDate);
            }
        }
    },
    name: 'TheCalendar'
}
</script>
