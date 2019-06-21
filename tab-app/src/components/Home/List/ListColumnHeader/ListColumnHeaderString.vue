<template>
    <v-flex
    text-xs-center
    xs4
    shrink
    :key="column.id"
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
