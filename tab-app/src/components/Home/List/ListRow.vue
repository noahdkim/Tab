<template>
  <v-layout row
            :id="item.item_meta.id"
            @click="makeActive"
            @mouseover="mouseOver()"
            @mouseleave="mouseLeave()"
            >
    <!-- <span class="fa fa-align-justify handle">&#9776;</span> -->
    <span id="handle_id" class="fa fa-align-justify handle"
            v-show=showHandle>::</span>
          <!-- v-show=showHandle -->
    <span class="fa fa-align-justify handle" style="color: rgba(255,255,255,0);"
            v-show=!showHandle>::</span>
    <v-layout col v-for="header in headers" :key="header.id">
      <list-cell :item = "item"
                      :header = "header"
                      ref="{{item.item_meta.id}}-{{header.text}}"
                      single-line>
      </list-cell>
  </v-layout>
  <v-btn flat icon @click="deleteItem" :style="{opacity: showHandle ? 100 : 0 }">
              <v-icon>delete</v-icon>
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
              var vm = this;

              EventBus.$on('the-list-drag-event', drag => {
                // is this necessary? it seems to slow down code a good amount
                if(drag)    {
                  this.showHandle = false;
              }
          });
          },
          mouseLeave(event)   {
              this.showHandle = false;
          }

      }
  }



</script>

<style scoped>
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

    color: rgba(0, 0, 0, 0.3);
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
.text {
    margin: 0px;
}

.list-group {
    /*min-height: 20px;*/
}
.list-group-item {
    /*cursor: move;*/
}
.list-group-item i {
    /*cursor: pointer;*/
}

.fade-enter,.fade-leave-to {
    visibility: hidden;
    height: 0;
    margin: 0;
    padding: 0;
    opacity: 0;
}

.fade-enter-active,.fade-leave-active {
    transition: all 0.3s;
}


</style>


<style scoped src="@/assets/styles/main.css"></style>