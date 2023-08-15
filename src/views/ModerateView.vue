<template>
  <div>
    <PcHeader 
      v-if="viewportWidth >= 768"
      :isAnonymous="isAnonymous"
     />
    <MobileHeader v-if="viewportWidth < 768" />
  </div>
  <main class="main">
    <div v-if="awaitData.length > 0">
      <ContentCard
        :content="awaitData[0].content"
        :date="awaitData[0].date"
        :gender="awaitData[0].gender"
        :title="awaitData[0].title"
        :username="awaitData[0].username"
      />
    </div>
    <div class="user-choose">
      <div class="choose">
        <p class="question">Did this story make you laugh?</p>
        <p class="question">Is this really an FML that should to be published?</p>
        <p class="decide">It's up to you to decide</p>
      </div>
      <div class="buttons">
        <a @click="addAwaitContentToContent" class="yes">Yes</a>
        <a @click="deleteAwaitContent" class="no">NO</a>
      </div>
    </div>
    <div class="blank"></div>
  </main>
  
  <ResponsiveFooter />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import db from '@/firebaseConfig';
import { collection, addDoc, doc, deleteDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// components
import MobileHeader from '@/components/semantics/MobileHeader.vue';
import PcHeader from '@/components/semantics/PcHeader.vue';
import ContentCard from '@/components/ui/card/ContentCard.vue';
import ResponsiveFooter from '@/components/semantics/ResponsiveFooter.vue';

// Interface
import { AwaitItem } from '@/store/modules/contentModule';

const auth = getAuth();

export default defineComponent({
  name: "ModerateView",
  components:{
    MobileHeader,
    PcHeader,
    ContentCard,
    ResponsiveFooter,
  },
  data(){
    return {
      viewportWidth: window.innerWidth,
      isAnonymous: false,
      currentUserID: "",
    }
  },
  computed: {
    awaitData(): AwaitItem[]{
      return this.$store.getters.getAwaitContent;
    }
  },
  mounted(){
    try{
      this.$store.dispatch('fetchAwaitData');
    } catch(error){
      console.log("Error :", error)
    }
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
    handleResize() {
      this.viewportWidth = window.innerWidth;
    },
    async deleteAwaitContent(): Promise<void>{
      const awaitDoc = doc(db, 'await', this.awaitData[0].id);
      try{
        const deleteAwaitData = await deleteDoc(awaitDoc);
        this.$router.go(0);
      } catch(error){
        console.log(error);
      }
    },  
    async addAwaitContentToContent(): Promise<void>{
      const contentCollectionRef = collection(db, 'content');
      try{
        const addAwaitDataToContent = await addDoc(contentCollectionRef, {
          content: this.awaitData[0].content,
          date: this.awaitData[0].date,
          gender: this.awaitData[0].gender,
          title: this.awaitData[0].title,
          username: this.awaitData[0].username,
        })
        this.$router.go(0);
      } catch(error){
        console.log(error);
      }
    },
    changeIsAnonymous(): void{
      this.isAnonymous = true;
    },
    changeCurrentUserID(id: string): void{
      this.currentUserID = id;
    }
  },
})
</script>

<style scoped>
  .choose{
    margin-top: 1rem;
  }

  .main{
    padding: 1rem;
    background-color: rgba(243, 246, 251, 1);
  }

  .user-choose{
    margin-top: 4rem;
    margin-bottom: 4rem;
  }

  .choose p{
    text-align: center;
  }

  .question{
    color:var(--accent-color);
    font-size: 1.875rem;
    font-weight: bold;
  }

  .decide{
    color: rgba(255, 156, 185, 1);
    font-size: 1.875rem;
    font-weight: bold;
  }

  .buttons{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1.5rem;
  }

  .buttons a{
    padding: 0.5rem 1rem;
    font-size: 1.875rem;
    border-radius: 0.5rem;
    color:white;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    cursor: pointer;
  }

  .yes{
    background-color: var(--accent-color);
  }

  .no{
    background-color: var(--secondary-color);
  }

  .blank{
    height: 280px;
  }
</style>