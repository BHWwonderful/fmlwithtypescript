<template>
  <button class="login">
    <img :src="loginButtonImg" alt="login" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import loginButtonImg from "../../../assets/images/login.svg"

export default defineComponent({
    name: "LogInButton",
    data(){
        return{
            loginButtonImg,
        }
    },
})
</script>

<style scoped>
    .login{
        cursor: pointer;
    }
</style>