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
    <div>{{ $store.state.counter }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PcHeader from '@/components/semantics/PcHeader.vue';
import MobileHeader from "../components/semantics/MobileHeader.vue";
import SubmitDataModal from '@/components/SubmitDataModal.vue';

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
    created()
    {
      window.addEventListener("resize", this.handleResize);
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