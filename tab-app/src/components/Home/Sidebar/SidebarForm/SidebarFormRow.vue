<template>
    <v-layout row wrap>
        <v-flex xs8 sm8 d-flex>
            <v-text-field
              label="New List Name"
              @input="updateColumnOptionName"
              required
            ></v-text-field>
        </v-flex>

        <v-flex xs4 sm4 d-flex>
            <v-select
            required
              :items="types"
              label="Type"
              @change="updateColumnOptionType"
            ></v-select>
        </v-flex>
    </v-layout>

</template>
<script>
export default {
        props: ['columnOption', 'index'],
        data: () => ({
            types: ['Date', 'String', 'Integer']
        }),
        computed: {
        },
        methods:{
            updateColumnOptionName (newName){
                let index = this.index
                this.$emit('updateColumnOptionName', {newName, index});
            },
            updateColumnOptionType (newType){
                console.log(newType)
                let index = this.index
                this.$emit('updateColumnOptionType', {newType, index});
            }
        }

        }
</script>
