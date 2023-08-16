<template>
    <article class="content" :class="{ 'dark-accent': getIsDarkMode }">
      <div class="content-header">
        <div class="title" :class="{'dark-border-white' : getIsDarkMode}">
          <a>
            <h2 :class="{ 'dark-accent': getIsDarkMode}">{{ title }}</h2>
          </a>
        </div>
        <div class="user" :class="{ 'dark-accent': getIsDarkMode}">
          <span>By {{ username }}</span>
          <img class="profileImg" v-if="gender === 'male' && !getIsDarkMode " :src="manImg" alt="man" />
          <img class="profileImg" v-if="gender === 'male' && getIsDarkMode === true" :src="manWhiteImg" alt="man" />
          <img class="profileImg" v-if="gender === 'female' && !getIsDarkMode" :src="womanImg" alt="woman" />
          <img class="profileImg" v-if="gender === 'female' && getIsDarkMode === true" :src="womanWhiteImg" alt="woman" />
          <img class="profileImg" v-if="gender !== 'male' && gender !== 'female'" :src="manImg" alt="anonymous" />
          <span class="date-bar">- </span>
          <span>{{ getYearFromDate }}/{{ getMonthFromDate }}/{{ getDateFromDate }}</span>
          <img />
        </div>
      </div>
      <div class="content-body">
        <p :class="{ 'dark-accent': getIsDarkMode }">{{ content }}</p>
      </div>
      <div v-if="currentPath !== '/moderate'" class="content-footer">
        <a @click="toggleIsAgreeClicked" class="button">
          <span class="button-info agree" :class="{ clicked: isAgreeClicked, 'dark-blue-accent': getIsDarkMode }">I AGREE, YOUR LIFE SUCKS</span>
          <span class="score-info" :class="{ 'dark-primary': getIsDarkMode }">{{ agreeCount }}</span>
        </a>
        <a @click="toggleIsDisagreeClicked" class="button" >
          <span class="button-info disagree" :class="{ clicked: isDisagreeClicked, 'dark-blue-primary' : getIsDarkMode }">YOU DESERVED IT</span>
          <span class="score-info" :class="{ 'dark-primary': getIsDarkMode }">{{ disagreeCount }}</span>
        </a>
      </div>
      <div v-if="viewportWidth < 768" class="buttons">
        <a>Share</a>
      </div>
      <div v-if="viewportWidth > 768" class="sns">
        <a class="snsButton twitter" :class="{ 'dark-secondary': getIsDarkMode }">
          <img :src="twitterWhiteImg" alt="twitter" />
          <span>twitter</span>
        </a>
        <a class="snsButton facebook" :class="{ 'dark-primary': getIsDarkMode }">
          <img :src="facebookWhiteImg" alt="facebook" />
          <span>facebook</span>
        </a>
      </div>
    </article>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import db from '@/firebaseConfig';
  import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';

  // assets
  import twitterWhiteImg from "../../../assets/images/twitterWhite.svg";
  import facebookWhiteImg from "../../../assets/images/facebookWhite.svg";
  import manImg from "../../../assets/images/man.svg";
  import womanImg from "../../../assets/images/woman.svg";
  import manWhiteImg from "../../../assets/images/manWhite.svg";
  import womanWhiteImg from "../../../assets/images/womanWhite.svg";

  interface AgreeDisagree {
    contentID : string,
    userID: string,
  }

  export default defineComponent({
      name: "RenderContent",
      data(){
        return{
          isAgreeClicked: false,
          isDisagreeClicked: false,
          agreeCount: 0,
          disagreeCount: 0,
          twitterWhiteImg,
          facebookWhiteImg,
          manImg,
          womanImg,
          manWhiteImg,
          womanWhiteImg,
          currentPath: "",
        }
      },
      computed: {
        getYearFromDate(){
          return this.date.toDate().getFullYear();
        },
        getMonthFromDate(){
          return this.date.toDate().getMonth() + 1;
        },
        getDateFromDate(){
          return this.date.toDate().getDate();
        },
        getIsDarkMode(){
          return this.$store.getters.getIsDarkMode
        }
      },
      props: {
        content: String,
        contentID: String,
        date: {
          type: null as any
        },
        gender: String,
        title: String,
        username: String,
        viewportWidth: Number,
        currentUserID: String,
      },
      mounted(){
        this.getInitialAgreeData();
        this.getInitialDisagreeData();
      },
      created(){
        this.currentPath = this.$route.path;
      },
      methods:{
        async toggleIsAgreeClicked(): Promise<any>{
          if(this.isDisagreeClicked){
            return ;
          }

          if(!this.isAgreeClicked){
            try{
              const agreeCollectionRef = collection(db, 'agree');
              const addAgreeData = await addDoc(agreeCollectionRef, {
                contentID: this.contentID,
                userID: this.currentUserID,
                content: this.content,
                date: this.date,
                gender: this.gender,
                title: this.title,
                username: this.username,
              });
              await this.getAgreeCount();
              this.isAgreeClicked = true;
            } catch(error){
              console.log(error);
            }            
          } else{
            try{
              const q = query(collection(db, 'agree'), where('userID', "==", this.currentUserID), where('contentID', '==', this.contentID));
              const querySnapshot = await getDocs(q);
              if(!querySnapshot.empty){
                const agreeDataFromFirebase = querySnapshot.docs.map((doc) => ({
                  id: doc.id,
                }))
                const agreeDataID = agreeDataFromFirebase[0].id;
                const agreeDoc = doc(db, 'agree', agreeDataID);
                const deleteAgreeData = await deleteDoc(agreeDoc);
                await this.getAgreeCount();
                this.isAgreeClicked = false;
              } else{
                return ;
              }
            } catch(error){
              console.log(error);
            }
          }
          
        },
        async toggleIsDisagreeClicked(): Promise<void>{
          if(this.isAgreeClicked){
            return ;
          }

          if(!this.isDisagreeClicked){
            try{
              const disagreeCollectionRef = collection(db, 'disagree');
              const addDisagreeData = await addDoc(disagreeCollectionRef, {
                contentID: this.contentID,
                userID: this.currentUserID,
              });
              await this.getDisagreeCount();
              this.isDisagreeClicked = true;
            } catch(error){
              console.log(error);
            }

          } else{
            try{
              const q = query(collection(db, 'disagree'), where('userID', "==", this.currentUserID), where('contentID', '==', this.contentID));
              const querySnapshot = await getDocs(q);
              if(!querySnapshot.empty){
                const disagreeDataFromFirebase = querySnapshot.docs.map((doc) => ({
                  id: doc.id,
                }))
                const disagreeDataID = disagreeDataFromFirebase[0].id;
                const disagreeDoc = doc(db, 'disagree', disagreeDataID);
                const deleteDisagreeData = await deleteDoc(disagreeDoc);
                await this.getDisagreeCount();
                this.isDisagreeClicked = false;
              }
            } catch(error){
              console.log(error);
            }
            
          }
        },
        async getAgreeCount(): Promise<any>{
          const agreeCountQuery = query(collection(db, 'agree'), where("contentID", "==", this.contentID));
          try{
            const agreeCountQuerySnapshot = await getDocs(agreeCountQuery);
            this.changeAgreeCount(agreeCountQuerySnapshot.size);
            return ;
          } catch(error){
            console.log(error);
          }
        },
        async getDisagreeCount(): Promise<void>{
          const disagreeCountQuery = query(collection(db, 'disagree'), where("contentID", "==", this.contentID));
          try{
            const disagreeCountQuerySnapshot = await getDocs(disagreeCountQuery);
            this.changeDisagreeCount(disagreeCountQuerySnapshot.size);
            return ;
          } catch(error){
            console.log(error);
          }
        },
        async getInitialAgreeData(): Promise<void>{
          try{
            const q = query(collection(db, 'agree'), where('userID', "==", this.currentUserID), where('contentID', '==', this.contentID));
            const querySnapshot = await getDocs(q);
            if(!querySnapshot.empty){
              this.isAgreeClicked = true;
              await this.getAgreeCount();
            } else{
              await this.getAgreeCount(); 
            }
          } catch(error){
            console.log(error);
          }
        },
        async getInitialDisagreeData(): Promise<void>{
          try{
            const q = query(collection(db, 'disagree'), where('userID', "==", this.currentUserID), where('contentID', '==', this.contentID));
            const querySnapshot = await getDocs(q);
            if(!querySnapshot.empty){
              this.isDisagreeClicked = true;
              await this.getDisagreeCount(); 
            } else{
              await this.getDisagreeCount();
            }
          } catch(error){
            console.log(error);
          }
        },
        changeAgreeCount(count: number): void{
          this.agreeCount = count
        },
        changeDisagreeCount(count: number): void{
          this.disagreeCount = count
        }
      }
  })
  </script>
  
  <style scoped>

  .clicked{
    background-color: rgba(124, 123, 114, 1) !important;
  }

  @media screen and (max-width: 768px) {
    .content{
      padding:24px;
      background-color:white;
      margin-top:16px;
      border-radius:0.25rem;
    }

    .content-header{
      margin-bottom:16px;
    }

    .content-body{
      margin-bottom:20px;
      color: var(--accent-color);
    }

    .content-body p{
      word-wrap: break-word;
    }

    .content-footer{
      margin-bottom:16px;
      font-size:12px;
    }

    .button{
      display: flex;
      justify-content: space-between;
      color:white;
      cursor: pointer;
      line-height: 1.25rem;
    }

    .button-info{
      display: flex;
      align-items: center;
      width:80%;
      background-color:var(--primary-color);
      padding:4px;
      font-weight: bold;
      padding-top: 12px;
      padding-left: 16px;
      padding-bottom: 12px;
      border-top-left-radius: 0.25rem;
      border-bottom-left-radius: 0.25rem;
    }

    .agree{
      background-color:var(--primary-color);
      margin-bottom: 1rem;
    }

    .disagree{
      background-color:var(--secondary-color);
    }

    .score-info{
      width:20%;
      height:100%;
      background-color: var(--accent-color);
      text-align: center;
      padding:4px;
      line-height: 1.25rem;
      padding-top: 12px;
      padding-bottom: 12px;
      border-top-right-radius: 0.25rem;
      border-bottom-right-radius: 0.25rem;
      font-weight: bold;
    }

    .title{
      color: var(--accent-color);
      padding-bottom: 0.25rem;
      border-bottom : 1px solid var(--accent-color);
    }

    .user{
      display: flex;
      color:var(--primary-color);
      margin-top: 0.5rem;
    }

    .date-bar{
      margin-right: 0.5rem;
    }

    .profileImg{
      margin-left:0.5rem;
      margin-right:0.5rem;
    }
    .buttons{
      display: flex;
      justify-content: space-between;
    }

    .buttons a{
      width:100%;
      text-align: center;
      line-height: 1.25rem;
      font-size: 12px;
      padding: 8px 16px;
      color: white;
      font-weight: bold;
      border-radius: 0.25rem;
      background-color: var(--secondary-color);
      cursor: pointer;
    }
  }

  @media screen and (min-width: 769px) {
    .content{
        padding:24px;
        background-color:white;
        margin-top:16px;
        border-radius:0.25rem;
    }

    .profileImg{
      margin-left:0.5rem;
      margin-right:0.5rem;
    }

    .content-header{
      margin-bottom:16px;
    }

    .content-header{
      margin-bottom:16px;
    }

    .content-body{
      margin-bottom:16px;
      color: var(--accent-color);
    }

    .content-body p{
      color: var(--accent-color);
    }

    .content-footer{
      margin-bottom:16px;
      font-size:12px;
      display: flex;
      justify-content: space-between;
    }
    
    .button{
      display: flex;
      width:45%;
      color:white;
      cursor: pointer;
      line-height: 1.5rem;
      font-size:1rem;
    }

    .button-info{
      display: flex;
      justify-content: center;
      align-items: center;
      width:80%;
      background-color:var(--primary-color);
      padding:12px 16px;
      border-top-left-radius: 0.25rem;
      border-bottom-left-radius: 0.25rem;
      text-align: center;
      font-weight: bold;
      font-size: 14px;
    }

    .score-info{
      display: flex;
      align-items: center;
      flex-grow:1;
      justify-content: center;
      background-color:var(--accent-color);
      border-top-right-radius: 0.25rem;
      border-bottom-right-radius: 0.25rem;
    }

    .title{
      color: var(--accent-color);
      border-bottom: 1px solid var(--accent-color);
      padding-bottom: 0.25rem;
    }

    .user{
      display: flex;
      margin-top: 0.5rem;
    }

    .date-bar{
      margin-right: 0.5rem;
    }

    .agree{
      background-color:var(--primary-color);
    }

    .disagree{
      background-color:var(--secondary-color);
    }

    .buttons{
      display: flex;
      justify-content: space-between;
    }

    .buttons a{
      border: 1px solid grey;
      padding: 8px 16px;
      border-radius: 10px;
      cursor: pointer;
    }

    .sns{
      display: flex;
    }

    .snsButton{
      display: flex;
      font-size: 14px;
      padding: 12px 16px;
      color:white;
      border-radius: 0.25rem;
      font-weight: bold;
      cursor: pointer;
    }

    .snsButton span{
      margin-left: 4px;
    }

    .twitter{
      background-color: var(--primary-color);
    }

    .facebook{
      background-color: var(--accent-color);
      margin-left: 0.5rem;
    }
  }

  .clicked{
  background-color:grey;
  }
    

    
  </style>
  