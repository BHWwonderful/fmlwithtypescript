<template>
  <button>
    <img :src="logOutButtonImg" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import logOutButtonImg from "@/assets/images/logout.svg";

export default defineComponent ({
    name: "LogOutButton",
    data(){
        return{
            logOutButtonImg : logOutButtonImg
        }
    }
})
</script>

<style>

</style>