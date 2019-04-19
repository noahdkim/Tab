<template>
        <v-layout row class="header-row">
            <v-layout col v-for="header in headers" :key="header.name">
                <div class="font-weight-bold">{{ header.name }}</div>
            </v-layout>
        </v-layout>


</template>

<script>

    export default {
        props: ['headers'],
    };
</script>
