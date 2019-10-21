<template>
  <v-container fluid>
    <v-layout row wrap justify-center>
      <v-flex class="text-center" xs12>
        <h3 class="display-2">Sign in to Tab</h3>
      </v-flex>

      <v-flex xs2 mt-2 mb-3>
            <v-img
                @click="googleOauth"
                :src="require('@/assets/signin-assets/google_signin_buttons/web/2x/btn_google_signin_light_normal_web@2x.png')"
                class="google-sign-in"
                max-width= '90%'
                >
            </v-img>
    </v-flex>

      <h2 class="divider-text"><span class="divider-line body-2">Or</span></h2>

      <v-flex class="text-center" xs12 sm6 mt-3>
        <h3>Enter your email address and password</h3>
        <form @submit.prevent="userSignIn">
          <v-layout column>
            <v-flex>
              <v-alert type="error" dismissible v-model="alert">
                {{ error }}
              </v-alert>
            </v-flex>
            <v-flex>
              <v-text-field
                name="email"
                label="Email"
                id="email"
                type="email"
                v-model="email"
                required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="password"
                label="Password"
                id="password"
                type="password"
                v-model="password"
                required></v-text-field>
            </v-flex>

            <v-flex class="text-xs-center">
              <v-btn color="primary" type="submit">Sign In</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
require('@/assets/styles/SignIn.css')
export default {
  data () {
    return {
      email: '',
      password: '',
      alert: false
    }
  },
  methods: {
    userSignIn () {
      this.$store.dispatch('userSignInWithEmail', { email: this.email, password: this.password })
    },
    googleOauth(){
        console.log("YAY")
        this.$store.dispatch('userSignInWithGoogle')
    }
  },
  computed: {
    error () {
      return this.$store.state.error
    },
    loading () {
      return this.$store.state.loading
    }
  },
  watch: {
    error (value) {
      if (value) {
        this.alert = true
      }
    },
    alert (value) {
      if (!value) {
        this.$store.commit('setError', null)
      }
    }
  }
}
</script>
