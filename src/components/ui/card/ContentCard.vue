<template>
    <article class="content">
      <div class="content-header">
        <div class="title">
          <a>
            <h2>제목입니다.</h2>
          </a>
        </div>
        <div class="user">
          <span>By UserName</span>
          <img />
          <span>- Date</span>
        </div>
      </div>
      <div class="content-body">
        <p>Fill in the content</p>
      </div>
      <div class="content-footer">
        <a class="button">
          <span class="button-info agree">인정해</span>
          <span class="score-info">score</span>
        </a>
        <a class="button">
          <span class="button-info disagree">인정 못 해</span>
          <span class="score-info">score</span>
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
  export default defineComponent({
      name: "RenderContent",
      data(){
          return{
  
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
      background-color:var(--primary-color);
      color:white;
      cursor: pointer;
    }

    .button-info{
      width:70%;
      background-color:var(--primary-color);
      padding:4px;
    }

    .score-info{
      display: flex;
      align-items: center;
      flex-grow:1;
      justify-content: center;
      background-color:var(--accent-color)
    }

    .agree{
      background-color:var(--primary-color);
    }

    .disagree{
      background-color:var(--secondary-color);
    }
  }
    

    
  </style>
  