<template>
    <v-container>
        <v-layout row>
            <v-layout col v-for="header in headers" :key="header.id">
                <div class="font-weight-bold">{{header.text}}</div>
            </v-layout>
        </v-layout>
        <list-row v-for="item in items"
                    :key="item.id"
                    :item="item"
                    :headers="headers"
                    :ref="item.id"
                    @clicked="modifyEditable"
                    >
        </list-row>
        <list-row v-for="item in selectedListItems"
                    :key="item.id"
                    :item="item"
                    :headers="headers"
                    :ref="item.id"
                    @clicked="modifyEditable"
                    >
        </list-row>
    </v-container>
</template>

<script>
import ListRow from './List/ListRow'
export default {
    components: {ListRow},
    data: () => ({
      headers: [{text: "item", id:1}, {text:"Date", id: 2}, {text: "Priority", id: 3}],
      /*
        The actual query for items will return an object instead of a list.
        Hopefully this doesn't require major changes
        The ids in the query should be strings so it will work smoothly with the
        ListRow component
     */
      items: [{Item: "task 1", Date: "2/3/19", Priority: "5", id: "3"},
               {Item: "task 2", Date: "2/3/19", Priority: "5", id: "2"}].map((item) =>{
                   var newItem = item
                   newItem['editable'] = false
                   return newItem
               }
               )
    }),
    computed: {
        selectedListItems(){
            return this.$store.state.selectedListItems;
        }
    },
    methods: {
            modifyEditable(value) {
                /*
                    this is definitely not the best way to do this but I wanted to make it work for now
                    It'd be better to keep track of the current editable so we just change that index
                    instead of iterating over the entire list and setting editable to false
                */
                var found = this.items.findIndex(function(item) {
                    return item.id == value;
                })
                this.items.forEach((item => {
                    item.editable = false;
                }))
                this.items[found].editable = true;
            },
            getSelectedListItems() {
            }
    }
  }
</script>
