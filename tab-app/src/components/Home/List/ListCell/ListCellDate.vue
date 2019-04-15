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
        }
    },
    computed: {
        date: {
            get: function() {
                console.log(this.item.values[this.header.name])
                return new Date(this.item.values[this.header.name].seconds * 1000).toISOString().substring(0,10);
            },
            set: function(newDate) {
                let header = this.header.name;
                let itemID = this.item.item_meta.id;
                let newValue = this.parseISOString(newDate);
                console.log(newValue);
                // let newValue = newDate.getTime();
                this.$store.dispatch('updateItemState', {itemID, header, newValue});
            }
        }

    },
    methods: {
        updateItemState (newValue){
            let itemID = this.item.id;
            let header = this.header.name;
            this.$store.dispatch('updateItemState', {itemID, header, newValue});
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
.textfield  {
  /*margin: 0px;*/
  padding: 0px;
  margin-right: 20px;
}
</style>