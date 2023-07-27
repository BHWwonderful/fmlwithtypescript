<template>
  <div>
    <PcHeader v-if="viewportWidth >= 768" />
    <MobileHeader v-if="viewportWidth < 768" />
  </div>
  <div class="content-wrap">
    <div class="container">
      <section class="content">
        <RenderContent/>
      </section>
      <section class="banner" v-if="viewportWidth >= 1024">
        <KeywordFilter/>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// components
import PcHeader from '@/components/semantics/PcHeader.vue';
import MobileHeader from "../components/semantics/MobileHeader.vue";
import RenderContent from '@/components/RenderContent.vue';
import KeywordFilter from '@/components/KeywordFilter.vue';

// assets

export default defineComponent({
    name: "HomeView",
    components: {
      MobileHeader,
      PcHeader,
      RenderContent,
      KeywordFilter,
    },
    data(){
      return {
        viewportWidth: window.innerWidth,
      }
    },
    created(){
      window.addEventListener("resize", this.handleResize);
    },
    methods: {
      handleResize() {
        this.viewportWidth = window.innerWidth;
      }
    }

})
</script>

<style scoped>



@media screen and (min-width: 1024px) {

  .content-wrap{
    background-color:rgba(234, 234, 234, 1);
  }

  .container{
  display: flex;
  margin: 0 auto;
  max-width:1280px;
  padding-left:8px;
  
  }
  .content{
    flex-grow:2;
  }

  .banner{
    flex-grow: 1;
    max-width:800px;
    padding:8px;
  }
}
  
</style>