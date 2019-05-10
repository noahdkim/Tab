<template>
    <v-list-tile
        @click="changeSelectedList"
        active-class='tile'
        :class="{'active-class' : isActive}"
        @mouseover="mouseOver()"
        @mouseleave="mouseLeave()"
    >
       <span class="fa fa-align-justify handle" :style="{ opacity: showHandle ? 0.3 : 0 }">::</span>
       <v-list-tile-content >
          <v-list-tile-title>{{ listSelector.name }}</v-list-tile-title>
       </v-list-tile-content>
       <v-menu @click.native.stop>
               <v-btn icon slot="activator"
               >
                   <v-icon>more_horiz</v-icon>
               </v-btn>
           <v-list>
            <v-list-tile
              v-for="(option, index) in listDialogOptions"
              :key="index"
            >
              <v-list-tile-title @click.stop="option.action">{{ option.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
       </v-menu>

       <!-- Hesitation dialog for list deletion -->
       <v-dialog
          v-model="deleteDialog"
          max-width="290"
        >
          <v-card>
            <v-card-title class="headline">Delete {{listSelector.name}}?</v-card-title>
            <v-card-text>
                Are you sure you want to delete <div class="font-weight-bold">{{listSelector.name}}?</div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="red darken-1"
                flat="flat"
                @click="this.deleteList"
              >
                Delete
              </v-btn>
              <v-btn
                color=""
                flat="flat"
                @click="deleteDialog = false"
              >
                Cancel
              </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-list-tile>
</template>

<script>
    export default{
        props: ['listSelector'],
        data: () => ({
            showHandle: false,
            deleteDialog: false
          }),
          computed: {
              isActive () {
                  return this.listSelector===this.$store.state.selectedList
              },
              listDialogOptions(){
                  return [{ title: 'Edit List',
                            action: 'editList'},
                          { title: 'Delete List',
                            action: this.openDeleteDialog},]
              }
          },

        methods: {
            changeSelectedList(event) {
                // console.log(this.listSelector===this.$store.state.selectedList)
                this.$store.dispatch('changeSelectedList', this.listSelector)
            },
            deleteList(event){
                console.log("deleting list.....")
                this.$store.dispatch('deleteList', this.listSelector).then(()=>{
                    this.deleteDialog = false;
                })
            },
            editList(event){
                console.log("editing list........")
            },
            openDeleteDialog(event){
                this.deleteDialog = true
            },
            mouseOver(event)    {
                this.showHandle = true;
            },
            mouseLeave(event)   {
                this.showHandle = false;
            }
        }
    }
</script>

<style scoped src="@/assets/styles/thesidebar.css"></style>
