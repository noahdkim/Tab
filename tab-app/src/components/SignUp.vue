<template>
    <v-app>
        <v-container fluid>
            <v-layout row wrap justify-center>
                <v-flex xs12 class="text-xs-center" mt-1>
                    <h1>Tab</h1>
                    <h2>Simple, Powerful, Flexible</h2>
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
                <v-flex class="text-xs-center" xs12 sm6>
                    <h3>Create an Account</h3>

                    <v-form
                    ref="form"
                    @submit.prevent="userSignUp"
                    v-model="valid"
                    lazy-validation
                    >
                    <v-layout column>
                        <v-flex>
                          <v-alert type="error" dismissible v-model="alert">
                            {{ error }}
                          </v-alert>
                        </v-flex>
                        <v-text-field
                          id="email"
                          label="E-mail"
                          name="email"
                          v-model="email"
                          :rules="emailRules"
                          required
                        ></v-text-field>
                        <v-text-field
                         id="password"
                         label="Password"
                         name="password"
                         type="password"
                         :rules="[passwordCheck]"
                         v-model="password"
                         required
                        ></v-text-field>
                        <v-text-field
                         id="confirmPassword"
                         label="Confirm Password"
                         name="password"
                         type="password"
                         :rules="[comparePasswords]"
                         v-model="confirmPassword"
                         required
                        ></v-text-field>
                        <v-flex class="text-xs-center" mt-5>
                          <v-btn color="primary" type="submit" :disabled="!valid || loading">Sign Up</v-btn>
                        </v-flex>
                    </v-layout>
                    </v-form>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
require('@/assets/styles/SignIn.css')

  export default {
    name: 'landing-page',
    components: {},
    data () {
         return {
            alert: false,
            valid: false,
            email: '',
            password: '',
            confirmPassword: '',
            emailRules: [
              (v) => !!v || 'E-mail is required',
              (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ]
          }
    },
    methods: {
        userSignUp () {
            if (!this.valid){
                return;
            }
            this.$store.dispatch('userSignUp', { email: this.email, password: this.password })
        },
        googleOauth(){
            console.log("YAY")
            this.$store.dispatch('userSignInWithGoogle')
        }
    },
    computed: {
        comparePasswords() {
            return this.password === this.confirmPassword ? true : 'Passwords don\'t match'
        },
        passwordCheck() {
            return this.password.length >= 6 ? true : 'Password must be at least 6 symbols'
        },
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

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

</style>
