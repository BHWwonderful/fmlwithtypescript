<template>
  <div>
    <PcHeader />
    <MobileHeader/>
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
    }
})
</script>

<style>

</style>