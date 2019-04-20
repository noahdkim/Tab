<template>
    <v-layout row wrap>
        <v-flex xs8 sm8 d-flex>
            <v-text-field
              label="Column Name"
              prepend-icon="remove"
              @click:prepend="removeItem"
              @input="updateColumnOptionName"
              :counter="10"
              :rules="columnNameRules"
              :value="columnOption.name"
              required
            ></v-text-field>
        </v-flex>

        <v-flex xs4 sm4 d-flex>
            <v-select
            required
              :items="types"
              label="Type"
              :rules="[v => !!v || 'Item is required']"
              :value="columnOption.type"
              @change="updateColumnOptionType"
            ></v-select>
        </v-flex>
    </v-layout>

</template>
<script>
export default {
        props: ['columnOption', 'index'],
        data: () => ({
            types: ['Date', 'String', 'Integer'],
            columnName: '',
            columnNameRules: [
            v => !!v || 'Column name is required',
            v => (v && v.length <= 10) || 'Column name must be less than 10 characters'
          ],
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
            },
            removeItem(){
                this.$emit('removeColumnOption', this.index);
            }
        }

        }
</script>
