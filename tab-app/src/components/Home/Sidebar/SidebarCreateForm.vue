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
                <v-text-field label="New List Name"
                                :rules="listNameRules"
                                v-model="listName" required>
                </v-text-field>
              </v-flex>
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
          </v-layout>
      </v-container>
      </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="addColumn">Add Column</v-btn>
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
        columns: [{}],
        valid: true,
        listName: '',
        listNameRules: [
        v => !!v || 'Name is required',
      ],
    }),
    methods:{
        addColumn(){
            if (this.columns.length < 4){
                this.columns.push({});
            }
        },
        createNewList(){
            if (this.$refs.form.validate()) {
                let columns = this.columns
                let listName = this.listName
                this.$store.dispatch('createNewList', {listName, columns}).then(() => {
                    this.$emit('close-dialog')
                    this.$refs.form.reset()
                })

            }
        },
        updateColumnName(event){
            this.columns[event.index]['name'] = event.newName
        },
        updateColumnType(event){
            this.columns[event.index]['type'] = event.newType.toLowerCase();
        },
        removeColumn(index){
            if(this.columns.length > 1){
                this.columns.splice(index, 1)
            }
        }
    }
}
</script>
