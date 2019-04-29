<template>
    <v-flex>
        Display
        <v-radio-group v-model="dateFilterHeader">
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
        dateFilterHeader: {
            get() {
                return this.$store.state.dateFilterHeader;
            },
            set(newDateHeader) {
                this.$store.state.dateFilterHeader = newDateHeader
            }
        },
    }

}
</script>
