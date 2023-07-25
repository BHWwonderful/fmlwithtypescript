<template>
  <div>
    <ContentCard/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ContentCard from './ui/card/ContentCard.vue';


export default defineComponent({
    name: "RenderContent",
    data(){
        return{

        }
    },
    components:{
      ContentCard,
    }
})
</script>

<style>

</style>
