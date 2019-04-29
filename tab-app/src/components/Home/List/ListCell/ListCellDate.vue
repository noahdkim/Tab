<template>
<div>
    <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="date"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
          <v-text-field
            v-model="date"
            readonly
            slot="activator"
            hide-details
            class="textfield"
            solo
            flat
          ></v-text-field>
        <v-date-picker v-model="date" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
        </v-date-picker>
      </v-menu>
</div>
</template>

<script>
import firebase from 'firebase'
export default {
    props: ['item', 'header'],

    data () {
        return{
            /* this is currently not being used */
            checkbox: true,
            landscape: false,
            reactive: true,
            menu: false,
            listCellDateValue: new Date(this.item.values[this.header.id].seconds * 1000).toISOString().substring(0,10)

        }
    },
    computed: {
        date: {
            get: function() {
                return this.listCellDateValue
            },
            set: function(newDate) {
                let newValue = this.parseISOString(newDate);
                this.listCellDateValue = newDate
                this.updateCellValue(newValue)
            }
        }

    },
    methods: {
        updateCellValue(newValue){
            this.$emit('update', newValue);
        },
        parseISOString(ISOString) {
          let splitString = ISOString.split(/\D+/);
          let d = new Date(Date.UTC(splitString[0], --splitString[1], splitString[2]));
          let firebaseDateSeconds = d.getTime() / 1000;
          let timestamp = new firebase.firestore.Timestamp(firebaseDateSeconds, 0);
          console.log(timestamp);
          return timestamp;
        }

    }
  }
</script>
<style scoped>

v-text-field    {
    margin: 0px;
    padding: 0px;
}

</style>
<style scoped src="@/assets/styles/listcell.css"></style>
