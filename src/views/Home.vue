<template>
  <div class="home">
    <div class="row started">
      <h1 class="display-4 mb-5">To-do App</h1>
      <v-btn round large v-on:click="showRegisterForm" color="light-blue darken-1" class="white--text">LET'S GET STARTED</v-btn>
    </div>
    <div>
      <v-btn small round outline v-on:click="showLoginForm" color="light-blue lighten-5">Log In</v-btn>
    </div>
    <Login></Login>
    <Register></Register>
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import Footer from '@/components/Footer.vue'
import { mapActions } from 'vuex'
import { mapState } from 'vuex'

export default {
  name: 'home',
  components: {
      Footer,
      Login,
      Register
  },
  methods: {
      showLoginForm: function () {
        this.changeLoginFormStatus()
      },
      showRegisterForm: function () {
        this.changeRegisterFormStatus()
      },
      ...mapActions([
        'changeLoginFormStatus',
        'changeRegisterFormStatus'
      ])
  },
  computed: {
    ...mapState([
      'dialogLogin',
      'dialogRegister'
    ])
  },
  created () {
    if (localStorage.hasOwnProperty('token')) {
      this.$router.push('/about')
    }
  }
}
</script>

<style>
body {
    background-image: url("../assets/todo-bg.jpeg");
    background-size: 100% auto;
    background-repeat: repeat-y;
}

.started {
    margin-top: 175px;
}

Footer {
   position: fixed;
   bottom: 0;
}
</style>
