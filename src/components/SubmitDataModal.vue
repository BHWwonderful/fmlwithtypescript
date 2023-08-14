<template>
  <div ref="SubmitCloseTargetElement" id="wrap" @click="(event) => handleCloseSubmitFML(event)" class="wrap">
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
          <div v-if="errorMessage" class="warning">{{ errorMessage }}</div>
          <form @submit.prevent="(event) => handleSubmit(event)" class="form">
            <div class="title-wrapper">
              <div>
                <label>Title</label>
                <input v-model="title" type="text" placeholder="Title" :class="{ 'wrong': isTitleShort }" />
              </div>
            </div>
            <div class="name-gender-wrapper">
              <div>
                <label>Your name</label>
                <input v-model="username" :class="['name', { 'wrong': isUsernameWrong}]" type="text" placeholder="Your name" />
              </div>
              <div>
                <label>Gender</label>
                  <select v-model="gender" :class="['gender', { 'wrong': isGenderWrong}]">
                    <option value="gender">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
              </div>
            </div>
            <div class="email-wrapper">
                <label>Your email</label>
                <input v-model="email" class="email" type="email" placeholder="Your email(optional)"/>
            </div>
            <div class="story-wrapper">
                <textarea v-model="content" :class="['story', { 'wrong': isContentShort}]" name="" id="" cols="30" rows="10" placeholder="Today... FML" maxlength="320"></textarea>
                <p>Remaining characters: {{ remainingCharacters }}</p>
            </div>
            <div class="anonymous-wrapper">
                <label>
                  <input v-model="isAnonymouseClicked" type="checkbox" name="anonymous" />
                  Make me anonymous
                </label>
            </div>
            <div class="submit-wrapper">
                <button v-if="!isLoading" class="submit">Submit</button>
                <button v-if="isLoading" class="submit">
                  <span class="transparent">Submit</span>
                  <div class="loading"></div>
                </button>
            </div>
          </form>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import db from '@/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export default defineComponent({
    name:"SubmitDataModal",
    data(){
      return{
        isClicked: false,
        username: "",
        gender: "gender",
        email: "",
        content: "",
        title: "",
        isAnonymouseClicked: false,
        maxTextLength: 320,
        errorMessage: "",
        isUsernameWrong: false,
        isGenderWrong: false,
        isContentShort: false,
        isTitleShort: false,
        isLoading: false,
      }
    },
    methods:{
      async handleSubmit (event: SubmitEvent): Promise<void>{
        this.changeIsLoading();
        this.resetErrorMessage();
        this.resetFormValidation();
        try{
          if(this.title.length < 4){            
            this.changeErrorMessage("Title must be more than 3 characters");
            this.changeIsTitleShort();
            this.resetIsLoading();
            return ;
          } else if(this.username.length < 2){
            this.changeErrorMessage("Please enter a username");
            this.changeIsUsernameWrong();
            this.resetIsLoading();
            return ;
          } else if(this.gender === "gender"){
            this.changeErrorMessage("Please select your gender");
            this.changeIsGenderWrong();
            this.resetIsLoading();
            return ;
          } else if(this.content.length < 30){
            this.changeErrorMessage("Your FML must be more than 30 characters");
            this.changeIsContentShort();
            this.resetIsLoading();
            return ;
          }

          const awaitContentRef = collection(db, "await");
        if(this.isAnonymouseClicked){
          const addData = await addDoc(awaitContentRef, {
          content: this.content,
          title: this.title,
          date: new Date(),
          email: this.email,
          gender: this.gender,
          username: "anonymous",
          })
        } else{
          const addData = await addDoc(awaitContentRef, {
          content: this.content,
          date: new Date(),
          title: this.title,
          email: this.email,
          gender: this.gender,
          username: this.username,
          })
        }
        this.$emit("closeSubmitDataModal");
        return ;
        } catch(error){
          console.log(error);
        }
      },
      changeErrorMessage(message: string): void{
        this.errorMessage = message;
      },
      changeIsUsernameWrong(): void{
        this.isUsernameWrong = true;
      },
      changeIsGenderWrong(): void{
        this.isGenderWrong = true;
      },
      changeIsContentShort(): void{
        this.isContentShort = true;
      },
      changeIsTitleShort(): void{
        this.isTitleShort = true;
      },
      changeIsLoading():void{
        this.isLoading = true;
      },
      resetIsLoading():void{
        this.isLoading = false;
      },
      resetFormValidation(): void{
        this.isUsernameWrong = false;
        this.isGenderWrong = false;
        this.isContentShort = false;
        this.isTitleShort = false;
      },
      resetErrorMessage(): void{
        this.errorMessage = "";
      },
      handleCloseSubmitFML(event: Event): void{
        if(event.target === this.$refs.SubmitCloseTargetElement){
          this.$emit("closeSubmitDataModal");
        }
      },
    },
    computed: {
      remainingCharacters(): number{
        return this.maxTextLength - this.content.length;
      }
    }
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
          margin-top: 16px;
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
        }

      .content{
        width:95%;
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

      .warning{
        text-align: center;
        margin-top: 16px;
        margin-bottom: 16px;
        color: rgba(185, 28, 28, 1);
        font-weight: bold;
        font-size: 1.5rem;
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

      .wrong{
        background-color: rgba(185, 28, 28, 0.1);
      }

      .name{
        font-size: 1rem;
        width:100%;
        padding:8px;
        border-radius: 0.25rem;
        border-color: rgba(209, 213, 217, 1);
      }

      .gender{
        font-size: 1rem;
        width:100%;
        padding:8px;
        border-radius: 0.25rem;
        border-color: rgba(209, 213, 217, 1);
      }

      .title-wrapper{
          width: 100%;
          margin-bottom: 16px;
      }

      .title-wrapper label{
        text-indent: -9999px;
        display: inline-block;
      }

      .title-wrapper input {
        width: 100%;
        font-size: 1rem;
        padding: 0.5rem;
        border-color: rgba(209, 213, 217, 1);
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
        font-size: 1rem;
        width:100%;
        padding:8px;
        border-radius: 0.25rem;
        border-color: rgba(209, 213, 217, 1);
      }

      .story-wrapper{
          margin-top:32px;
        }

      .story{
        font-size: 1rem;
        width:100%;
        padding:8px;
        border-radius: 0.25rem;
        border-color: rgba(209, 213, 217, 1);
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
        position:relative;
        font-size:1rem;
        background-color: var(--secondary-color);
        padding: 12px 16px;
        border-radius: 20px;
        color:white;
        font-weight: bold;
      }

      .loading:before{
        content: "";
        position: absolute;
        top: 0px;
        left: -25px;
        height: 12px;
        width: 12px;
        border-radius: 12px;
        -webkit-animation: loader10g 3s ease-in-out infinite;
        animation: loader10g 3s ease-in-out infinite;
      }

      .loading{
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
        width: 12px;
        height: 12px;
        border-radius: 12px;
        background-color: blue;
        -webkit-animation: loader10m 3s ease-in-out infinite;
        animation: loader10m 3s ease-in-out infinite;
        
      }

      .loading::after{
        content: "";
        position: absolute;
        top: 0px;
        left: 25px;
        height: 10px;
        width: 10px;
        border-radius: 10px;
        -webkit-animation: loader10d 3s ease-in-out infinite;
        animation: loader10d 3s ease-in-out infinite;
      }

      @-webkit-keyframes loader10g{
        0%{background-color: rgba(255, 255, 255, .2);}
        25%{background-color: rgba(255, 255, 255, 1);}
        50%{background-color: rgba(255, 255, 255, .2);}
        75%{background-color: rgba(255, 255, 255, .2);}
        100%{background-color: rgba(255, 255, 255, .2);}
      }
      @keyframes loader10g{
        0%{background-color: rgba(255, 255, 255, .2);}
        25%{background-color: rgba(255, 255, 255, 1);}
        50%{background-color: rgba(255, 255, 255, .2);}
        75%{background-color: rgba(255, 255, 255, .2);}
        100%{background-color: rgba(255, 255, 255, .2);}
      }

      @-webkit-keyframes loader10m{
        0%{background-color: rgba(255, 255, 255, .2);}
        25%{background-color: rgba(255, 255, 255, .2);}
        50%{background-color: rgba(255, 255, 255, 1);}
        75%{background-color: rgba(255, 255, 255, .2);}
        100%{background-color: rgba(255, 255, 255, .2);}
      }
      @keyframes loader10m{
        0%{background-color: rgba(255, 255, 255, .2);}
        25%{background-color: rgba(255, 255, 255, .2);}
        50%{background-color: rgba(255, 255, 255, 1);}
        75%{background-color: rgba(255, 255, 255, .2);}
        100%{background-color: rgba(255, 255, 255, .2);}
      }

      @-webkit-keyframes loader10d{
        0%{background-color: rgba(255, 255, 255, .2);}
        25%{background-color: rgba(255, 255, 255, .2);}
        50%{background-color: rgba(255, 255, 255, .2);}
        75%{background-color: rgba(255, 255, 255, 1);}
        100%{background-color: rgba(255, 255, 255, .2);}
      }
      @keyframes loader10d{
        0%{background-color: rgba(255, 255, 255, .2);}
        25%{background-color: rgba(255, 255, 255, .2);}
        50%{background-color: rgba(255, 255, 255, .2);}
        75%{background-color: rgba(255, 255, 255, 1);}
        100%{background-color: rgba(255, 255, 255, .2);}
      }

      .transparent{
        color:transparent;
      }
    }
</style>