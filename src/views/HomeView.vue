<template>
  <div>
    <PcHeader v-if="viewportWidth >= 800" />
    <MobileHeader v-if="viewportWidth <=800" />
  </div>
  <div class="content-wrap">
    <section class="content">
      <RenderContent/>
    </section>
    <section class="banner">
      
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// components
import PcHeader from '@/components/semantics/PcHeader.vue';
import MobileHeader from "../components/semantics/MobileHeader.vue";
import RenderContent from '@/components/RenderContent.vue';

// assets

export default defineComponent({
    name: "HomeView",
    components: {
      MobileHeader,
      PcHeader,
      RenderContent,
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
  display: flex;
  max-width:1200px;
  margin: 0 auto;
}
  .content{
    flex-grow:2;
  }

  .banner{
    flex-grow: 1;
    height:400px;
    background-color: grey;
  }
}
  
</style>