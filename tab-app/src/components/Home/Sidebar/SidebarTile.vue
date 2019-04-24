<template>
    <v-list-tile
        @click="changeSelectedList"
        active-class='tile'
        :class="{'active-class' : isActive}"
    >
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
              v-for="(item, index) in items"
              :key="index"
              @click=""
            >
              <v-list-tile-title @click.stop="deleteList">{{ item.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
       </v-menu>
    </v-list-tile>
</template>

<script>
    export default{
        props: ['listSelector'],
        data: () => ({
              items: [
                { title: 'Delete List' },
            ],
          }),
          computed: {
              isActive () {
                  console.log(this.listSelector===this.$store.state.selectedList)
                  return this.listSelector===this.$store.state.selectedList
              }
          },

        methods: {
            changeSelectedList(event) {
                //console.log(this.listSelector===this.$store.state.selectedList)
                this.$store.dispatch('changeSelectedList', this.listSelector)
            },
            deleteList(event){
                console.log("deleting list.....")
                this.$store.dispatch('deleteList', this.listSelector);
            },
            showDropdown() {
                console.log("show dropdown")
            }
        }
    }
</script>

<style scoped>
  .active-class {
      background: #d7d7d7;
  }
</style>
