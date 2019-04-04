<template>
  <v-layout row @click="makeActive" :id="item.id">
    <!-- <span class="fa fa-align-justify handle">&#9776;</span> -->
    <span class="fa fa-align-justify handle">::</span>
    <v-layout col v-for="header in headers" :key="header.id">
      <list-cell :item = "item"
                      :header = "header"
                      ref="{{item.id}}-{{header.text}}"
                      single-line>
      </list-cell>


    </v-layout>
</v-layout>
</template>

<script>
  import ListCell from './ListCell'
  export default {
    components: {ListCell},
    props: ['item', 'headers'],

    data () {
      return{
        /* this is currently not being used */
        checkbox: true,
      }
    },
    methods: {
      makeActive (event) {
          // When the row is clicked, dispatch changeActiveItem to the store passing
          // the current ID.
          // the changeActiveItem method searches for the ID and modifies the active attribute
          // to true
        this.$store.dispatch('changeActiveItem', event.currentTarget.id);

    },

}
}
</script>

<style scoped>
.button {
  margin-top: 35px;
}
.handle {
  padding: 5px;
  margin-right: 10px;
  /*border: solid #000 1px;*/
  cursor: move;
  font-size: 200%;
  /*margin-bottom: 30px;*/
}
.close {
  float: right;
  padding-top: 8px;
  padding-bottom: 8px;
}
input {
  display: inline-block;
  width: 50%;
}
.text {
  margin: 20px;
}

.list-group {
  min-height: 20px;
}
.list-group-item {
  /*cursor: move;*/
}
.list-group-item i {
  /*cursor: pointer;*/
}
</style>
