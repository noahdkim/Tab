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
                return new Date(this.item.values[this.header.name].seconds * 1000).toISOString().substr(0, 10);
            },
            set: function(newDate) {
                let header = this.header.name;
                let itemID = this.item.id;
                console.log(newDate.getTime());
                // let newValue = newDate.getTime();
                // this.$store.dispatch('updateItemState', {itemID, header, newValue});
            }
        }

    },
    methods: {
        updateItemState (newValue){
            let itemID = this.item.id;
            let header = this.header.name;
            this.$store.dispatch('updateItemState', {itemID, header, newValue});
        }

    }
  }
</script>
