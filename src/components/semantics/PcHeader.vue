<template>
    <header>
      <div class="information">
        <div class="content">
          <div class="logo">
            <h1>FML</h1>
          </div>
          <div class="user">
            <div class="buttons">
              <button @click="toggleIsSubmitted" class="submit">Submit your FML</button>
              <button class="moderate">Moderate your FML</button>
            </div>
            <span class="login">Log in</span>
          </div>
        </div>
      </div>
      <div class="navigation">
        <div class="content">
          <nav class="links">
            <router-link to="/">ALL</router-link>
            <router-link to="/top">Random</router-link>
            <a @click="goToHomePage">Go To Home</a>
          </nav>
          <div>
            <input type="text"/>
          </div>
        </div>
      </div>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: "PcHeader",
  methods:{
    toggleIsSubmitted():void{
      this.$emit("toggleSubmitIsClicked", );
    },
    goToHomePage():void{
      this.$router.push("/");
    }
  }
})
</script>

<style scoped>
.information{
  height:72px;
  background-color: rgba(0, 102, 174 ,1);
}

.information div{
  height: 72px;
}

.logo{
  display: flex;
  align-items: center;
}

.login{
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left:8px;
  padding-right:8px;
  cursor: pointer;
}

.navigation{
  background-color: rgba(1, 66, 119, 1);
}

.content{
  max-width:1280px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left:1.5rem;
  padding-right:1.5rem;
  margin: 0 auto;
}

.links{
  display: flex;
  align-items: center;
  height:40px;
  margin-left:-1rem;
}

.links a{
  color:white;
  margin-left:1rem;
  padding-left:0.5rem;
  padding-right:0.5rem;
  height:100%;
  line-height: 40px;
}

.links a:hover{
  background-color:orange;
}

.user{
  display: flex;
  justify-content: space-between;
  color:white;
  width:60%;
}

.buttons{
  width: 90%;
  display: flex;
  align-items: center;
}

.submit{
  font-size:1rem;
  background-color:pink;
  color:white;
  border-radius: 20px;
  padding:8px 24px;
}

.moderate{
  font-size:1rem;
  background-color: black;
  color:white;
  border-radius: 20px;
  padding:8px 24px;
  margin-left: 16px;
}

@media screen and (min-width: 1024px) {
.submit{
  font-size:1.25rem;
  background-color:pink;
  color:white;
  border-radius: 20px;
  padding:8px 24px;
}

.moderate{
  font-size:1.25rem;
  background-color: black;
  color:white;
  border-radius: 20px;
  padding:8px 24px;
  margin-left: 16px;
}
  
}
</style>