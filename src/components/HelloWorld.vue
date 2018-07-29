<template>
  <div class="hello">
    <h1>Just a Todo Fancy Application to fill out your day!</h1>
    <p>
      For guide and recipes on how to configure / customize this project,<br>
      check out the documents, but wait ..
    </p>
    <p>
        I'll build the project first !
    </p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
