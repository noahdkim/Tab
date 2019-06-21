<template>
    <v-layout row class="ma-0 pa-0 list-head">
        <span class="spacer-handle"></span>
        <v-icon @click="modifySort('checked')">check</v-icon>
        <list-column-header v-for="column in columns" :key="column.id" :column="column" @click.native="modifySort(column)"></list-column-header>
    </v-layout>
</template>


<script>
import ListColumnHeader from './ListColumnHeader'
export default {
    components: {
        ListColumnHeader,
    },
    data: () => ({
        drag: false,
    }),
    props: ['columns'],
    methods:{
        modifySort(column){
            console.log("sorting")
            this.$store.commit('setSorting', true)
            this.$store.dispatch('sortList', column).then(
                Vue.nextTick(() => {
                    this.$store.commit('setSorting', false)
                })
            )
        }
    }
}

</script>
<style scoped>
.spacer-checkbox  {
  max-width:    47px;
  min-width:    47px;
  max-height:   52px;
  min-height:   52px;

  opacity:      0;
  color: rgba(0, 0, 0, 0);
  background-color: rgba(0, 0, 0, 0);

  border: 1px solid #000;
}

.spacer-handle	{
  max-width:		26px;
  min-width:		26px;
  max-height:		26px;
  min-height: 	26px;

  margin-left: 	10px;
  margin-right: 10px;

  opacity: 0;
  color: rgba(0, 0, 0, 0);
  background-color: rgba(0, 0, 0, 0);

  border: solid #000 1px;
}

.spacer-delete	{
  max-width: 		36px;
  min-width: 		36px;
  max-height: 	36px;
  min-height: 	36px;

  margin-top: 	6px;
  margin-bottom: 	6px;
  margin-left: 	8px;
  margin-right: 	8px;

  opacity: 0;
  color: rgba(0, 0, 0, 0);
  background-color: rgba(0, 0, 0, 0);

  border: solid #000 1px;
}
</style>
