<template>
	<v-layout column align-start>
		<v-layout row
			:id="item.item_meta.id"
			@click="makeActive"
			@mouseover="mouseOver()"
			@mouseleave="mouseLeave()"
			>
			<span class="fa fa-align-justify handle" :style="{ opacity: showHandle ? 0.3 : 0 }">::</span>
			<v-checkbox @click.stop="checkbox=!checkbox" class="checkbox" default v-model="checkbox"></v-checkbox>
			<v-layout col
				v-for="header in headers"
				:key="header.id"
				align-start
				class="listcells">
				<list-cell
					:item = "item"
					:header = "header"
					:ref="item.item_meta.id + '-' + header.id"
					single-line
					:class="{ 'activeRow': item.item_meta.active }"
					>
				</list-cell>
			</v-layout>
			<v-btn flat icon @click.stop="deleteItem" :style="{ opacity: showHandle ? 0.3 : 0 }">
				<v-icon class="deleteIcon" >delete</v-icon>
			</v-btn>
		</v-layout>
		<!-- Hidden Options Row is shown when row is active -->
		<v-layout row class="hiddenOptionsRow" v-show="item.item_meta.active">
			<v-container class="pa-0" id="saveCancelContainer">
				<v-btn 	class="saveRowBtn"
						@click.native="saveItem"
						small
						flat
						color="#197bbd">
						<strong>Save</strong>
				</v-btn>
				<v-btn 	class="cancelRowBtn2"
						@click.native="cancel"
						small
						flat
						color="#555">
						<strong>Cancel</strong>
				</v-btn>
			</v-container>

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
				checkbox2: false,
				showHandle: false,
			}
		},
        computed: {
            checkbox: {
                get: function() {
                    return this.item.item_meta.checkbox
                },
                set: function(newCheckboxValue) {
                    this.item.item_meta.checkbox = newCheckboxValue
                    this.$store.dispatch('saveItem', this.item)
                }
            }
        },
		methods: {
			deleteItem (event) {
				this.$store.dispatch('deleteItem', this.item);
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
              for (var i=0; i<this.headers.length; i++) {
                      let newValue = this.$refs[this.item.item_meta.id+'-'+this.headers[i].id][0].getValue()
                      let headerId = this.headers[i].id
                      this.$store.dispatch('updateItemState', {item, headerId, newValue});
              }
              this.$store.dispatch('saveItem', this.item)
          },
          cancel(){
              this.item.item_meta.active = false;
              let item = this.item
              for (var i=0; i<this.headers.length; i++) {
                  let originalValue = this.item.values[this.headers[i].id]
                  this.$refs[this.item.item_meta.id+'-'+this.headers[i].id][0].setValue(originalValue)
              }
              this.$store.dispatch('saveItem', this.item)
          	/* More cancel actions needed here TODO */
          }

      },
      mounted() {
            this.$root.$on('changeActive', data => {
                if (this.item.item_meta.id !== data && this.item.item_meta.active){
                    this.saveItem();
                    this.item.item_meta.active = false;
                }
            });
        }
  }



</script>

<style scoped src="@/assets/styles/ListRow.css"></style>
<style scoped src="@/assets/styles/main.css"></style>
