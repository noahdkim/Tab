<template>
  <ListColumnHeaderDate v-if="column.type === 'date'" :column="column" :ref="column.id" single-line></ListColumnHeaderDate>
  <ListColumnHeaderInt
    v-else-if="column.type === 'integer'"
    :column="column"
    :ref="column.id"
    single-line
  ></ListColumnHeaderInt>
  <ListColumnHeaderString
    v-else-if="column.type === 'string'"
    :column="column"
    :ref="column.id"
    single-line
  ></ListColumnHeaderString>
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
  methods: {}
};
</script>

<style scoped src="@/assets/styles/ListCell.css"></style>
