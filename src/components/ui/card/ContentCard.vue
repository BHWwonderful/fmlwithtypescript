<template>
    <article v-if="contentData" class="content">
      <div class="content-header">
        <div class="title">
          <a>
            <h2>{{ contentData.title }}</h2>
          </a>
        </div>
        <div class="user">
          <span>By {{ contentData.username }}</span>
          -
          <span>{{ contentData.gender }}</span>
          <img />
        </div>
      </div>
      <div class="content-body">
        <p>{{ contentData.content }}</p>
      </div>
      <div class="content-footer">
        <a class="button">
          <span class="button-info agree" :class="{ clicked: isAgreeClicked }">I AGREE, YOUR LIFE SUCKS</span>
          <span class="score-info" >{{ contentData.agree }}</span>
        </a>
        <a class="button" >
          <span class="button-info disagree" :class="{ clicked: isDisagreeClicked }">You DESERVED IT</span>
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
  import type { PropType } from 'vue';
  import { ContentItem } from '@/store/modules/contentModule';

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
          type: Object as PropType<ContentItem>,
          required: true
        }
      },
      mounted(){
        console.log(this.contentData)
      },
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
      display: flex;
      justify-content: center;
      align-items: center;
      width:80%;
      background-color:var(--primary-color);
      padding:4px;
      font-weight: bold;
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
      width:70%;
      background-color:var(--primary-color);
      padding:4px 8px;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      text-align: center;
      font-weight: bold;
      font-size:14px;
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
  