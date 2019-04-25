<template>
    <v-flex v-if="integerFields.length > 0">
        Weight
        <v-radio-group v-model="selectedIntegerField">
          <v-radio
            v-for="integerField in integerFields"
            :key="integerField.id"
            :label="integerField.name"
            :value="integerField"
          ></v-radio>
          <v-radio
            label="None"
            value="None"
          ></v-radio>
        </v-radio-group>
    </v-flex>
</template>

<script>

export default  {
    props: ['integerFields'],
    data(){
        return {
        }
    },
    computed: {
        selectedIntegerField: {
            get() {
                return this.$store.state.selectedIntegerField;
            },
            set(newIntegerField) {
                this.$store.commit('setSelectedIntegerField', newIntegerField);
            }
        },
    }

}
</script>
