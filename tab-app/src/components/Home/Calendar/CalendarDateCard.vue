<template>
    <v-flex>
        Display
        <v-radio-group v-model="dateFilterColumn">
          <v-radio
            v-for="dateField in dateFields"
            :key="dateField.index"
            :label="dateField.name"
            :value="dateField"
          ></v-radio>
        </v-radio-group>
    </v-flex>
</template>

<script>

export default  {
    props: ['dateFields'],
    computed: {
        dateFilterColumn: {
            get() {
                return this.$store.state.dateFilterColumn;
            },
            set(newDateColumn) {
                this.$store.state.dateFilterColumn = newDateColumn
            }
        },
    }

}
</script>
