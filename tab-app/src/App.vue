<template>
<v-app>
    <v-toolbar flat app class="toolbar" color="#197BBD" style="color: #fff">
        <!-- Sidebar Icon -->
        <span v-if="isAuthenticated" class="hidden-lg-and-up">
            <v-toolbar-side-icon class="white--text" @click="emitToggleShowSidebar">
            </v-toolbar-side-icon>
        </span>
        <v-toolbar-title>
            <router-link :to="isAuthenticated ? '/Home' : '/'" tag="span" style="cursor: pointer">
                {{ appTitle }}
            </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only">
            <v-btn flat v-for="item in menuItems" :key="item.title" :to="item.path">
                <v-icon left dark>{{ item.icon }}</v-icon>
                {{ item.title }}
            </v-btn>

        </v-toolbar-items>
        <v-btn dark flat v-if="isAuthenticated" @click="userSignOut">
            <v-icon left>exit_to_app</v-icon>
            Sign Out
        </v-btn>

        <!-- Calendar Icon -->
        <span v-if="isAuthenticated" class="hidden-lg-and-up">
            <v-toolbar-side-icon class="white--text" @click="emitToggleShowCalendar">
                <span class="mdi mdi-calendar" style="transform: scale(1.5)"></span>
            </v-toolbar-side-icon>
        </span>
    </v-toolbar>






    <v-content>
        <router-view></router-view>
    </v-content>

</v-app>
</template>

<script>

import TheSidebar from '@/components/Home/TheSidebar'
import TheCalendar from '@/components/Home/TheCalendar'

require('@/assets/styles/main.css');

export default {
    components: { TheSidebar, TheCalendar },
    data() {
        return {
            // appTitle: 'Awesome App'
        }
    },
    /* https://github.com/vuejs/vue/issues/1915#issuecomment-159334432 */
    created() {
        window.addEventListener('resize', this.handleResize)
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize)
    },

    computed: {
        appTitle() {
            return this.$store.state.appTitle
        },
        isAuthenticated() {
            return this.$store.getters.isAuthenticated
        },
        menuItems() {
            if (this.isAuthenticated) {
                return []
            } else {
                return [{
                        title: 'About Us',
                        path: '/AboutUs',
                        icon: 'face'
                    }

                ]
            }
        }
    },
    methods: {
        userSignOut() {
            this.$store.dispatch('userSignOut')
        },
        handleResize() {
            if(document.documentElement.clientWidth >= 600)   {
                this.sidebar = false;
            }
        },
        emitToggleShowCalendar(){
            this.$bus.$emit('toggleShowCalendar')
        },
        emitToggleShowSidebar(){
            this.$bus.$emit('emitToggleShowSidebar')
        },
    },

}


</script>
<style scoped src="@/assets/styles/main.css"></style>
