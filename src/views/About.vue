<template>
  <div class="about">
    <v-toolbar>
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
    </div>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down py-2">
        <v-btn primary outline color="white" v-on:click="logout" style="height: 50px">
            Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <Todolist/>
  </div>
</template>

<script>
import Todolist from '@/components/Todolist.vue'

export default {
  components: {
      Todolist
  },
  created () {
    if (!localStorage.hasOwnProperty('token')) {
      this.$router.push('/')
    }
  },
  methods : {
    logout: function () {
        localStorage.removeItem('token')
        this.$router.push('/')
    }
  }
}
</script>
