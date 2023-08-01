<template>
  <div class="wrap">
    <div class="content">
      <div class="title">
          <h2>SUBMIT YOUR FML</h2>
      </div>
      <div class="info">
          <div class="info-content">
            <div class="info-title">
                <h3>Have you just experienced an FML moment?</h3>
            </div>
            <div class="info-text">
                <p>
                  Feel like sharing it with the other FML users?<br/>
                  Your instinct was right, because it's good to laugh life off<br/>
                  Follow the instructions below, and if your story gets through the moderation process, it'll published in the next 24 hours or so
                </p>
            </div>
          </div>
          <hr class="line" />
          <form @submit="handleSubmit" class="form">
            <div class="name-gender-wrapper">
                <div>
                  <label>Your name</label>
                  <input class="name" type="text" placeholder="Your name" />
                </div>
                <div>
                  <label>Gender</label>
                    <select class="gender">
                      <option>Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                </div>
            </div>
            <div class="email-wrapper">
                <label>Your email</label>
                <input class="email" type="email" placeholder="Your email"/>
            </div>
            <div class="story-wrapper">
                <textarea class="story" name="" id="" cols="30" rows="10" placeholder="Today... FML"></textarea>
                <p>Remaining characters: 320</p>
            </div>
            <div class="anonymous-wrapper">
                <label>
                  <input type="checkbox" name="anonymous" />
                  Make me anonymous
                </label>
            </div>
            <div class="submit-wrapper">
                <button @click="toggleIsSubmit" class="submit">SUBMIT</button>
            </div>
          </form>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name:"SubmitDataModal",
    data(){
      return{
        isClicked: false,
      }
    },
    methods:{
      handleSubmit(event: any): void{
        event.preventDefault();
      },
      toggleIsSubmit():void{
        this.$emit("closeSubmitDataModal");
      }
    },
})
</script>

<style scoped>
    @media screen and (max-width:800px) {
        .wrap{
          position:absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          width:100%;
          height:100%;
          top:0;
          background-color:rgba(107, 114, 128, 0.75);
          z-index:9999;
          padding:8px;
        }

        .content{
          width:100vh;         
        }

        .title h2{
          font-size: 1.25rem;
          text-align: center;
          color:white;
          background-color:var(--accent-color);
          border-top-left-radius: 20px;
          border-top-right-radius: 20px;
          padding-bottom:8px;
        }

        .info{
          background-color:white;
          padding:16px;
          border-bottom-left-radius: 20px;
          border-bottom-right-radius: 20px;
        }

        .info-title{
          color:var(--accent-color);
          margin-bottom: 16px;
        }

        .info-title h3{
          font-size:1.25rem;
          text-align: center;
        }

        .info-text p{
          font-size: 1rem;
          text-align: center;
        }

        .line{
          display: block;
          border: 1px solid var(--secondary-color);
          margin-top:24px;
          margin-bottom:24px;
        }

        .name-gender-wrapper{
          display: flex;
          justify-content: space-between;
        }

        .name-gender-wrapper label{
          display: inline-block;
          text-indent: -9999px;
        }

        .name-gender-wrapper div{
          display: flex;
          width:45%;
        }

        .name{
          width:100%;
          padding:8px;
        }

        .gender{
          width:100%;
          padding:8px;
        }

        .email-wrapper{
          width:100%;
          margin-top:16px;
        }

        .email-wrapper label{
          display: inline-block;
          text-indent: -9999px;
        }

        .email{
          width:100%;
          padding:8px;
        }

        .story-wrapper{
          margin-top:32px;
        }

        .story{
          width:100%;
          padding:8px;
        }

        .submit-wrapper{
          display: flex;
          justify-content: center;
          margin-top:16px;
        }

        .anonymous-wrapper{
          margin-top:8px;
        }

        .submit{
          font-size:1rem;
          background-color: var(--secondary-color);
          padding: 8px 16px;
          border-radius: 20px;
        }
    }

    @media screen and (min-width:800px) {
      .wrap{
          position:fixed;
          top:0;
          left:0;
          display: flex;
          justify-content: center;
          align-items: center;
          width:100%;
          height:100%;
          background-color:rgba(107, 114, 128, 0.75);
          z-index:9999;
          padding:8px;
        }

      .content{
        width:100%;
        max-width:980px;     
      }

      .title h2{
          font-size: 1.25rem;
          text-align: center;
          color:white;
          background-color:var(--accent-color);
          border-top-left-radius: 20px;
          border-top-right-radius: 20px;
          padding-top:8px;
          padding-bottom:8px;
        }

      .info{
        background-color:white;
        padding:16px;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
      }

      .info-title{
          color:var(--accent-color);
          margin-bottom: 16px;
        }

      .info-title h3{
        font-size:1.875rem;
        text-align: center;
      }

      .info-text p{
        font-size: 1rem;
        text-align: center;
      }

      .line{
        display: block;
        border: 1px solid var(--secondary-color);
        margin-top:24px;
        margin-bottom:24px;
      }

      .name-gender-wrapper{
          display: flex;
          justify-content: space-between;
        }

      .name-gender-wrapper label{
        display: inline-block;
        text-indent: -9999px;
      }

      .name-gender-wrapper div{
        display: flex;
        width:45%;
      }

      .name{
        width:100%;
        padding:8px;
      }

      .gender{
        width:100%;
        padding:8px;
      }

      .email-wrapper{
          width:100%;
          margin-top:16px;
        }

      .email-wrapper label{
        display: inline-block;
        text-indent: -9999px;
      }

      .email{
        width:100%;
        padding:8px;
      }

      .story-wrapper{
          margin-top:32px;
        }

      .story{
        width:100%;
        padding:8px;
      }

      .submit-wrapper{
        display: flex;
        justify-content: center;
        margin-top:16px;
      }

      .anonymous-wrapper{
        margin-top:8px;
      }

      .submit{
        font-size:1rem;
        background-color: var(--secondary-color);
        padding: 8px 16px;
        border-radius: 20px;
      }
    }
</style>