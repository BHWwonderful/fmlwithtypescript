<template>
  <div>
     <ContentCard 
       v-for="content in contentData"
       :contentData="content"
       :key="content.id"
       :viewportWidth="viewportWidth"
       :currentUserID="currentUserID"   
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import ContentCard from './ui/card/ContentCard.vue';
import { ContentItem, AgreeItem } from '@/store/modules/contentModule';

export default defineComponent({
    name: "RenderContent",
    props: {
      totalContent: {
        type: Array as () => PropType<(ContentItem | AgreeItem)>,
        required: true,
      },
      viewportWidth: Number,
      currentUserID: String,
    },
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
