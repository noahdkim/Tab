<template>
    <v-container class="text-xs-center">
        <v-date-picker ref="calendarDatePicker"
                        class="date-range-picker"
                        v-model="picker"
                        :events="arrayEvents"
                        :event-color="date => colorFunction(date)"
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
                this.totalWeights = 0;
                let list_items = this.$store.state.selectedListItems.map((item) =>{
                    let date = item.values.date.toDate().toISOString().substr(0, 10)
                    let priority = item.values.Priority;
                    priority = priority ? parseInt(item.values.Priority) : 0;
                    this.totalWeights += priority;
                    this.dateWeights[date] = this.dateWeights[date] ? this.dateWeights[date] + priority : priority;
                    return date;
                });
                
                return list_items;
            }
        }
    },
    methods: {
        colorFunction(date){
            let alpha = this.dateWeights[date] / this.totalWeights;
            alpha = alpha > .1 ? alpha : .1;
            return `rgba(244, 67, 54, ${alpha})`;
        }
    },
    name: 'TheCalendar'
}
</script>
