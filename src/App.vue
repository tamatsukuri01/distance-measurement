<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <GoogleMap/>
  </div>
</template>

<script>
import GoogleMap from "./components/GoogleMap.vue"

export default {
  name: 'App',
  components: {
    GoogleMap
  }
}
</script>

<style>

</style>
