<template>
	<v-layout row class="header-row">
		<span class="spacer-handle"></span>
    <span class="spacer-checkbox"></span>
		<v-layout col 
		v-for="header in headers" 
		:key="header.name"
		justify-start>
		<!-- <div class="font-weight-bold" style="text-align: left">{{ header.name }}</div> -->
                <!-- <list-cell
                	:key="header.id"
                	:item="header"
                	single-line>
                </list-cell> -->
                <!-- <v-text-field class="textfield"
                          @input="updateItemState"
                          :value="item.values[header.name]"
                          :readonly="!item.item_meta.active"
                          :id="header.name"
                          ref="{{item.id}}-{{header.text}}"
                          single-line
                          hide-details> -->
                          <v-text-field class="textfield"
                          :value="header.name"
                          :id="header.name"
                          ref="{{item.id}}-{{header.text}}"
                          single-line
                          hide-details
                          readonly
                          solo
                          flat
                          >

                          <!-- :outline="!item.item_meta.active" -->
                      </v-text-field>

                  </v-layout>
                  <div class="spacer-delete"></div>
              </v-layout>


          </template>

          <script>
          	import ListCell from './ListCell'

          	export default {
          		components: {ListCell},
          		props: ['headers'],
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

          .textfield  {
          	/*margin: 0px;*/
          	padding: 0px;
          }
      </style>