<template>
    <v-container class="text-xs-center">
        <v-date-picker v-model="picker" :landscape="landscape" :reactive="reactive"></v-date-picker>
    </v-container>
</template>

<script>
export default  {
    data(){
        return{
            userEmail:  this.$store.state.user.email,
            selectedValue: new Date(),
            picker: new Date().toISOString().substr(0, 10),
            landscape: false,
            reactive: true
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
