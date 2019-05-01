<template>
	<v-layout column align-start>
		<v-layout row class="header-row">
			<span class="spacer-handle"></span>
			<span class="spacer-checkbox"></span>
			<v-layout col
			v-for="header in headers"
			:key="header.name"
			justify-start
			>
                    <v-textarea class="header-field"
                    :value="header.name"
                    :id="header.id"
                    :ref="header.id"
                    single-line
                    hide-details
                    readonly
                    solo
                    flat
                    rows="1"
                    no-resize
                    @click="modifySort(header.index)"
                    >
                </v-textarea>

            </v-layout>
            <div class="spacer-delete"></div>
    	</v-layout>
    </v-layout>
</template>

<script>
	import ListCell from './ListCell'

	export default {
		components: {ListCell},
		props: ['headers'],
        methods:{
            modifySort(columnIndex){
                if(this.$store.state.sortColumnIndex === columnIndex){
                    this.$store.commit('setSortDescending', !this.$store.state.sortDescending)
                } else{
                    this.$store.commit('setSortColumnIndex', columnIndex)
                    this.$store.commit('setSortDescending', true)
                }
            }
        }
	};
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

<style scoped src="@/assets/styles/listcell.css"></style>
