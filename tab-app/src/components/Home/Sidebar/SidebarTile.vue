<template>
  <v-list-item
    @click="changeSelectedList"
    active-class="tile"
    :class="{'active-class' : isActive}"
    @mouseover="mouseOver()"
    @mouseleave="mouseLeave()"
  >
    <span class="fa fa-align-justify handle" :style="{ opacity: showHandle ? 0.3 : 0 }">::</span>
    <v-list-item-content>
      <v-list-item-title>{{ listSelector.name }}</v-list-item-title>
    </v-list-item-content>
    <v-menu @click.native.stop>
      <template v-slot:activator="{ on }">
        <v-btn icon :style="{ opacity: showHandle ? 0.3 : 0 }">
          <v-icon>more_horiz</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(option, index) in listDialogOptions" :key="index">
          <v-list-item-title @click.stop="option.action">{{ option.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- Hesitation dialog for list deletion -->
    <v-dialog v-model="deleteDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Delete {{listSelector.name}}?</v-card-title>
        <v-card-text>
          Are you sure you want to delete
          <div class="font-weight-bold">{{listSelector.name}}?</div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat="flat" @click="this.deleteList">Delete</v-btn>
          <v-btn color flat="flat" @click="deleteDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End Hesitation Dialog -->
  </v-list-item>
</template>

<script>
import SidebarEditForm from "./SidebarEditForm";

export default {
  components: {
    SidebarEditForm
  },
  props: ["listSelector"],
  data: () => ({
    showHandle: false,
    deleteDialog: false,
    dialog: false
  }),
  computed: {
    isActive() {
      return this.listSelector === this.$store.state.selectedListMeta;
    },
    listDialogOptions() {
      return [
        { title: "Edit List", action: this.editList },
        { title: "Delete List", action: this.openDeleteDialog }
      ];
    }
  },

  methods: {
    changeSelectedList(event) {
      this.$store.dispatch("changeSelectedList", this.listSelector);
    },
    deleteList(event) {
      console.log("deleting list.....");
      this.$store.dispatch("deleteList", this.listSelector).then(() => {
        this.deleteDialog = false;
      });
    },
    editList(event) {
      this.$root.$emit("editList", this.listSelector);
    },
    openDeleteDialog(event) {
      this.deleteDialog = true;
    },
    mouseOver(event) {
      this.showHandle = true;
    },
    mouseLeave(event) {
      this.showHandle = false;
    }
  }
};
</script>

<style scoped src="@/assets/styles/TheSidebar.css"></style>
