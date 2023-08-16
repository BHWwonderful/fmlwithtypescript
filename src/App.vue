<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
})
</script>

<style>
  @font-face {
    font-family: 'Geomanist';
    src: url('./assets/fonts/Geomanist-Regular.ttf') format('truetype');
    font-weight: 400;
  }

  @font-face {
    font-family: 'Geomanist';
    src: url('./assets/fonts/Geomanist-Bold.ttf') format('truetype');
    font-weight: 700;
  }
</style>
