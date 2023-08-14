<template>
  <header>
    <div class="information">
        <div class="hamburger">
          <img :src="hamburgerImg" />
        </div>
        <div class="title">
          <h1>FML</h1>
        </div>

    </div>
    <div class="navigation">
      <nav class="links">
        <router-link to="/">ALL</router-link>
        <a>RANDOM</a>
        <a>SPICY</a>
        <a>RANDOM SPICY</a>
        <a>NEARLY FMLS</a>
        <router-link to="/top">THE TOP</router-link>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// assets
import hamburgerImg from "../../assets/images/hamburger.svg";

// Components
export default defineComponent({
    name: "MobileHeader",
    data() {
      return {
        hamburgerImg,
        isLogIn : false,
      }
    },
})
</script>

<style scoped>
    .information{
      position:relative;
      display:flex;
      justify-content: space-between;
      align-items: center;
      padding-left:1rem;
      padding-right:1rem;
      height:60px;
      background-color: rgba(0, 102, 174 ,1);
    }

    .navigation{
      display: flex;
      justify-content: space-between;
      background-color: rgba(1, 66, 119, 1);
      padding-left:1rem;
    }

    .links{
      width:100%;
      display: flex;
      align-items: center;
      height:40px;
      margin-left:-1rem;
      overflow-x: scroll;
      overflow-y: hidden;
      white-space: nowrap;
    }

    .links::-webkit-scrollbar {
      display: none;
    }

    .links a{
      color:white;
      margin-left:1rem;
      padding-left:0.5rem;
      padding-right:0.5rem;
      height:100%;
      line-height: 40px;
    }

    .links a:hover{
      background-color:orange;
    }

    .hamburger{
      cursor: pointer;
    }

    .title{
      position:absolute;
      left:50%;
      top:50%;
      transform: translate(-50%, -50%);
      color: white;
      font-weight: bold;
    }

    .title h1{
      font-size: 2.0rem;
    }

</style>