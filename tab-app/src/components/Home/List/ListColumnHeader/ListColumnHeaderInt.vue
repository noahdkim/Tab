<template>
    <v-flex
    text-xs-center
    xs2
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
