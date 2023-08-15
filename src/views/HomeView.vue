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
      <section v-if="isAnonymous && contentData.length > 0" class="content">
        <ContentCard 
          v-for="data in contentData"
          :key="data.id"
          :contentID="data.id"
          :title="data.title"
          :username="data.username"
          :content="data.content"
          :gender="data.gender"
          :date="data.date"
          :currentUserID="currentUserID"
          :viewportWidth="viewportWidth"
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
import KeywordFilter from '@/components/KeywordFilter.vue';
import ResponsiveFooter from '@/components/semantics/ResponsiveFooter.vue';
import ContentCard from '@/components/ui/card/ContentCard.vue';

// interfaces
import { ContentItem } from '@/store/modules/contentModule';

// hooks
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";

const auth = getAuth();

export default defineComponent({
    name: "HomeView",
    components: {
      MobileHeader,
      PcHeader,
      KeywordFilter,
      ResponsiveFooter,
      ContentCard,
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
      background-color:rgba(243, 246, 251, 1);
      padding: 1rem;
    }
  }

  @media screen and (min-width: 1024px) {

  .content-wrap{
    background-color:rgba(243, 246, 251, 1);
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