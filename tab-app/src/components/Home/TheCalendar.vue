<template>
    <v-container class="text-xs-center">
        <v-date-picker ref="calendarDatePicker"
                        class="date-range-picker"
                        v-model="picker"
                        :events="arrayEvents"
                        :event-color="date => functionTest(date)"
                        :landscape="landscape"
                        :reactive="reactive"
                        full-width></v-date-picker>
    </v-container>
</template>

<script>
import firebase from 'firebase'
require("@/assets/styles/TheCalendar.css");

export default  {
    data(){
        return{
            dateWeights: {},
            totalItems: 0,
            landscape: false,
            selectedValue: new Date(),
            picker: new Date().toISOString().substr(0, 10),
            reactive: true
        }
    },
    mounted(){},
    computed:{
        date: {
            get() {
                return this.$store.state.date;
            },
            set(newDate) {
                return this.$store.commit('setDate', newDate);
            }
        },
        arrayEvents: {
            get() {
                this.dateWeights = {};
                this.totalItems = 0;
                let list_items = this.$store.state.selectedListItems.map((item) =>{
                    let date = item.values.date.toDate().toISOString().substr(0, 10)
                    this.totalItems += 1;
                    this.dateWeights[date] = this.dateWeights[date] ? this.dateWeights[date] + 1 : 1;
                    return date;
                });
                return list_items;
            }
        }
    },
    methods: {
        functionTest(date){
            let alpha = (this.dateWeights[date] / this.totalItems);
            return `rgba(244, 67, 54, ${alpha})`;
        }
    },
    name: 'TheCalendar'
}
</script>
