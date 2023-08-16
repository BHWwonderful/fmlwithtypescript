<template>
  <section class="hambergur-menu" :class="{ 'dark-primary' : getIsDarkMode}">
    <div class="quit">
      <button @click="resetIsHamburgerClicked">
        <img class="quit-img" :src="xImg" alt="quit" />
      </button>
    </div>
    <div class="logo">
      <img class="logo-img" :src="logoImg" alt="FML" />
      <a class="app-link">CHECK OUT THE APP</a>
    </div>
    <hr class="bar" />
    <div>
      <form>
        <label class="form-label">Search</label>
        <input class="search" :class="{'dark-secondary' : getIsDarkMode}" type="search" placeholder="Search" />
      </form>
    </div>
    <div class="account">
      <h2>ACCOUNT</h2>
      <a>
        <img :src="userImg" alt="user" />
        <span class="user">Welcome, GUEST!</span>
      </a>
    </div>
    <div class="functions">
      <h2>FML</h2>
      <div>
        <button @click="changeIsSubmitClicked" class="submit">Submit</button>
        <button @click="goToModeratePage" class="moderate" :class="{ 'dark-blue-primary' : getIsDarkMode}">Moderate</button>
      </div>
    </div>
    <div class="categories">
      <h2>CATEGORIES</h2>
      <ul class="categories-list">
        <li>
          <a>ALL</a>
        </li>
        <li>
          <a>RANDOM</a>
        </li>
        <li>
          <a>SPICY</a>
        </li>
        <li>
          <a>NEARLY FMLS</a>
        </li>
        <li>
          <a>THE TOP</a>
        </li>
        <li>
          <a>FML - THE FOLLOW - UP</a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// assets
import logoImg from "../assets/images/logo.png";
import xImg from "../assets/images/x.svg";
import userImg from "../assets/images/user.svg";

export default defineComponent ({
  name: "Hamburger Menu",
  data(){
    return{
      logoImg,
      xImg,
      userImg,
    }
  },
  methods:{
    resetIsHamburgerClicked(): void{
      this.$emit("resetIsHamburgerClicked")
    },
    changeIsSubmitClicked(): void{
      console.log("Hi")
      this.$emit("changeIsSubmitClicked")
    },
    resetIsSubmitClicked(): void{
      this.$emit("resetIsSubmitClicked")
    },
    goToModeratePage(): void{
        this.$router.push("/moderate")
    },
  },
  computed:{
    getIsDarkMode(){
        return this.$store.getters.getIsDarkMode
    }
  }
})
</script>

<style scoped>

.hambergur-menu{
    background-color: var(--primary-color);
    width:85%;
    height: 100%;
    position:fixed;
    left:0;
    top:0; 
    padding-top: 4px;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 48px;
    z-index: 9999;
    overflow-y: auto;
    scrollbar-width: none;
  }

  .hambergur-menu::-webkit-scrollbar{
    display: none;
  }

  .quit{
    display: flex;
    justify-content: right;
  }

  .quit-img{
    width: 20px;
    height: 26px;
  }

  .logo{
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 1rem;
  }

  .logo-img{
    width: 314px;
    height: 125px;
  }

  .app-link{
    margin-top: 0.75rem;
    background-color: var(--tertiary-color);
    font-size: 0.75rem;
    padding: 0.5rem 1.5rem;
    border-radius: 1rem;
    color:white;
    font-weight: bold;
    cursor: pointer;
  }

  .bar{
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .form-label{
    display: inline-block;
    text-indent: -9999px;
  }

  .search{
    width: 100%;
    padding: 0.25rem;
    font-size: 1rem;
  }

  .account{
    margin-top: 1.25rem;
    margin-bottom: 0.5rem;
  }

  .account h2{
    color: var(--tertiary-color);
    font-size: 1.125rem;
    font-weight: bold;
  }

  .account a{
    display: block;
    margin-top: 0.75rem;
    cursor: pointer;
    color: white;
    font-weight: bold;
  }

  .user{
    margin-left: 0.5rem;
  }

  .functions h2{
    color: var(--tertiary-color);
    font-size: 1.125rem;
    margin-top: 1.25rem;
    margin-bottom: 0.5rem;
  }

  .functions button{
    padding: 0.5rem 1.25rem;
    color:white;
    border-radius: 0.25rem;
  }

  .submit{
    background-color: var(--secondary-color);
  }

  .moderate{
    background-color: var(--accent-color);
    margin-left: 0.5rem;
  }

  .categories h2{
    margin-top: 1.25rem;
    margin-bottom: 0.5rem;
    color: var(--tertiary-color);
    font-size: 1.125rem;
  }

  .categories-list a{
    display: block;
    width: 100%;
    color:white;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
    border-bottom: 1px solid white;
    margin-bottom: 0.5rem;
  }
</style>