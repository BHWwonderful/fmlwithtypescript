<template>
  <div>
    <PcHeader 
      v-if="viewportWidth >= 768"
      :isAnonymous="isAnonymouse"
    />
    <MobileHeader v-if="viewportWidth <=768" />
    <main class="main">
      <section>
        <div class="img">
          <img class="top-img" :src="topImg" alt="top" />
        </div>
        <div class="filters">
          <div class="filter">
            <button class="agree">THE MOST AGREED ON FMLS</button>
            <div class="agree-button">
              <img :src="voteImg" alt="The most agreed on fmls" />
            </div>
          </div>
          <div class="filter">
            <button class="comment">THE MOST COMMENTED ON FMLS</button>
            <div class="comment-button">
              <img :src="commentsImg" alt="The most commented on fmls" />
            </div>
          </div>
          <div class="filter">
            <button class="favorite">THE MOST FAVORITED</button>
            <div class="favorite-button">
              <img :src="starBeigeImg" alt="The most favorited" />
            </div>
          </div>
        </div>
        <div class="time-filters">
          <div class="time-filter">
            <button>THE TOP OF THE DAY</button>
          </div>
          <div class="time-filter">
            <button>THE TOP OF THE WEEk</button>
          </div>
          <div class="time-filter">
            <button>THE TOP OF THE MONTH</button>
          </div>
          <div class="time-filter">
            <button>THE TOP OF THE YEAR</button>
          </div>
          <div class="all-time-filter">
            <a class="all-time">THE ALL-TIME GREATEST FMLS</a>
          </div>
        </div>
      </section>
      <section v-if="AgreeData.length > 0">
        <ContentCard
          v-for="data in AgreeData"
          :key="data.id"
          :contentID="data.contentID"
          :content="data.content"
          :date="data.date"
          :gender="data.gender"
          :title="data.title"
          :username="data.username"
          :viewportWidth="viewportWidth"
          :currentUserID="currentUserID"
        />
      </section>
    </main>
    <ResponsiveFooter />
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { onAuthStateChanged, getAuth } from 'firebase/auth';

// Components
import PcHeader from '@/components/semantics/PcHeader.vue';
import MobileHeader from "../components/semantics/MobileHeader.vue";
import ResponsiveFooter from '@/components/semantics/ResponsiveFooter.vue';
import ContentCard from '@/components/ui/card/ContentCard.vue';

// interfaces
import { AgreeItem } from '@/store/modules/contentModule';

// assets
import topImg from "../assets/images/top.png";
import voteImg from "../assets/images/vote.png";
import commentsImg from "../assets/images/comments.png";
import starBeigeImg from "../assets/images/star_beige.png";

const auth = getAuth();

export default defineComponent({
    name: "TopView",
    components:{
      PcHeader,
      MobileHeader,
      ResponsiveFooter,
      ContentCard,
    },
    data(){
      return {
        viewportWidth: window.innerWidth,
        topImg,
        voteImg,
        commentsImg,
        starBeigeImg,
        isAnonymouse: false,
        currentUserID: '',
      }
    },
    computed: {
      AgreeData(): AgreeItem[]{
        return this.$store.getters.getAgreeContent;
      }
    },
    mounted(){
      this.getInitialFilteredData();
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
      changeIsAnonymous(): void{
        this.isAnonymouse = true;
      },
      getInitialFilteredData(): void{
        this.$store.dispatch('fetchAgreeData');
      },
      changeCurrentUserID(id: string): void{
        this.currentUserID = id
      },
    },

})
</script>

<style scoped>
  .main{
    background-color:rgba(243, 246, 251, 1);
    padding-left:1rem;
    padding-right: 1rem;
  }

  .img{
    text-align: center;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .top-img{
    width: 206px;
    height: 192px;
  }

  @media screen and (max-width: 768px) {
    .filters{
      margin-bottom: 1rem;
    }

    .filter{
      display: flex;
      margin-bottom: 0.75rem;
    }

    .filter button{
      color: white;
      text-align: left;
      padding-left: 1rem;
      font-size: 1rem;
      font-weight: bold;
    }

    .filter div{
      display: flex;
      justify-content: center;
      align-items: center;
      width:40px;
      height:40px;
    }

    .filter div img{
      width:20px;
      height:20px;
    }

    .agree{
      background-color: var(--accent-color);
      flex-grow: 1;
    }

    .agree-button{
      background-color: rgba(255, 156, 185, 1);
    }

    .comment{
      background-color: var(--primary-color);
      flex-grow: 1;
    }

    .comment-button{
      background-color: var(--secondary-color);
    }

    .favorite{
      background-color: var(--primary-color);
      flex-grow: 1;
    }

    .favorite-button{
      background-color: var(--accent-color);
    }

    .time-filter{
      display: flex;
      justify-content: center;
      margin-bottom: 0.5rem;
    }

    .time-filter button{
      width: 100%;
      border: 1px solid var(--accent-color);
      color: var(--primary-color);
      padding-top: 0.25rem;
      padding-bottom: 0.25rem;
    }

    .all-time-filter{
      text-align: center;
    }

    .all-time{
      width:auto;
      display: block;
      margin: 0 auto;
      color: var(--secondary-color);
      cursor: pointer;
    }
  }

  @media screen and (min-width: 769px) {
    .filters{
      display: flex;
      margin-right: -1rem;
    }

    .filter{
      display: flex;
      height: 64px;
      margin-right: 1rem;
    }

    .filter div{
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .filter button{
      color: white;
      font-size: 1rem;
      font-weight: bold;
      text-align: left;
    }

    .filter div img{
      width:20px;
      height: 16px;
    }

    .agree{
      flex-grow: 1;
      background-color: var(--accent-color);
      padding: 0.5rem 1rem;
    }

    .agree-button{
      width: 38px;
      background-color: rgba(255, 156, 185, 1);
    }

    .comment{
      flex-grow: 1;
      background-color: var(--primary-color);
      padding: 0.5rem 1rem;
    }

    .comment-button{
      width:38px;
      background-color: rgba(255, 156, 185, 1);;
    }

    .favorite{
      flex-grow: 1;
      background-color: var(--primary-color);
      padding: 0.5rem 1rem;
    }

    .favorite-button{
      width:38px;
      background-color: var(--accent-color);
    }

    .time-filters{
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }

    .time-filter{
      margin: 0.5rem 0.75rem;
    }

    .time-filter button{
      font-size: 1rem;
      color:var(--primary-color);
    }

    .all-time-filter{
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0.5rem 0.75rem;
    }

    .all-time-filter a{
      font-size: 1rem;
      font-weight: bold;
      color: var(--secondary-color);
      cursor: pointer;
    }
  }
  

</style>