<template>
  <v-container id="parent-flex" class="ma-0 pa-0">
    <!-- Sidebar -->
    <v-navigation-drawer
      class="the-sidebar-nav-drawer"
      v-model="showSidebar"
      clipped
      app
      :light="false"
    >
      <the-sidebar></the-sidebar>
    </v-navigation-drawer>
    <!-- List -->
    <v-flex v-if="listIsSelected" class="ma-0 pa-0 the-list-flex" grow justify-center>
      <the-list></the-list>
    </v-flex>
    <!-- Calendar -->
    <v-navigation-drawer
      v-if="dateColumnExists && listIsSelected"
      class="the-calendar-nav-drawer"
      v-model="showCalendar"
      clipped
      app
      right
      :light="false"
      :width="400"
    >
      <the-calendar></the-calendar>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
import TheSidebar from "./Home/TheSidebar";
import TheList from "./Home/TheList";
import TheCalendar from "./Home/TheCalendar";

require("@/assets/styles/main.css");

export default {
  components: { TheSidebar, TheList, TheCalendar },
  data() {
    return {
      showCalendar: true,
      showSidebar: true
    };
  },
  computed: {
    dateColumnExists() {
      let listColumns = this.$store.state.selectedListColumns;
      this.$store.state.dateColumnExists = false;
      for (var i = 0; i < listColumns.length; ++i) {
        if (listColumns[i].type === "date") {
          this.$store.state.dateColumnExists = true;
        }
      }
      return this.$store.state.dateColumnExists;
    },
    listIsSelected() {
      return !(typeof this.$store.state.selectedListMeta == "undefined");
    }
  },
  mounted() {
    /* polyfillScript for vCalendar */
    let polyfillScript = document.createElement("script");
    polyfillScript.setAttribute(
      "src",
      "https://cdn.polyfill.io/v2/polyfill.min.js?features=Array.prototype.find,Intl"
    );
    document.head.appendChild(polyfillScript);
  },
  /* https://github.com/vuejs/vue/issues/1915#issuecomment-159334432 */
  created() {
    window.addEventListener("resize", this.handleResize);
    this.$bus.$on("toggleShowCalendar", () => {
      this.showCalendar = !this.showCalendar;
    });
    this.$bus.$on("emitToggleShowSidebar", () => {
      this.showSidebar = !this.showSidebar;
    });
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize: function() {
      this.show = document.documentElement.clientWidth >= 935;
    }
  }
};
</script>

<style scoped src="@/assets/styles/main.css"></style>

<style scoped src="@/assets/styles/Home.css"></style>
