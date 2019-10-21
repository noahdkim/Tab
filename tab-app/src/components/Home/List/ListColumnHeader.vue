<template>
  <component :column="column" :ref="column.id" single-line :is="computedHeader" />
</template>
<script>
import ListColumnHeaderDate from "./ListColumnHeader/ListColumnHeaderDate";
import ListColumnHeaderInt from "./ListColumnHeader/ListColumnHeaderInt";
import ListColumnHeaderString from "./ListColumnHeader/ListColumnHeaderString";

export default {
  components: {
    ListColumnHeaderDate,
    ListColumnHeaderInt,
    ListColumnHeaderString
  },
  props: ["column"],
  computed: {
    computedHeader: function() {
      const { type } = this.column;
      let headerType = "";
      switch (type) {
        case "integer":
          headerType = "Int";
          break;
        case "date":
          headerType = "Date";
          break;
        case "string":
          headerType = "String";
          break;
        default:
          console.log(type);
          throw new TypeError("Unknown cell type", type);
      }
      return "ListColumnHeader" + headerType;
    }
  },
  methods: {}
};
</script>

<style scoped src="@/assets/styles/ListCell.css"></style>
