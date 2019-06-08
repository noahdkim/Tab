<template>
    <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-card>
        <v-container>
            <span class="headline">Create New List</span>
            <v-layout>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="New List Name"
                                  :rules="listNameRules"
                                  v-model="listName" required>
                  </v-text-field>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout pt-2 row wrap>
                <v-flex  v-for="(template, index) in templates" xs6 md4 pa-1
                         @click="select(index)"
                         :key="index"
                        >
                <div  :class="{selected: selectedTemplateIndex === index}" class='template-card' >
                    <sidebar-form-list-template
                        :imageSrc="template.imageSrc"
                        :description="template.description"
                        :examples="template.examples"
                        :title="template.title"
                        :key="index"
                    >
                    </sidebar-form-list-template>
                </div>
                </v-flex>

            </v-layout>
        </v-container>

      </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="$emit('close-dialog')">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="createNewList">Create</v-btn>
        </v-card-actions>
      </v-card>
  </v-form>
</template>
<script>
import SidebarFormListTemplate from './SidebarForm/SidebarFormListTemplate'

require("@/assets/styles/SidebarFormListTemplate.css");


export default {
    components: {
        SidebarFormListTemplate
    },
    data: () => ({
        columns: [{}],
        dragOptions: {
                animation: 200,
                group: "description",
                disabled: false,
                ghostClass: "ghost"
        },
        valid: true,
        listName: '',
        listNameRules: [
            v => !!v || 'Name is required',
        ],
        templates:[
            {
                imageSrc: require('@/assets/template-images/notepad.jpeg'),
                title: 'Simple Checklist',
                description:'Good when tasks have no specific due date.',
                examples:'(Ex. Shopping lists)',
                columns:[{name: 'Item', type: 'string'}]
            },
            {
                imageSrc: require('@/assets/template-images/notepad-prio-calendar.png'),
                title: 'Tasks (with Priority)',
                description: 'Good for managing tasks with Due Dates and varying Priority',
                examples: '(Ex. Homework, Goals, General task management)',
                columns:[{name: 'Item', type: 'string'},
                            {name:'Priority', type: 'integer'},
                            {name: 'Due Date', type: 'date'}]

            },
            {
                imageSrc: require('@/assets/template-images/notepad-calendar.png'),
                title: 'Tasks (without Priority)',
                description: 'Good for managing equally important tasks with Due Dates',
                examples: '(Ex. Homework, Goals, General task management)',
                columns:[{name: 'Item', type: 'string'},
                            {name: 'Due Date', type: 'date'}]
            }
        ],
        selectedTemplateIndex: -1
    }),
    methods:{
        addColumn(){
            if (this.columns.length < 3){
                this.columns.push({});
            }
        },
        createNewList(){
            if (this.$refs.form.validate() && this.selectedTemplateIndex > -1) {
                let columns = this.templates[this.selectedTemplateIndex].columns
                let listName = this.listName
                this.$store.dispatch('createNewList', {listName, columns}).then(() => {
                    this.$emit('close-dialog')
                    this.$refs.form.reset()
                    this.selectedTemplateIndex = -1
                })

            }
        },
        select(index){
            this.selectedTemplateIndex = index
            console.log(index)
        }
    }
}
</script>
