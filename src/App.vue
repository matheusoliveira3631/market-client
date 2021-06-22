<template>
  <Login/>
</template>

<script>
import Login from './components/Login'

export default {
  name: 'App',
  components: {
    Login
  }
}
</script>

<style>
html, body{
  margin:0;
  height: 100%;
}

hr{
  width: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: inherit;
}
</style>
