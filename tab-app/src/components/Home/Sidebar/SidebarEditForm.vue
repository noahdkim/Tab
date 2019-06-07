<template>
    <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-card>
        <v-card-title>
          <span class="headline">Edit List</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="New List Name"
                                :rules="listNameRules"
                                v-model="listName" required>
                </v-text-field>
              </v-flex>
              <draggable
                  class="list-group"
                  handle=".handle"
                  :list="columns"
              >
              <sidebar-form-row v-for="(column, index) in columns"
                                  :column="column"
                                  :counter="10"
                                  :index="index"
                                  :key="index"
                                  @removeColumn="removeColumn($event)"
                                  @updateColumnName="updateColumnName($event)"
                                  @updateColumnType="updateColumnType($event)"
                                  >
              </sidebar-form-row>
          </draggable>
          </v-layout>
      </v-container>
      </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="addColumn">Add Column</v-btn>
          <v-btn color="blue darken-1" flat @click="$emit('close-dialog')">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click="editList">Save</v-btn>
        </v-card-actions>
      </v-card>
  </v-form>
</template>
<script>
import draggable from 'vuedraggable'
import SidebarFormRow from './SidebarForm/SidebarFormRow'


export default {
    components: {
        draggable,
        SidebarFormRow
    },
    props:['listSelector', 'listColumns'],
    data(){
        return{
        columns: this.listColumns,
        valid: true,
        listName: this.listSelector.name,
        listNameRules: [
        v => !!v || 'Name is required',
      ]
    }
    },
    methods:{
        addColumn(){
            if (this.columns.length < 4){
                this.columns.push({});
            }
        },
        editList(){
            if (this.$refs.form.validate()) {
                console.log(this.columns)
                let columns = this.columns
                let listName = this.listName
                let id = this.listSelector.id
                let listSelector = this.listSelector
                this.$store.dispatch('editList', {listSelector, listName, columns}).then(() => {
                    this.$emit('close-dialog')
                })

            }
        },
        updateColumnName(event){
            console.log("updating name")
            this.columns[event.index]['name'] = event.newName
        },
        updatetColumnType(event){
            this.columns[event.index]['type'] = event.newType.toLowerCase();
        },
        removeColumn(index){
            if(this.columns.length > 1){
                this.columns.splice(index, 1)
            }
        }
    },
    watch:{
        listSelector: function(newVal, oldVal) {
            this.listName = newVal.name
        },
        listColumns: function(newVal, oldVal) {
            console.log("change")
            this.columns = newVal
        },
    }
}
</script>
