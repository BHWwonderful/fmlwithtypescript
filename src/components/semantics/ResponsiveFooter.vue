<template>
  <footer class="footer">
    <div class="sns" v-if="!getIsDarkMode">
      <h2 class="sns-text">WE LOVE
        <img :src="heartPinkImg" alt="heart" />
        NEW FRIENDS!
      </h2>
      <div class="sns-images">
        <a>
          <img :src="instaPinkImg" alt="instagram" />
        </a>
        <a>
          <img :src="facebookPinkImg" alt="facebook">
        </a>
        <a>
          <img :src="twitterPinkImg" alt="twitter">
        </a>
      </div>
    </div>
    <div class="app-download" :class="{ 'dark-primary' : getIsDarkMode}">
      <a>
        <img class="app-download-img" src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-en?size=250x83&releaseDate=1355702400&h=1f320a1ac91daae3112a26016861dc6b" alt="Download on the App Store" />
      </a>
      <a>
        <img class="app-download-img" src="https://www.fmylife.com/images/v2/google-play-badge-en-en.png" alt="Get it on Google Play">
      </a>
    </div>
    <div class="links" :class="{ 'dark-accent' : getIsDarkMode}">
      <div class="link-container">
        <div class="link">
          <h3 class="link-title" :class="{ 'dark-secondary' : getIsDarkMode}">EVEN MORE FMLS</h3>
          <ul>
            <li>
              <a>Nearly FMLs</a>
            </li>
            <li>
              <a>FML - The Follow -Up</a>
            </li>
          </ul>
        </div>
        <div class="link center-link">
          <h3 class="link-title" :class="{ 'dark-secondary' : getIsDarkMode}">USEFUL LINKS</h3>
          <ul>
            <li>
              <a>FAQ</a>
            </li>
            <li>
              <a>Contact us</a>
            </li>
            <li>
              <a>Terms of use</a>
            </li>
            <li>
              <a>The list of badges to find</a>
            </li>
          </ul>
        </div>
        <div class="link">
          <h3 class="link-title" :class="{ 'dark-secondary' : getIsDarkMode}">FML AROUND THE WORLD</h3>
          <ul>
            <li>
              <a>Francais</a>
            </li>
            <li>
              <a>English</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="dark-mode">
        <button @click="toggleIsDarkMode" class="dark-mode-botton">
          <img v-if="!getIsDarkMode" :src="moonWhiteImg" alt="Turn on dark mode" />
          <img v-if="getIsDarkMode" :src="sunWhiteImg" alt="Turn off dark mode" />
          Toggle Dark Mode
        </button>
      </div>
    </div>
    <div class="copyright" :class="{ 'dark-primary' : getIsDarkMode}">
      <p>© VDM SAS, All rights reserved</p>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// assets
import heartPinkImg from "../../assets/images/heartPink.png";
import instaPinkImg from "../../assets/images/instaPink.png";
import facebookPinkImg from "../../assets/images/facebookPink.png";
import twitterPinkImg from "../../assets/images/twitterPink.png";
import moonWhiteImg from "../../assets/images/moonWhite.svg";
import sunWhiteImg from "../../assets/images/sunWhite.svg";

export default defineComponent({
  name: "ResponsiveFooter",
  data(){
    return{
      viewportWidth: "",
      heartPinkImg,
      instaPinkImg,
      facebookPinkImg,
      twitterPinkImg,
      moonWhiteImg,
      sunWhiteImg,
    }
  },
  methods:{
    toggleIsDarkMode(): void{
      this.$store.commit("toggleIsDarkMode")
    }
  },
  computed:{
    getIsDarkMode(){
      return this.$store.getters.getIsDarkMode
    }
  }
})
</script>

<style scoped>
@media screen and (max-width: 768px) {
  .footer{
    position:relative;
  }

  .sns{
    padding-top:3rem;
    padding-bottom:3rem;
    background-color: rgba(0, 68, 47, 1);
  }

  .sns-text{
    font-size: 2.25rem;
    text-align: center;
    color:white;
  }

  .sns-text img{
    width: 28px;
    height: 24px;
  }

  .sns-images{
    text-align: center;
    margin-top: 1rem;
  }

  .sns-images a{
    cursor: pointer;
    margin-left: 0.75rem;
    margin-right: 0.75rem;
  }

  .sns-images img{
    width: 40px;
    height: 40px;
  }

  .app-download{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
    text-align: center;
    background-color: var(--accent-color);
  }

  .app-download a{
    width: 250px;
    margin: 0.5rem;
    cursor: pointer;
  }

  .app-download-img{
    width: 250px;
    height: 84px;
  }

  .links{
    background-color: var(--primary-color);
    color: white;
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
  }

  .link{
    padding-right: 2.5rem;
    padding-left: 2.5rem;
  }

  .link-title{
    font-size: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  .link a{
    display: block;
    margin-bottom: 4px;
    font-size: 0.875rem;
    cursor: pointer;
  }

  .center-link{
    border-right: 1px dotted white;
    border-left: 1px dotted white;
  }
  .dark-mode{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1.5rem;
  }

  .dark-mode-botton{
    display: flex;
    align-items: center;
    color: white;
    font-size: 1rem;
    padding:0.5rem;
  }

  .dark-mode-botton img{
    margin-right: 0.5rem;
  }

  .copyright{
    padding-top: 1rem;
    padding-bottom: 1rem;
    text-align: center;
    color:white;
    background-color: var(--accent-color);
  }
}

@media screen and (min-width: 768px) {
  .footer{
    position:relative;
  }

  .sns{
    padding-top:3rem;
    padding-bottom:3rem;
    background-color: rgba(0, 68, 47, 1);
  }

  .sns-text{
    font-size: 2.25rem;
    text-align: center;
    color:white;
  }

  .sns-text img{
    width: 28px;
    height: 24px;
  }

  .sns-images{
    text-align: center;
    margin-top: 1rem;
  }

  .sns-images a{
    cursor: pointer;
    margin-left: 0.75rem;
    margin-right: 0.75rem;
  }

  .sns-images img{
    width: 40px;
    height: 40px;
  }

  .app-download{
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
    text-align: center;
    background-color: var(--accent-color);
  }

  .app-download-img{
    width: 250px;
    height: 84px;
    margin-right: 2.5rem;
  }

  .links{
    background-color: var(--primary-color);
    color: white;
    padding-top: 3rem;
    padding-bottom: 1.25rem;
  }

  .link-container{
    display: flex;
    justify-content: center;
  }

  .link{
    padding-right: 2.5rem;
    padding-left: 2.5rem;
  }

  .link-title{
    font-size: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding: 0.25rem;
    border-radius: 0.25rem;
    text-align: left;
  }
  .link a{
    display: block;
    margin-bottom: 4px;
    font-size: 0.875rem;
    cursor: pointer;
  }

  .center-link{
    border-right: 1px dotted white;
    border-left: 1px dotted white;
  }
  .dark-mode{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1.5rem;
  }

  .dark-mode-botton{
    display: flex;
    align-items: center;
    color: white;
    font-size: 1rem;
  }

  .dark-mode-botton img{
    margin-right: 0.5rem;
  }

  .copyright{
    padding-top: 1rem;
    padding-bottom: 1rem;
    text-align: center;
    color:white;
    background-color: var(--accent-color);
  }
}
</style>