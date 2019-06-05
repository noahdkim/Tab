<template>
    <v-card>
        <v-img
          :src="imageSrc"
          contain
          min-height="200px"
        >
        </v-img>
        <v-divider></v-divider>
        <v-card-text>
            <span class="subheader font-weight-bold">{{title}}</span><br>
            <span class="body-1">{{description}}</span><br><br>
            <span class="body-1">{{examples}}</span>

        </v-card-text>
    </v-card>
</template>
<script>

export default {
    props: ['imageSrc', 'description', 'examples', 'title'],
    components: {
    },
    data: () => ({
    }),
    methods:{

    }
}
</script>
