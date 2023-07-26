<template>
    <article class="content">
      <div class="content-header">
        <div class="title">
          <a>
            <h2>{{ contentData.title }}</h2>
          </a>
        </div>
        <div class="user">
          <span>{{ contentData.username }}</span>
          <img />
          <span>- Date, id {{ contentData.id }}</span>
        </div>
      </div>
      <div class="content-body">
        <p>{{ contentData.content }}</p>
      </div>
      <div class="content-footer">
        <a @click="handleToggleAgree(contentData.id)" class="button">
          <span class="button-info agree" :class="{ clicked: isAgreeClicked }">인정해</span>
          <span class="score-info" >{{ contentData.agree }}</span>
        </a>
        <a @click="handleToggleDisagree(contentData.id)" class="button" >
          <span class="button-info disagree" :class="{ clicked: isDisagreeClicked }">인정 못 해</span>
          <span class="score-info">{{ contentData.disagree }}</span>
        </a>
      </div>
      <div class="buttons">
        <a>트위터</a>
        <a>페이스북</a>
      </div>
    </article>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';

  interface UserData {
    id: number;
    agree: number;
    disagree: number;
    title: string;
    username: string;
    content: string;
  }

  export default defineComponent({
      name: "RenderContent",
      data(){
        return{
          isAgreeClicked: false,
          isDisagreeClicked: false,
        }
      },
      props: {
        contentData: {
          type: Object as () => UserData,
          default: () => ({})
        }
      },
      methods: {
        handleToggleAgree(id: number): void {
          if (this.isDisagreeClicked){
            return;
          }
          if (this.isAgreeClicked) {
            this.decreaseAgree(id);
            this.isAgreeClicked = false;
          } else {
            this.increaseAgree(id);
            this.isAgreeClicked = true;
          }
        },
        handleToggleDisagree(id: number): void {
          if (this.isAgreeClicked){
            return;
          }
          if (this.isDisagreeClicked) {
            this.decreaseDisagree(id);
            this.isDisagreeClicked = false;
          } else {
            this.increaseDisagree(id);
            this.isDisagreeClicked = true;
          }
        },
        increaseAgree(id: number): void{
          this.$emit('increaseAgreePoint', id-1);
        },
        decreaseAgree(id: number): void{
          this.$emit('decreaseAgreePoint', id-1);
        },
        increaseDisagree(id: number): void{
          this.$emit('increaseDisagreePoint', id-1);
        },
        decreaseDisagree(id: number): void{
          this.$emit('decreaseDisagreePoint', id-1);
        }
      }
  })


  </script>
  
  <style scoped>



  @media screen and (max-width: 400px) {
    .content{
        padding:24px;
    }

    .content-header{
      margin-bottom:16px;
    }

    .content-body{
      margin-bottom:16px;
      color: var(--accent-color);
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
    }

    .button-info{
      width:80%;
      background-color:var(--primary-color);
      padding:4px;
    }

    .agree{
      background-color:var(--primary-color);
    }

    .disagree{
      background-color:var(--secondary-color);
    }

    .score-info{
      width:20%;
      background-color: var(--accent-color);
      text-align: center;
      padding:4px;
    }

    .title{
        color: var(--accent-color);
        border-bottom : 1px solid var(--accent-color);
    }

    .user{
      color:var(--primary-color);
    }
    .buttons{
      display: flex;
      justify-content: center;
    }
  }

  @media screen and (min-width: 400px) {
    .content{
        padding:24px;
        background-color:white;
        margin-top:16px;
        border-radius:20px;
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

    .content-footer{
      margin-bottom:16px;
      font-size:12px;
      display: flex;
      justify-content: space-between;
    }
    
    .button{
      display: flex;
      width:40%;
      color:white;
      cursor: pointer;
      line-height: 1.5rem;
    }

    .button-info{
      width:70%;
      background-color:var(--primary-color);
      padding:4px 8px;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }

    .score-info{
      display: flex;
      align-items: center;
      flex-grow:1;
      justify-content: center;
      background-color:var(--accent-color);
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }

    .agree{
      background-color:var(--primary-color);
    }

    .disagree{
      background-color:var(--secondary-color);
    }
  }

  .clicked{
  background-color:grey;
  }
    

    
  </style>
  