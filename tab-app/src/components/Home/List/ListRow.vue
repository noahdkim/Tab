<template>
	<v-layout column align-start>
		<v-layout row
			:id="item.item_meta.id"
			@click="makeActive"
			@mouseover="mouseOver()"
			@mouseleave="mouseLeave()"
			>
			<span class="fa fa-align-justify handle" :style="{ opacity: showHandle ? 0.3 : 0 }">::</span>
			<v-checkbox class="checkbox" default v-model="checkbox"></v-checkbox>
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
					:class="{ 'activeRow': item.item_meta.active }"
					>
				</list-cell>
			</v-layout>
			<v-btn flat icon @click="deleteItem" >
				<v-icon class="deleteIcon" :style="{ opacity: item.item_meta.active ? 0.3 : 0 }">delete</v-icon>
			</v-btn>
		</v-layout>
		<!-- Hidden Options Row is shown when row is active -->
		<v-layout row class="hiddenOptionsRow" v-show="item.item_meta.active">
			<div id="saveCancelContainer">
				<v-btn 	class="saveRowBtn" 
						@click.native="saveList"
						small
						flat
						color="#197bbd">
						<strong>Save</strong>
				</v-btn>
				<v-btn 	class="cancelRowBtn2" 
						@click.native="saveList"
						small
						flat
						color="#555">
						<strong>Cancel</strong>
				</v-btn>
			</div>

		</v-layout>
	</v-layout>
</template>

<script>
	import ListCell from './ListCell'

	import { EventBus } from '@/store/modules/event-bus.js';

	import PrettyInput from 'pretty-checkbox-vue/input';
	import PrettyCheck from 'pretty-checkbox-vue/check';
	import PrettyRadio from 'pretty-checkbox-vue/radio';

	export default {
		components: {ListCell, PrettyInput, PrettyCheck, PrettyRadio},
		props: ['item', 'headers'],

		data () {
			return{
				/* this is currently not being used */
				checkbox: false,
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
          },
          saveList() {
          	/* this is async */
          	this.item.item_meta.active = false;
          	this.$store.dispatch('saveList');
          },
          cancel()    {
          	this.item.item_meta.active = false;
          	/* More cancel actions needed here TODO */
          }

      }
  }



</script>

<style scoped src="@/assets/styles/ListRow.css"></style>
<style scoped src="@/assets/styles/main.css"></style>
