<template>
    <v-layout row wrap>
        <v-flex xs12 d-flex>
            <v-text-field
              label="Column Name"
              prepend-icon="remove"
              @click:prepend="removeItem"
              @input="updateColumnName"
              :counter="20"
              :rules="columnNameRules"
              :value="column.name"
              required
            >
            <template slot="prepend">
                <span class="fa fa-align-justify handle" :style="{ opacity: 0.3 }">::</span>
                <v-icon>remove</v-icon>
              </template>
        </v-text-field>
        </v-flex>

        <!-- <v-flex xs4 sm4 d-flex>
            <v-overflow-btn editable
            required
              :items="types"
              label="Type"
              :rules="[v => !!v || 'Item is required']"
              :value="column.type"
              @change="updateColumnType"
            ></v-overflow-btn>
        </v-flex> -->
    </v-layout>

</template>
<script>
export default {
        props: ['column', 'index'],
        data: () => ({
            types: ['Date', 'String', 'Integer'],
            columnName: '',
            columnNameRules: [
            v => !!v || 'Column name is required',
            v => (v && v.length <= 20) || 'Column name must be less than 20 characters'
          ],
        }),
        computed: {
        },
        methods:{
            updateColumnName (newName){
                let index = this.index
                this.$emit('updateColumnName', {newName, index});
            },
            updateColumnType (newType){
                let index = this.index
                this.$emit('updateColumnType', {newType, index});
            },
            removeItem(){
                this.$emit('removeColumn', this.index);
            }
        }

        }
</script>
