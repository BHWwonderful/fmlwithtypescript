<template>
  <div class="wrap">
    <PcHeader
     v-if="viewportWidth >= 768"
     :isAnonymous="isAnonymous"
    />
    <MobileHeader v-if="viewportWidth < 768" />
  </div>
  <div class="content-wrap">
    <div class="container">
      <section class="content">
        <RenderContent 
          v-if="contentData && isAnonymous" 
          :viewportWidth="viewportWidth"
          :currentUserID="currentUserID"
        />
      </section>
      <section class="banner" v-if="viewportWidth >= 1024">
        <KeywordFilter/>
      </section>
    </div>
    <div class="blank">

    </div>
  </div>
  <ResponsiveFooter />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// components
import PcHeader from '@/components/semantics/PcHeader.vue';
import MobileHeader from "../components/semantics/MobileHeader.vue";
import RenderContent from '@/components/RenderContent.vue';
import KeywordFilter from '@/components/KeywordFilter.vue';
import { ContentItem } from '@/store/modules/contentModule';
import ResponsiveFooter from '@/components/semantics/ResponsiveFooter.vue';
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";

const auth = getAuth();

export default defineComponent({
    name: "HomeView",
    components: {
      MobileHeader,
      PcHeader,
      RenderContent,
      KeywordFilter,
      ResponsiveFooter,
    },
    data(){
      return {
        viewportWidth: window.innerWidth,
        isAnonymous: false,
        currentUserID: '',
      }
    },
    computed: {
      contentData(): ContentItem[]{
        return this.$store.getters.getTotalContent;
      }
    },
    mounted(){
      this.getContentDataFromStore();
      this.userSignInAnonymousely();
    },
    created(){
      window.addEventListener("resize", this.handleResize);

      onAuthStateChanged(auth, (user) => {
        if(user){
          this.changeCurrentUserID(user.uid);
          this.changeIsAnonymous();
        } else{
          console.log("Nothing!")
        }
      })
    },
    methods: {
      handleResize(): void{
        this.viewportWidth = window.innerWidth;
      },
      async userSignInAnonymousely(): Promise<void> {
        try{
          const currentUser =  await signInAnonymously(auth);
        } catch(error){
          console.log(error);
        }
      },
      getContentDataFromStore(): void{
        try{
          this.$store.dispatch('fetchData');
        } catch(error){
          console.log(error)
        }
      },
      changeIsAnonymous(): void{
        this.isAnonymous = true;
      },
      changeCurrentUserID(userID: string): void{
        this.currentUserID = userID;
      },
    },
})
</script>

<style scoped>

  .blank{
    height: 280px;
  }

  @media screen and (max-width: 1024px) {
    .content-wrap{
      background-color:rgba(234, 234, 234, 1);
      padding: 1rem;
    }
  }

  @media screen and (min-width: 1024px) {

  .content-wrap{
    background-color:rgba(234, 234, 234, 1);
  }

  .container{
  display: flex;
  margin: 0 auto;
  max-width:1280px;
  padding-left:8px;
  
  }
  .content{
    flex-grow:2;
  }

  .banner{
    position: relative;
    flex-grow: 1;
    min-width:350px;
    padding:8px;
  }
}
  
</style>