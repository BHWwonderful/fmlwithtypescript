<template>
  <div>
    <PcHeader 
      v-if="viewportWidth >= 768"
      :isAnonymous="isAnonymouse"
    />
    <MobileHeader v-if="viewportWidth <=768" />
    <main class="main" :class="{'dark-primary' : getIsDarkMode}">
      <div class="top-wrap">
        <div class="content">
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
                <button
                 @click="getFilteredAgreeDataByTime(filterStartOfDay, filterEndOfDay)"
                 :class="{ 'dark-primary' : getIsDarkMode, 'dark-border-white' : getIsDarkMode }"
                 >
                 THE TOP OF THE DAY
                </button>
              </div>
              <div class="time-filter">
                <button
                 @click="getFilteredAgreeDataByTime(filterStartOfWeek, filterEndOfWeek)"
                 :class="{ 'dark-primary' : getIsDarkMode, 'dark-border-white' : getIsDarkMode }"
                 >
                 THE TOP OF THE WEEk
                </button>
              </div>
              <div class="time-filter">
                <button
                 @click="getFilteredAgreeDataByTime(filterStartOfMonth, filterEndOfMonth)"
                 :class="{ 'dark-primary' : getIsDarkMode, 'dark-border-white' : getIsDarkMode }"
                 >
                 THE TOP OF THE MONTH
                </button>
              </div>
              <div class="time-filter">
                <button 
                @click="getFilteredAgreeDataByTime(filterStartOfYear, filterEndOfYear)"
                :class="{ 'dark-primary' : getIsDarkMode, 'dark-border-white' : getIsDarkMode }"
                >
                THE TOP OF THE YEAR
                </button>
              </div>
              <div class="all-time-filter">
                <a @click="getInitialFilteredData" class="all-time">THE ALL-TIME GREATEST FMLS</a>
              </div>
            </div>
          </section>
          <section v-if="isAnonymouse && AgreeData.length > 0">
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
        </div>
        <section class="banner" v-if="viewportWidth >= 1024">
            <KeywordFilter />
        </section>
      </div>
      <div class="blank"></div>
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
import KeywordFilter from '@/components/KeywordFilter.vue';

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
      KeywordFilter,
    },
    data(){

      const today = new Date();

      // 오늘 발생한 데이터를 필터링
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      // 이번 주에 발생한 데이터를 필터링
      const startOfWeek = new Date();
      startOfWeek.setDate(today.getDate() - today.getDay()); // 이번 주의 첫 번째 요일을 일요일로 설정
      startOfWeek.setHours(0, 0, 0, 0);

      const endOfWeek = new Date();
      endOfWeek.setDate(today.getDate() + (6 - today.getDay()));
      endOfWeek.setHours(23, 59, 59, 999);
      
      // 이번 달에 발생한 데이터를 필터링
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      startOfMonth.setHours(0, 0, 0, 0);

      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      endOfMonth.setHours(23, 59, 59, 999);

      // 이번 년도에 발생한 데이터를 필터링
      
      const startOfYear = new Date(today.getFullYear(), 0, 1);
      startOfYear.setHours(0, 0, 0, 0);

      const endOfYear = new Date(today.getFullYear(), 11, 31);
      endOfYear.setHours(23, 59, 59, 999);

      return {
        viewportWidth: window.innerWidth,
        topImg,
        voteImg,
        commentsImg,
        starBeigeImg,
        isAnonymouse: false,
        currentUserID: '',
        filterStartOfDay: startOfDay,
        filterEndOfDay: endOfDay,
        filterStartOfWeek: startOfWeek,
        filterEndOfWeek: endOfWeek,
        filterStartOfMonth: startOfMonth,
        filterEndOfMonth: endOfMonth,
        filterStartOfYear: startOfYear,
        filterEndOfYear: endOfYear,
      }
    },
    computed: {
      AgreeData(): AgreeItem[]{
        return this.$store.getters.getAgreeContent;
      },
      getIsDarkMode(){
          return this.$store.getters.getIsDarkMode
      },
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
      getFilteredAgreeDataByTime(startOfTime: Date, endOfTime: Date): void{
        this.$store.dispatch('fetchAgreeDataByTime', {startOfTime: startOfTime, endOfTime: endOfTime});
      },
    },

})
</script>

<style scoped>

  .top-wrap{
    display: flex;
    max-width: 1280px;
    margin: 0 auto;
  }

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

  .banner{
    position: relative;
    flex-grow: 1;
    min-width:350px;
    padding:8px;
  }

  .blank{
    height: 280px;
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
      justify-content: center;
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