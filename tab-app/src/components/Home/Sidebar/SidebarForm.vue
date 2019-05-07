<template>
    <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-card>
        <v-card-title>
          <span class="headline">Create New List</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="New List Name" v-model="listName" :counter="20" :rules="listNameRules" required></v-text-field>
              </v-flex>
              <sidebar-form-row v-for="(columnOption, index) in columnOptions"
                                  :columnOption="columnOption"
                                  :counter="10"
                                  :index="index"
                                  :key="index"
                                  @removeColumnOption="removeColumnOption($event)"
                                  @updateColumnOptionName="updateColumnOptionName($event)"
                                  @updateColumnOptionType="updateColumnOptionType($event)"
                                  >
              </sidebar-form-row>
          </v-layout>
      </v-container>
      </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="addColumnOption">Add Column</v-btn>
          <v-btn color="blue darken-1" flat @click="$emit('close-dialog')">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="createNewList">Create</v-btn>
        </v-card-actions>
      </v-card>
  </v-form>
</template>
<script>
import SidebarFormRow from './SidebarForm/SidebarFormRow'


export default {
    components: {
        SidebarFormRow
    },
    data: () => ({
        columnOptions: [{}],
        valid: true,
        listName: '',
        listNameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 20) || 'Name must be less than 20 characters'
      ],
    }),
    methods:{
        addColumnOption(){
            this.columnOptions.push({});
        },
        createNewList(){
            if (this.$refs.form.validate()) {
                let columnOptions = this.columnOptions
                let listName = this.listName
                this.$store.dispatch('createNewList', {listName, columnOptions}).then(() => {
                    this.$emit('close-dialog')
                    this.$refs.form.reset()
                })

            }
        },
        updateColumnOptionName(event){
            this.columnOptions[event.index]['name'] = event.newName
        },
        updateColumnOptionType(event){
            this.columnOptions[event.index]['type'] = event.newType.toLowerCase();
        },
        removeColumnOption(index){
            if(this.columnOptions.length > 1){
                this.columnOptions.splice(index, 1)
            }
        }
    }
}
</script>
