<template>
    <v-list-tile
        @click="changeSelectedList"
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
            showHandle: false,

          }),

        methods: {
            changeSelectedList(event) {
                this.$store.dispatch('changeSelectedList', this.listSelector)
            },
            deleteList(event){
                console.log("deleting list.....")
                this.$store.dispatch('deleteList', this.listSelector);
            },
            showDropdown() {
                console.log("show dropdown")
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
