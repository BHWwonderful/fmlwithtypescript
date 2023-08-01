<template>
  <div>
     <ContentCard 
       v-for="content in contentData"
       :contentData="content"
       :key="content.id"   
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ContentCard from './ui/card/ContentCard.vue';
import { ContentItem } from '@/store/modules/contentModule';

export default defineComponent({
    name: "RenderContent",
    // props: {
    //   totalContent: {
    //     type: Array as () => ContentItem[],
    //     required: true,
    //   }
    // },
    computed: {
      contentData(): ContentItem[]{
        return this.$store.getters.getTotalContent;
      }
    },
    components:{
      ContentCard,
    },
})
</script>

<style>

</style>
