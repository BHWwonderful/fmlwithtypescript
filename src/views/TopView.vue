<template>
  <div>
    <PcHeader 
      v-if="viewportWidth >= 800"
      @toggleSubmitIsClicked="toggleSubmitIsClicked"  
    />
    <MobileHeader v-if="viewportWidth <=800" />
    <SubmitDataModal
     v-if="submitIsClicked"
     @toggleSubmitIsClicked="toggleSubmitIsClicked"
    />
  </div>
  <div v-if="contentData">
    안녕!
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PcHeader from '@/components/semantics/PcHeader.vue';
import MobileHeader from "../components/semantics/MobileHeader.vue";
import SubmitDataModal from '@/components/SubmitDataModal.vue';
import { ContentItem } from "@/store/modules/contentModule";

export default defineComponent({
    name: "TopView",
    components:{
      PcHeader,
      MobileHeader,
      SubmitDataModal,
    },
    data(){
      return {
        viewportWidth: window.innerWidth,
        submitIsClicked: false,
      }
    },
    computed: {
      contentData(): ContentItem[]{
        return this.$store.getters.getTotalContent;
      }
    },
    async mounted(){
      try {
        await this.$store.dispatch('fetchData');
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    created()
    {
      window.addEventListener("resize", this.handleResize);
      console.log(this.contentData)
    },
    methods: {
      handleResize(): void{
        this.viewportWidth = window.innerWidth;
      },
      toggleSubmitIsClicked(): void{
        this.submitIsClicked = !this.submitIsClicked;
      },
    }
})
</script>

<style>
  
</style>