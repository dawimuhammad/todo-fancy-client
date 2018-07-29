<template>
  <div class="about">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <Todolist/>
    </div>
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
  } 
}
</script>
