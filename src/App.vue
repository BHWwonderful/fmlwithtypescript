<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'


export default defineComponent({
  name: 'App',
  data() {
    return {
      price1: 60,
      rate: 0,
      price2: 70,
      inputValue: 0,
    }
  },
})
</script>

<style>

</style>
