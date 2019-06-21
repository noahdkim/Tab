<template>
    <v-container fluid pa-0 ma-0>
    	<v-layout row
    				:id="item.item_meta.id"
    				@click="makeActive"
    				@mouseover="mouseOver()"
    				@mouseleave="mouseLeave()">
        		<v-flex shrink>
                    <div style="display:inline-block">
            			<span class="fa fa-align-justify handle" :style="{ opacity: showHandle ? 0.3 : 0 }">::</span>
                        </div>
                    <div style="display:inline-block">
            			<v-checkbox @click.stop="checked=!checked" class="checkbox" default v-model="checked"></v-checkbox>
                    </div>
        		</v-flex>
				<list-cell
                    v-for="column in columns"
                    :key="column.id"
					:item = "item"
					:column = "column"
					:ref="column.id"
					single-line
					:class="{ 'activeRow': item.item_meta.active }"
					>
				</list-cell>
                <v-flex xs1>
        			<v-btn flat icon @click.stop="deleteItem" :style="{ opacity: showHandle ? 0.3 : 0 }">
        				<v-icon class="deleteIcon" >delete</v-icon>
        			</v-btn>
                </v-flex>
        </v-layout>
		<!-- Hidden Options Row is shown when row is active -->
		<v-layout row class="hiddenOptionsRow" v-show="item.item_meta.active">
			<v-flex xs2  class="pa-0" id="saveCancelContainer">
				<v-btn 	class="saveRowBtn"
						@click.stop="saveItem"
						small
						flat
						color="#197bbd">
						<strong>Save</strong>
				</v-btn>
            </v-flex>
            <v-flex xs2>
				<v-btn 	class="cancelRowBtn2"
						@click.stop="cancel"
						small
						flat
						color="#555">
						<strong>Cancel</strong>
				</v-btn>
			</v-flex>

		</v-layout>
</v-container>
</template>

<script>
	import ListCell from './ListCell'

	import { EventBus } from '@/store/modules/event-bus.js';

	import PrettyInput from 'pretty-checkbox-vue/input';
	import PrettyCheck from 'pretty-checkbox-vue/check';
	import PrettyRadio from 'pretty-checkbox-vue/radio';

	export default {
		components: {ListCell, PrettyInput, PrettyCheck, PrettyRadio},
		props: ['item', 'columns'],

		data () {
			return{
				/* this is currently not being used */
				checkbox2: false,
				showHandle: false,
				sortKeyData: '',
			}
		},
		computed: {
			checked: {
				get: function() {
					return this.item.item_meta.checked
				},
				set: function(newCheckboxValue) {
                    this.$store.dispatch('toggleItemChecked', this.item)

                    this.item.item_meta.checked = newCheckboxValue
					this.$store.dispatch('saveItem', this.item)
				}
			},
			sortKey: {
				get: function() {
					return this.sortKey
				},
				set: function(newKey){
					this.sortKey = newKey
				}
			}
		},
		methods: {
              cancel(){
      			  this.item.item_meta.active = false;
      			  let item = this.item
      			  for (var i=0; i<this.columns.length; i++) {
      				  let originalValue = this.item.values[this.columns[i].id]
      				  this.$refs[this.columns[i].id][0].setValue(originalValue)
      			  }
      			  this.$store.dispatch('saveItem', this.item)
    	      },
    		  deleteItem (event) {
    			  this.$store.dispatch('deleteItem', this.item);
    		  },
              listener(data){
    			  if (this.item.item_meta.id !== data && this.item.item_meta.active){
    				  this.saveItem();
    			  }
    		  },
    		  makeActive (event) {
    			  this.showHandle = false;
    			  this.item.item_meta.active = true;
    			  this.$root.$emit('changeActive', this.item.item_meta.id);
    			  return "made Active"
    		  },
    		  mouseOver(event)    {
    			this.showHandle = true;
    		  },
    		  mouseLeave(event)   {
    			this.showHandle = false;
    		  },
    		  saveList() {
    			/* this is async */
    			this.$store.dispatch('saveListToFirestore');
    		  },
    		  saveItem(){
    			  this.item.item_meta.active = false;
    			  let item = this.item
    			  for (var i=0; i<this.columns.length; i++) {

    				  let newValue = this.$refs[this.columns[i].id][0].getValue()

    				  let columnId = this.columns[i].id
    				  this.$store.dispatch('updateItemState', {item, columnId, newValue});
    			  }
    			  this.$store.dispatch('saveItem', this.item)
    		  },

	  },
	  mounted() {
			this.$root.$on('changeActive', this.listener);
		},
		destroyed(){
			this.$root.$off('changeActive', this.listener);
		}
  }



</script>

<style scoped src="@/assets/styles/ListRow.css"></style>
<style scoped src="@/assets/styles/main.css"></style>
