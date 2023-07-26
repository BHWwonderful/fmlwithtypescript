<template>
  <section class="wrap">
    <div class="title">
        <h2>Keyword</h2>
    </div>
    <div class="keywords">
        <a>Boredom</a>
        <a>Love</a>
        <a>Scary</a>
        <a>Neighbours</a>
        <a>Work</a>
        <a>Coworkers</a>
        <a>Teenagers</a>
        <a>Transportation</a>
        <a>Cars</a>
        <a>Mental health</a>
        <a>Technology</a>
        <a>LGBTQIA+</a>
        <a>Friends</a>
        <a>Furniture</a>
        <a>Abuse</a>
        <a>Awkward</a>
        <a>Relatable</a>
        <a>Creepypasta</a>
        <a>Kids</a>
        <a>Weird</a>
        <a>Language</a>
        <a>Parenting</a>
        <a>Accident</a>
        <a>Money</a>
        <a>Health</a>
        <a>Delivery</a>
        <a>Trans Rights</a>
        <a>My ex</a>
        <a>Capitalism</a>
        <a>Dreams</a>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent ({
    name: "keyword filter",
    data(){
        return{

        }
    }
})
</script>

<style scoped>
    .wrap{
        position:sticky;
        top:0;
        border-radius: 20px;
        width:100%;
        padding:8px;
    }

    .title{
        text-align: center;
        border-top-right-radius: 20px;
        border-top-left-radius: 20px;
        background-color:var(--accent-color);
        color: white;
        padding-top:8px;
        padding-bottom:16px;
    }

    .keywords{
        display: flex;
        flex-direction: column;
        flex-wrap:wrap;
        height:800px;
        background-color:white;
        padding-left:16px;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
    }

    .keywords a{
        display: flex;
        align-items: center;
        width:40%;
        height:50px;
        cursor: pointer;
    }
</style>
