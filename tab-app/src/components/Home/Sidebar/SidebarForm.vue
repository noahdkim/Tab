<template>
    <v-card>
        <v-card-title>
          <span class="headline">Create New List</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Legal first name*" required></v-text-field>
              </v-flex>
              <sidebar-form-row v-for="(columnOption, index) in columnOptions"
                                  :columnOption="columnOption"
                                  :index="index"
                                  :key="index"
                                  @updateColumnOptionName="updateColumnOptionName($event)"
                                  @updateColumnOptionType="updateColumnOptionType($event)"
                                  >
              </sidebar-form-row>
          </v-layout>
      </v-container>
      </v-card-text>
              <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="$emit('close-dialog')">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="createNewList">Save</v-btn>
        </v-card-actions>
      </v-card>
</template>
<script>
import SidebarFormRow from './SidebarForm/SidebarFormRow'


export default {
    components: {
        SidebarFormRow
    },
    data: () => ({
        columnOptions: [{}, {}, {}]
    }),
    methods:{
        updateColumnOptionName(event){
            this.columnOptions[event.index]['name'] = event.newName
        },
        updateColumnOptionType(event){
            this.columnOptions[event.index]['type'] = event.newType
        },
        createNewList(){
            
        }
    }
}
</script>
