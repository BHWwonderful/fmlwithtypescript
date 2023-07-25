<template>
  <div>
    <PcHeader v-if="viewportWidth >= 800" />
    <MobileHeader v-if="viewportWidth <=800" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PcHeader from '@/components/semantics/PcHeader.vue';
import MobileHeader from "../components/semantics/MobileHeader.vue";

export default defineComponent({
    name: "TopView",
    components:{
      PcHeader,
      MobileHeader,
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

<style>

</style>