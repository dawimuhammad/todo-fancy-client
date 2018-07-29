<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialogRegister" persistent max-width="500px">
      <!-- <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn> -->
      <v-card class="register-form">
        <v-card-title class="text-xs-center">
          <span class="headline">Register Form</span>
        </v-card-title>
        <v-card-text v-if="dialogRegister === true" class="py-0">
          <v-container grid-list-md>
            <v-layout wrap>

              <v-flex xs12>
                <v-text-field v-model="registerEmail" label="Email" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="registerPassword" label="Password" type="password" required></v-text-field>
              </v-flex>

            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat v-on:click="showRegisterForm">Cancel</v-btn>
          <v-btn color="blue darken-1" flat v-on:click="saveRegister">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex'
import { mapState } from 'vuex'
import bcrypt from 'bcryptjs'

export default {
    data () {
        return {
            registerEmail: '',
            registerPassword: ''
        }
    },
    methods: {
    showRegisterForm: function () {
        this.clearRegisterForm()
        this.changeRegisterFormStatus()
    },
    saveRegister: function () {
        let saltRounds = 10

        let salt = bcrypt.genSaltSync(saltRounds)
        let hash = bcrypt.hashSync(this.registerPassword, salt)

        let payload = {
            email: this.registerEmail,
            password: hash
        }
        
        this.createUser(payload)
        this.changeRegisterFormStatus()
        this.clearRegisterForm()
    },
    clearRegisterForm: function () {
        this.registerEmail = ''
        this.registerPassword = ''
    },
    ...mapActions([
        'changeRegisterFormStatus',
        'createUser'
    ])
  },
  computed: {
    ...mapState([
      'dialogRegister'
    ])
  }
}
</script>

<style>
.register-form {
    background-color: #E0F7FA;
    opacity: 0.999;
    font-family: Roboto,sans-serif!important;
}
</style>
