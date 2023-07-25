<template>
  <header>
    <div class="information">
        <div class="hamburger">
          <img :src="hamburgerImg" />
        </div>
        <div class="title">
          <h1>FML</h1>
        </div>
        <div>
          <LogInButton v-if="isLogIn == false" />
          <LogOutButton v-if="isLogIn == true" />
        </div>
    </div>
    <div class="navigation">
      <nav class="links">
        <router-link to="/">ALL</router-link>
        <router-link to="/top">RANDOM</router-link>
      </nav>
      <button>
        <img :src="searchImg" />
      </button>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// assets
import hamburgerImg from "../../assets/images/hamburger.svg";
import searchImg from "../../assets/images/search.svg";
import LogInButton from "../ui/button/LogInButton.vue";
import LogOutButton from "../ui/button/LogOutButton.vue";


// Components
export default defineComponent({
    name: "MobileHeader",
    data() {
      return {
        hamburgerImg,
        searchImg,
        isLogIn : false,
      }
    },
    components: {
      LogInButton,
      LogOutButton,
    },
    
})
</script>

<style scoped>
    .information{
      display:flex;
      justify-content: space-between;
      align-items: center;
      padding-left:1.5rem;
      padding-right:1.5rem;
      height:60px;
      background-color: rgba(0, 102, 174 ,1);
    }

    .navigation{
      display: flex;
      justify-content: space-between;
      background-color: rgba(1, 66, 119, 1);
      padding-left:1.5rem;
      padding-right:1.5rem;
    }

    .links{
      display: flex;
      align-items: center;
      height:40px;
      margin-left:-1rem;
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
      color: white;
      font-weight: bold;
    }

    .title h1{
      font-size: 2.0rem;
    }

</style>