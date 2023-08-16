<template>
  <div>
    <header>
    <div class="information" :class="{ 'dark-primary' : getIsDarkMode}">
        <div class="hamburger">
          <img @click="changeIsHamburgerClicked" :src="hamburgerImg" />
        </div>
        <div class="title">
          <img class="logo-img" :src="logoImg" alt="FML" />
          <img class="baseline-img" :src="baselineImg" alt="The best joke in life is life itself" />
        </div>
    </div>
    <div class="navigation" :class="{ 'dark-accent' : getIsDarkMode }">
      <nav class="links">
        <router-link to="/">ALL</router-link>
        <a>RANDOM</a>
        <a>SPICY</a>
        <a>RANDOM SPICY</a>
        <a>NEARLY FMLS</a>
        <router-link to="/top">THE TOP</router-link>
        <a>FML - THE FOLLOW-UP</a>
      </nav>
    </div>
    <HambergurMenu
      v-if="isHamburgerClicked"
      @resetIsHamburgerClicked = "resetIsHamburgerClicked"
      @changeIsSubmitClicked = "changeIsSubmitClicked"
      @resetIsSubmitClicked = "resetIsSubmitClicked"
    />
    </header>
    <SubmitDataModal
      v-if="isSubmitClicked"
      @closeSubmitDataModal="closeSubmitDataModal"
    />
  </div>
  
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// assets
import hamburgerImg from "../../assets/images/hamburger.svg";
import logoImg from "../../assets/images/logo.png";
import baselineImg from "../../assets/images/baseline.png";

// Components
import HambergurMenu from '../HamburgerMenu.vue';
import SubmitDataModal from '../SubmitDataModal.vue';

export default defineComponent({
    name: "MobileHeader",
    data() {
      return {
        hamburgerImg,
        logoImg,
        baselineImg,
        isHamburgerClicked: false,
        isSubmitClicked: false,
      }
    },
    computed:{
      getIsDarkMode(){
          return this.$store.getters.getIsDarkMode
      }
    },
    components:{
      HambergurMenu,
      SubmitDataModal
    },
    methods: {
      changeIsHamburgerClicked(): void{
        this.isHamburgerClicked = true;
      },
      resetIsHamburgerClicked(): void{
        this.isHamburgerClicked = false;
      },
      changeIsSubmitClicked(): void{
        this.isSubmitClicked = true;
      },
      closeSubmitDataModal(): void{
        this.isSubmitClicked = false;
      },
    }
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
      display: flex;
      justify-content: center;
      position:absolute;
      left:50%;
      top:50%;
      transform: translate(-50%, -50%);
      color: white;
      font-weight: bold;
    }

    .logo-img{
      width: 78px;
      height: 32px;
    }

    .baseline-img{
      width: 174px;
      height: 32px;
    }

    .title h1{
      font-size: 2.0rem;
    }

</style>