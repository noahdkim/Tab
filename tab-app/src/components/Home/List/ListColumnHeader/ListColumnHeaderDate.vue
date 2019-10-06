<template>
    <v-flex
    text-xs-center
    xs3
    :key="column.id"
    justify-start
    >
        <span class="font-weight-black">{{column.name}}</span>
    </v-flex>
</template>

<script>
	export default {
		props: ['column'],
        methods:{
            
        }
	};
</script>
