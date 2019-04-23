<template>
  <v-layout row
  :id="item.item_meta.id"
  @click="makeActive"
  @mouseover="mouseOver()"
  @mouseleave="mouseLeave()"
  >
    <span class="fa fa-align-justify handle" :style="{ opacity: showHandle ? 0.3 : 0 }">::</span>
    <v-checkbox></v-checkbox>

    <v-layout col 
        v-for="header in headers" 
        :key="header.id"
        align-start
        class="listcells">
      <list-cell
       :item = "item"
      :header = "header"
      ref="{{item.item_meta.id}}-{{header.text}}"
      single-line
      v-bind:class="{ activeRow: !item.item_meta.active }"
      >
  </list-cell>
</v-layout>
<v-btn flat icon @click="deleteItem" >
    <v-icon class="deleteIcon" :style="{ opacity: showHandle ? 0.3 : 0 }">delete</v-icon>
</v-btn>

</v-layout>
</template>

<script>
  import ListCell from './ListCell'

  import { EventBus } from '@/store/modules/event-bus.js';
  export default {
    components: {ListCell},
    props: ['item', 'headers'],

    data () {
      return{
        /* this is currently not being used */
        checkbox: true,
        showHandle: false,
    }
},
methods: {
  deleteItem (event) {
    this.$store.dispatch('deleteItem', this.item);
},
makeActive (event) {
              // When the row is clicked, dispatch changeActiveItem to the store passing
              // the current ID.
              // the changeActiveItem method searches for the ID and modifies the active attribute
              // to true
              this.showHandle = false;
              this.$store.dispatch('changeActiveItem', this.item);
          },
          mouseOver(event)    {
              this.showHandle = true;
              console.log("this.item_meta.active: " + this.item.item_meta.active);
          },
          mouseLeave(event)   {
              this.showHandle = false;
          }

      }
  }



</script>

<style scoped>
.activeRow  {
    background-color: #f0f;
}
.button {
    /*margin-top: 35px;*/
}
.handle {
    padding: 5px;
    margin-left: 10px;
    margin-right: 10px;
    /*border: solid #000 1px;*/
    cursor: grab;
    font-size: 200%;
    /*margin-bottom: 30px;*/

    color: rgba(0, 0, 0, 1);
}
.deleteIcon {
    color: rgba(0, 0, 0, 1);
}

.close {
    float: right;
    /*padding-top: 8px;*/
    /*padding-bottom: 8px;*/
}
input {
    display: inline-block;
    /*width: 50%;*/
}
.listcells  {
    border-top:     1px solid rgba(0,0,0,.06);
    border-bottom:  1px solid rgba(0,0,0,.06);
}
.text {
    margin: 0px;
}





</style>


<style scoped src="@/assets/styles/main.css"></style>