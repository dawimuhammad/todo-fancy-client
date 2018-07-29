<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialogLogin" persistent max-width="500px">
      <!-- <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn> -->
      <v-card class="login-form">
        <v-card-title class="text-xs-center">
          <span class="headline">Login</span>
        </v-card-title>
        <v-card-text v-if="dialogLogin === true" class="py-0">
          <v-container grid-list-md>
            <v-layout wrap>

              <v-flex xs12>
                <v-text-field v-model="loginEmail" label="Email" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="loginPassword" label="Password" type="password" required></v-text-field>
              </v-flex>

            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat v-on:click="showLoginForm">Ga Jadi</v-btn>
          <v-btn color="blue darken-1" flat v-on:click="loginCheck">Log In</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex'
import { mapState } from 'vuex'
import swal from 'sweetalert2'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export default {
  data () {
    return {
        loginEmail: '',
        loginPassword: ''
    }
  },
  methods: {
    showLoginForm: function () {
        this.changeLoginFormStatus()
        this.clearRegisterForm()
    },
    ...mapActions([
        'changeLoginFormStatus',
        'getUsers'
    ]),
    clearRegisterForm: function () {
        this.loginEmail = '',
        this.loginPassword = ''
    },
    loginCheck: function () {
        this.getUsers()
        let users = this.users

        for (let key in users) {
          // console.log(users[key].email)
          // console.log(users[key].email)

            if ((users[key].email) === this.loginEmail) {
              let isMatch = bcrypt.compareSync(this.loginPassword, users[key].password); // false
              console.log('is password match : '+isMatch)
              if (isMatch) {
                // generate token -> set in local storage 
                let token = jwt.sign({ email: this.loginEmail}, 'adadeh')

                // token won't be assigned to local storage -> need to be fixed
                localStorage.setItem('token',token)
                
                // close login form
                this.showLoginForm()

                // redirect to task page
                this.$router.push('/about')
                swal({
                  type: 'success',
                  title: 'Yeaaah!',
                  text: 'Berhasil login!'
                })
              } else {
                  swal({
                    type: 'error',
                    title: 'Oops!',
                    text: 'Wrong credentials!'
                  })

              }
              break
            } else {
              console.log('------>  yeah gagal')
              swal({
                type: 'error',
                title: 'Oops...',
                text: 'User not found!'
              })
            }
        }
    }
  },
  computed: {
    ...mapState([
      'dialogLogin',
      'users'
    ])
  }
}
</script>

<style>
.login-form {
    background-color: #fff;
    opacity: 0.999;
    font-family: Roboto,sans-serif!important;
}
</style>
