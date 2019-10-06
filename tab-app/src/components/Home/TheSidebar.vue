<template>
  <!-- <v-navigation-drawer class="sidebar" hide-overlay> -->
  <v-container class="ma-0 pa-0 sidebar">
    <v-list>
      <draggable handle=".handle" v-bind="dragOptions" @end="endDrag()" :list="this.personalLists">
        <sidebar-tile
          v-for="personalList in personalLists"
          :listSelector="personalList"
          :key="personalList.id"
        ></sidebar-tile>
      </draggable>

      <!-- Constant sidebar tiles -->
      <v-list-item class="create-new-list-tile" @click="openCreateListDialog">
        <v-list-item-avatar>
          <v-icon class="create-new-list-icon">add</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>Create New List</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-switch v-model="showChecked" label="Show Checked Items"></v-switch>
      </v-list-item>

      <!-- Create new list dialog form -->
      <v-dialog v-model="createDialog" max-width="80%">
        <sidebar-create-form @close-dialog="createDialog=false"></sidebar-create-form>
      </v-dialog>

      <!-- Edit list dialog form -->
      <v-dialog v-model="editDialog" max-width="600px">
        <sidebar-edit-form
          @close-dialog="editDialog=false"
          :listSelector="editDialog ? this.listSelector : {}"
          :listColumns="editDialog ? this.columns : []"
        ></sidebar-edit-form>
      </v-dialog>
    </v-list>
  </v-container>
  <!-- </v-navigation-drawer> -->
</template>

<script>
import draggable from "vuedraggable";
import SidebarCreateForm from "./Sidebar/SidebarCreateForm";
import SidebarEditForm from "./Sidebar/SidebarEditForm";
import SidebarTile from "./Sidebar/SidebarTile";
import router from "@/router";

require("@/assets/styles/SidebarForm.css");

export default {
  name: "TheSidebar",

  components: {
    SidebarCreateForm,
    SidebarEditForm,
    SidebarTile,
    draggable
  },
  data() {
    return {
      userEmail: this.$store.state.user.email,
      createDialog: false,
      editDialog: false,
      showHandle: false,
      listSelector: {},
      columns: []
    };
  },
  computed: {
    personalLists() {
      return this.$store.state.personalLists;
    },
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    },
    showChecked: {
      get() {
        console.log(this.$store.state.selectedListSettings.showChecked);
        return this.$store.state.selectedListSettings.showChecked;
      },
      set(newValue) {
        this.$store.state.filtering = true;
        this.$store.commit("setShowChecked", newValue);
      }
    }
  },
  props: {
    show: Boolean
  },
  mounted() {
    this.loadUserLists();
    this.$root.$on("editList", this.editListListener);
  },
  destroyed() {
    this.$root.$off("editList", this.editListListener);
  },
  methods: {
    loadUserLists() {
      console.log("loading user lists....");
      this.$store.dispatch("loadPersonalListData");
    },
    loadListColumnInformation(listID) {},
    editListListener(listSelector) {
      this.$store
        .dispatch("loadListColumns", listSelector.listContentKey)
        .then(columns => {
          this.columns = columns;
          this.columns.forEach(column => {
            column.isOriginal = true;
          });
          this.listSelector = listSelector;
          this.editDialog = true;
        });
    },
    endDrag() {
      this.drag = false;
      this.saveSidebarOrder();
      this.saveSidebarToFirestore();
    },
    saveSidebarToFirestore() {
      /* this is async */
      this.$store.dispatch("saveSidebarToFirestore");
    },
    saveSidebarOrder() {
      this.$store.dispatch("saveSidebarOrder").then(result => {
        console.log(result);
      });
    },
    openCreateListDialog() {
      this.createDialog = true;
    }
  }
};
</script>
<style scoped src="@/assets/styles/TheSidebar.css"></style>
