<template>
  <v-flex xs3 class="listcells">
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      bottom
      :return-value.sync="dateValue"
      transition="scale-transition"
      min-width="290px"
    >
      <template v-slot:activator="{ on: menu }">
        <v-tooltip bottom right>
          <template v-slot:activator="{ on: tooltip }">
            <v-text-field
              v-model="dateValue"
              :filled="item.item_meta.active"
              readonly
              hide-details
              class="text-field"
              reverse
              solo
              flat
              v-on="{ ...menu, ...tooltip }"
              placeholder="####-##-##"
            />
          </template>
          <span>{{tooltipText}}</span>
        </v-tooltip>
      </template>
      <v-date-picker v-model="dateValue" no-title scrollable>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
        <v-btn text color="primary" @click="$refs.menu.save(dateValue)">OK</v-btn>
      </v-date-picker>
    </v-menu>
  </v-flex>
</template>

<script>
import firebase from "firebase";
export default {
  props: ["item", "column"],

  data() {
    return {
      /* this is currently not being used */
      checkbox: true,
      landscape: false,
      reactive: true,
      menu: false,
      listCellDateValue: new Date(
        this.item.values[this.column.id].seconds * 1000
      )
        .toISOString()
        .substring(0, 10)
    };
  },
  computed: {
    dateValue: {
      get: function() {
        return this.listCellDateValue;
      },
      set: function(newDate) {
        let newValue = this.parseISOString(newDate);
        this.listCellDateValue = newDate;
      }
    },
    tooltipText: {
      get: function() {
        let tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
        var localDate = new Date(Date.now() - tzoffset);
        let dateDiff = this.calculateDayDiff(
          new Date(this.listCellDateValue),
          localDate
        );
        let dayOrDays = "days";
        if (Math.abs(dateDiff) == 1) {
          dayOrDays = "day";
        }
        if (dateDiff < 0) {
          dateDiff = -dateDiff;
          return `Due ${dateDiff} ${dayOrDays} ago`;
        } else if (dateDiff == 0) {
          return `Due today`;
        } else {
          return `Due in ${dateDiff} ${dayOrDays}`;
        }
      },
      set: function() {}
    }
  },
  methods: {
    parseISOString(ISOString) {
      let splitString = ISOString.split(/\D+/);
      let d = new Date(
        Date.UTC(splitString[0], --splitString[1], splitString[2])
      );
      let firebaseDateSeconds = d.getTime() / 1000;
      let timestamp = new firebase.firestore.Timestamp(firebaseDateSeconds, 0);
      return timestamp;
    },
    getValue() {
      return this.parseISOString(this.dateValue);
    },
    setValue(newValue) {
      this.dateValue = newValue
        .toDate()
        .toISOString()
        .substring(0, 10);
    },
    calculateDayDiff(day1, day2) {
      let oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
      let diffDays = Math.ceil((day1.getTime() - day2.getTime()) / oneDay);
      return diffDays;
    }
  }
};
</script>
<style scoped>
v-text-field {
  margin: 0px;
  padding: 0px;
}
</style>
<style scoped src="@/assets/styles/ListCell.css"></style>
