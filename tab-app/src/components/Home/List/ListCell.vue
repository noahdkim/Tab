<template>
  <component
    :item="item"
    :column="column"
    @update="updateCellValue"
    :ref="item.item_meta.id + '-' + column.id"
    single-line
    :is="computedCell"
  />
</template>

<script>
import ListCellDate from "./ListCell/ListCellDate";
import ListCellInt from "./ListCell/ListCellInt";
import ListCellString from "./ListCell/ListCellString";

export default {
  components: { ListCellDate, ListCellInt, ListCellString },
  props: ["item", "column"],

  data() {
    return {
      /* this is currently not being used */
      checkbox: true,
      value: this.item.values[this.column.id]
    };
  },
  computed: {
    cellValue: {
      get: function() {
        return this.value;
      },
      set: function(newValue) {
        this.$refs[this.item.item_meta.id + "-" + this.column.id].setValue(
          newValue
        );
        this.value = newValue;
      }
    },
    computedCell: function() {
      const { type } = this.column;
      let cellType = "";
      switch (type) {
        case "integer":
          cellType = "Int";
          break;
        case "date":
          cellType = "Date";
          break;
        case "string":
          cellType = "String";
          break;
        default:
          console.log(type)
          throw new TypeError("Unknown cell type", type)
      }

      return "ListCell" + cellType;
    }
  },
  methods: {
    updateCellValue(newValue) {
      this.cellValue = newValue;
    },
    getValue() {
      return this.$refs[
        this.item.item_meta.id + "-" + this.column.id
      ].getValue();
    },
    setValue(newValue) {
      this.$refs[this.item.item_meta.id + "-" + this.column.id].setValue(
        newValue
      );
    }
  }
};
</script>
<style scoped>
.listcell {
  /*background-color: #0ab;*/
  padding: 0px;
}

v-text-field {
  margin: 0px;
  padding: 0px;
}
</style>
