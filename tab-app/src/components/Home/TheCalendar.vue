<template>
    <v-container class="text-xs-center">
        <v-layout>
        <v-date-picker ref="calendarDatePicker"
                        class="date-range-picker"
                        v-model="picker"
                        :events="listDates"
                        :event-color="date => colorFunction(date)"
                        :landscape="landscape"
                        :reactive="reactive"
                        full-width></v-date-picker>
    </v-layout>
    <v-layout row>
        <v-flex v-if="dateFields.length > 1">
            Display
            <v-radio-group v-model="dateFilterHeader">
              <v-radio
                v-for="dateField in dateFields"
                :key="dateField"
                :label="dateField"
                :value="dateField"
              ></v-radio>
            </v-radio-group>
        </v-flex>
        <v-flex v-if="integerFields.length > 0">
            Weight
            <v-radio-group v-model="selectedIntegerField">
              <v-radio
                v-for="integerField in integerFields"
                :key="integerField"
                :label="integerField"
                :value="integerField"
              ></v-radio>
              <v-radio
                label="None"
                value="None"
              ></v-radio>
            </v-radio-group>
        </v-flex>
    </v-layout>
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
            selectedIntegerField: '',
            selectedValue: new Date(),
            reactive: true
        }
    },
    mounted(){
        let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().substr(0, 10);
        this.$store.commit('setSelectedDate', localISOTime);
    },
    computed:{
        listDates: {
            get() {
                this.dateWeights = {};
                this.totalWeights = 0;
                let listDates = this.$store.state.selectedListItems.map((item) =>{
                    let date = item.values[this.dateFilterHeader.id].toDate().toISOString().substr(0, 10)
                    let priority = item.values[this.selectedIntegerField];
                    priority = priority ? parseInt(item.values[this.selectedIntegerField]) : 0;
                    this.totalWeights += priority;
                    this.dateWeights[date] = this.dateWeights[date] ? this.dateWeights[date] + priority : priority;
                    return date;
                });
                return listDates;
            }
        },
        dateFilterHeader: {
            get() {
                return this.$store.state.dateFilterHeader;
            },
            set(newDateHeader) {
                this.$store.state.dateFilterHeader = newDateHeader
            }
        },
        picker: {
            get() {
                return this.$store.state.selectedDate;
            },
            set(newDate) {
                this.$store.commit('setSelectedDate', newDate)
            }
        },
        dateFields:{
            get() {
                let dateFieldsArr = [];
                this.$store.state.selectedListHeaders.forEach(header => {
                    if (header.type === "date"){
                        dateFieldsArr.push(header);
                    }
                })
                this.dateFilterHeader = dateFieldsArr[0];
                return dateFieldsArr
            }
        },
        integerFields:{
            get() {
                let integerFields = [];
                this.$store.state.selectedListHeaders.forEach(header => {
                    if (header.type === "integer"){
                        integerFields.push(header.name);
                    }
                })
                this.selectedIntegerField = integerFields[0];
                return integerFields;
            }
        }
    },
    methods: {
        colorFunction(date){
            if (this.$store.state.selectedListItems.length > 0 && this.totalWeights === 0){
                return `rgba(244, 67, 54, .8)`;
            }
            let alpha = this.dateWeights[date] / this.totalWeights;
            alpha = alpha < .1 ? .1 : alpha;
            alpha = alpha > .8 ? .8 : alpha;
            return `rgba(244, 67, 54, ${alpha})`;
        }
    },
    name: 'TheCalendar'
}
</script>
