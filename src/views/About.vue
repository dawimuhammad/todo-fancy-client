<template>
  <div class="about">
    <v-toolbar class="top-nav justify-space-between">

      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>
      <v-spacer></v-spacer>
      <h3 v-if="this.todayWeather === {}"></h3>
      <h3 v-else>
        {{ this.todayWeather.city_name }}, {{ this.todayWeather.temp }} Celcius, {{ this.todayWeather.weather.description }}
      </h3>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down py-2">
        <v-btn primary outline color="black" v-on:click="logout" style="height: 50px">
            Logout
        </v-btn>
      </v-toolbar-items>
    
    </v-toolbar>
    <Todolist/>
  </div>
</template>

<script>
import Todolist from '@/components/Todolist.vue'
import { mapActions } from 'vuex'
import { mapState } from 'vuex'

export default {
  components: {
      Todolist
  },
  created () {
    if (!localStorage.hasOwnProperty('token')) {
      this.$router.push('/')
    }

    this.getTodayWeather()
  },
  methods : {
    ...mapActions([
      'getTodayWeather'
    ])
  }, computed: {
      ...mapState([
        'todayWeather'
      ])
  }
}
</script>

<style>
.top-nav {
  background-color: aliceblue;
}
</style>
