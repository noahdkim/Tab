<template>
    <v-flex
    text-xs-center
    xs4
    shrink
    :key="column.id"
    @click="modifySort(column.index)"
    >
        <span class="font-weight-black">{{column.name}}</span>
    </v-flex>
</template>

<script>
	export default {
		props: ['column'],
        methods:{
            modifySort(columnIndex){
                this.$store.commit('setSorting', true)

                console.log(columnIndex)
                if(this.$store.state.sortColumnIndex === columnIndex){
                    this.$store.commit('setSortDescending', !this.$store.state.sortDescending)
                } else{
                    this.$store.commit('setSortColumnIndex', columnIndex)
                    this.$store.commit('setSortDescending', true)
                }
            }
        }
	};
</script>
