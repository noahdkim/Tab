<template>
    <v-container id="parent-flex" class="ma-0 pa-0">
    	<v-flex id="the-list-flex" class="ma-0 pa-0" grow>
    		<the-list></the-list>
    	</v-flex>
    </v-container>
</template>

<script>
    import TheSidebar from './Home/TheSidebar'
    import TheList from './Home/TheList'
    import TheCalendar from './Home/TheCalendar'

    require("@/assets/styles/main.css");

    export default {
       components: { TheSidebar, TheList, TheCalendar },
       data () {
           return{
           }
       },
       computed: {
           showCalendar () {
               let listHeaders = this.$store.state.selectedListHeaders
               this.$store.state.showCalendar = false;
               for(var i = 0; i < listHeaders.length; ++i){
                   if (listHeaders[i].type === "date"){
                       this.$store.state.showCalendar = true;
                   }
               }
               return this.$store.state.showCalendar;
           }
       },
       mounted() {
           /* polyfillScript for vCalendar */
           let polyfillScript = document.createElement('script')
           polyfillScript.setAttribute('src', 'https://cdn.polyfill.io/v2/polyfill.min.js?features=Array.prototype.find,Intl')
           document.head.appendChild(polyfillScript)
       },
       /* https://github.com/vuejs/vue/issues/1915#issuecomment-159334432 */
       created() {
           window.addEventListener('resize', this.handleResize)
       },
       destroyed() {
           window.removeEventListener('resize', this.handleResize)
       },
       methods: {
           handleResize: function()    {
               this.show = (document.documentElement.clientWidth >= 935);
           }
       },
   }
</script>

<style scoped src="@/assets/styles/main.css"></style>

<style scoped src="@/assets/styles/Home.css"></style>