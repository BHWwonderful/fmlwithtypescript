<template>
    <header>
      <div class="information" :class="{ 'dark-primary' : getIsDarkMode}">
        <div class="content">
          <div class="logo">
            <img class="logo-img" :src="logoImg" alt="logo" />
            <img class="baseline-img" :src="baselineImg" alt="The best joke in life is life itself" />
          </div>
          <div class="user">
            <div class="buttons">
              <button @click="openSubmitDataModal" class="submit">Submit your FML</button>
              <div class="moderate" :class="{ 'dark-blue-primary' : getIsDarkMode}">
                <router-link to="/moderate">Moderate Your FML</router-link>
              </div>
            </div>
            <span v-if="!isAnonymous" class="login">Log in</span>
            <div v-if="isAnonymous" class="login">
              <span>Welcome!</span>
              <span>Guest</span>
            </div>
          </div>
        </div>
      </div>
      <div class="navigation" :class="{ 'dark-accent' : getIsDarkMode}">
        <div class="content">
          <nav class="links">
            <router-link to="/">ALL</router-link>
            <a @click="testNavigation">RANDOM</a>
            <a>SPICY</a>
            <a>RANDOM SPICY</a>
            <a>NEARLY FMLS</a>
            <router-link to="/top">The Top</router-link>
            <a>FML - THE FOLLOW-UP</a>
          </nav>
          <div class="search">
            <input type="text" placeholder="Search" :class="{ 'dark-secondary' : getIsDarkMode}"/>
          </div>
        </div>
      </div>
      <SubmitDataModal
        v-if="isSubmitClicked"
        @closeSubmitDataModal="closeSubmitDataModal"
      />
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// components
import SubmitDataModal from '../SubmitDataModal.vue';

// assets
import logoImg from "../../assets/images/logo.png";
import baselineImg from "../../assets/images/baseline.png"

export default defineComponent({
  name: "PcHeader",
  data(){
    return {
      isSubmitClicked: false,
      logoImg,
      baselineImg,
    }
  },
  props:{
    isAnonymous: Boolean,
  },
  methods:{
    goToHomePage():void{
      this.$router.push("/");
    },
    openSubmitDataModal(): void{
      this.isSubmitClicked = true;
    },
    closeSubmitDataModal(): void{
      this.isSubmitClicked = false;
    },
    testNavigation(): void{
      this.$router.push('/');
    }
  },
  components:{
    SubmitDataModal,
  },
  computed: {
    getIsDarkMode(){
        return this.$store.getters.getIsDarkMode
    }
  }
})
</script>

<style scoped>
.information{
  height:72px;
  background-color: rgba(0, 102, 174 ,1);
}

.logo{
  display: flex;
  align-items: center;
  color:white;
}

.logo-img{
  width: 118px;
  height: 48px;
}

.baseline-img{
  width: 260px;
  height: 48px;
}

.login{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-left:8px;
  padding-right:8px;
  cursor: pointer;
  white-space: nowrap;
}

.navigation{
  background-color: rgba(1, 66, 119, 1);
}

.content{
  max-width:1280px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left:1rem;
  padding-right:1rem;
  margin: 0 auto;
}

.links{
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

.user{
  display: flex;
  justify-content: space-between;
  color:white;
  width:60%;
  height:72px;
}

.buttons{
  width: 95%;
  display: flex;
  align-items: center;
}

.submit{
  font-size:0.875rem;
  background-color:pink;
  color:black;
  border-radius: 20px;
  padding:8px 24px;
  text-align: left;
  font-weight: bold;
}

.moderate{
  display: flex;
  justify-content: center;
  background-color: black;
  border-radius: 20px;
  align-items: center;
  padding:8px 24px;
  margin-left: 1rem;
  font-weight: bold;
}

.moderate a{
  font-size: 0.875rem;
  color:white;
}

.search{
  height: 40px;
}

.search input{
  margin-left: 0.5rem;
  height: 100%;
  font-size: 1rem;
  border:none;
  padding-left: 0.5rem;
}

@media screen and (min-width: 1024px) {
.submit{
  font-size:1.25rem;
  background-color:pink;
  color:black;
  border-radius: 20px;
  padding:8px 24px;
}

.moderate{
  display: flex;
  justify-content: center;
  align-items: center;
  padding:8px 24px;
}

.moderate a{
  font-size: 1.25rem;
  color:white;
}
}
</style>