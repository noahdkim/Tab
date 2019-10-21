<template>
  <!-- <v-navigation-drawer class="sidebar" right> -->
  <v-container class="text-xs-center">
    <v-layout>
      <v-date-picker
        ref="calendarDatePicker"
        class="date-range-picker"
        v-model="picker"
        :events="listDates"
        :event-color="date => colorFunction(date)"
        :landscape="landscape"
        :reactive="reactive"
        full-width
        color="#197bbd"
      />
    </v-layout>
    <v-layout row>
      <calendar-date-card v-if="dateFields.length > 1" :dateFields="dateFields"></calendar-date-card>

      <calendar-weight-card v-if="integerFields.length > 0" :integerFields="integerFields"></calendar-weight-card>
    </v-layout>
  </v-container>
  <!-- </v-navigation-drawer> -->
</template>

<script>
import firebase from "firebase";
import CalendarDateCard from "./Calendar/CalendarDateCard";
import CalendarWeightCard from "./Calendar/CalendarWeightCard";
import { mapGetters } from "vuex";

require("@/assets/styles/TheCalendar.css");

export default {
  components: {
    CalendarDateCard,
    CalendarWeightCard
  },
  data() {
    return {
      dateWeights: {},
      totalItems: 0,
      landscape: false,
      selectedValue: new Date(),
      reactive: true
    };
  },
  mounted() {
    let tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = new Date(Date.now() - tzoffset)
      .toISOString()
      .substr(0, 10);
    this.$store.commit("setSelectedDate", localISOTime);
  },
  computed: {
    ...mapGetters({
      selectedListColumns: "getSelectedListColumns",
      selectedListItems: "getSelectedListItems",
      dateFilterColumn: "getDateFilterColumn"
    }),
    listDates: {
      get() {
        this.dateWeights = {};
        this.totalWeights = 0;
        let listDates = this.selectedListItems.uncheckedItems.map(item => {
          let date = item.values[this.dateFilterColumn.id]
            .toDate()
            .toISOString()
            .substr(0, 10);
          let priority = item.values[this.selectedIntegerField.id];
          priority = priority
            ? parseInt(item.values[this.selectedIntegerField.id])
            : 0;
          this.totalWeights += priority;
          this.dateWeights[date] = this.dateWeights[date]
            ? this.dateWeights[date] + priority
            : priority;
          return date;
        });
        return listDates;
      }
    },
    dateFilterColumn: {
      get() {
        return this.$store.state.dateFilterColumn;
      },
      set(newDateColumn) {
        this.$store.state.dateFilterColumn = newDateColumn;
      }
    },
    selectedIntegerField: {
      get() {
        return this.$store.state.selectedIntegerField
          ? this.$store.state.selectedIntegerField
          : "";
      },
      set(newIntegerField) {
        this.$store.commit("setSelectedIntegerField", newIntegerField);
      }
    },
    picker: {
      get() {
        return this.$store.state.selectedDate;
      },
      set(newDate) {
        this.$store.commit("setSelectedDate", newDate);
      }
    },
    dateFields: {
      get() {
        let dateFieldsArr = [];
        this.$store.state.selectedListColumns.forEach(column => {
          if (column.type === "date") {
            dateFieldsArr.push(column);
          }
        });
        this.dateFilterColumn = dateFieldsArr[0];
        return dateFieldsArr;
      }
    },
    integerFields: {
      get() {
        let integerFields = [];
        this.$store.state.selectedListColumns.forEach(column => {
          if (column.type === "integer") {
            integerFields.push(column);
          }
        });
        this.selectedIntegerField = integerFields[0];
        return integerFields;
      }
    }
  },
  methods: {
    colorFunction(date) {
      if (
        this.selectedListItems.uncheckedItems.length > 0 &&
        this.totalWeights === 0
      ) {
        return `rgba(244, 67, 54, .8)`;
      }
      console.log(this.totalWeights);
      let alpha = this.dateWeights[date] / this.totalWeights;
      alpha = alpha < 0.1 ? 0.1 : alpha;
      alpha = alpha > 0.8 ? 0.8 : alpha;
      return `rgba(244, 67, 54, ${alpha})`;
    }
  },
  name: "TheCalendar"
};
</script>
