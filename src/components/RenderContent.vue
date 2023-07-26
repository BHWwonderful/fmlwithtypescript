<template>
  <div>
    <ContentCard
     :contentData="dataArray[0]"
     @increaseAgreePoint="increaseAgreePoint"
     @decreaseAgreePoint="decreaseAgreePoint"
     @increaseDisagreePoint="increaseDisagreePoint"
     @decreaseDisagreePoint="decreaseDisagreePoint"
     />
    <ContentCard :contentData="dataArray[1]"
    @increaseAgreePoint="increaseAgreePoint"
    @decreaseAgreePoint="decreaseAgreePoint"
    @increaseDisagreePoint="increaseDisagreePoint"
    @decreaseDisagreePoint="decreaseDisagreePoint"
    />
    <ContentCard :contentData="dataArray[1]"
    @increaseAgreePoint="increaseAgreePoint"
    @decreaseAgreePoint="decreaseAgreePoint"
    @increaseDisagreePoint="increaseDisagreePoint"
    @decreaseDisagreePoint="decreaseDisagreePoint"
    />
    <ContentCard :contentData="dataArray[1]"
    @increaseAgreePoint="increaseAgreePoint"
    @decreaseAgreePoint="decreaseAgreePoint"
    @increaseDisagreePoint="increaseDisagreePoint"
    @decreaseDisagreePoint="decreaseDisagreePoint"
    />
    <ContentCard :contentData="dataArray[1]"
    @increaseAgreePoint="increaseAgreePoint"
    @decreaseAgreePoint="decreaseAgreePoint"
    @increaseDisagreePoint="increaseDisagreePoint"
    @decreaseDisagreePoint="decreaseDisagreePoint"
    />
    <ContentCard :contentData="dataArray[1]"
    @increaseAgreePoint="increaseAgreePoint"
    @decreaseAgreePoint="decreaseAgreePoint"
    @increaseDisagreePoint="increaseDisagreePoint"
    @decreaseDisagreePoint="decreaseDisagreePoint"
    />
    <ContentCard :contentData="dataArray[1]"
    @increaseAgreePoint="increaseAgreePoint"
    @decreaseAgreePoint="decreaseAgreePoint"
    @increaseDisagreePoint="increaseDisagreePoint"
    @decreaseDisagreePoint="decreaseDisagreePoint"
    />
    <ContentCard :contentData="dataArray[1]"
    @increaseAgreePoint="increaseAgreePoint"
    @decreaseAgreePoint="decreaseAgreePoint"
    @increaseDisagreePoint="increaseDisagreePoint"
    @decreaseDisagreePoint="decreaseDisagreePoint"
    />
    <ContentCard :contentData="dataArray[1]"
    @increaseAgreePoint="increaseAgreePoint"
    @decreaseAgreePoint="decreaseAgreePoint"
    @increaseDisagreePoint="increaseDisagreePoint"
    @decreaseDisagreePoint="decreaseDisagreePoint"
    />
    <ContentCard :contentData="dataArray[1]"
    @increaseAgreePoint="increaseAgreePoint"
    @decreaseAgreePoint="decreaseAgreePoint"
    @increaseDisagreePoint="increaseDisagreePoint"
    @decreaseDisagreePoint="decreaseDisagreePoint"
    />
    <ContentCard :contentData="dataArray[1]"
    @increaseAgreePoint="increaseAgreePoint"
    @decreaseAgreePoint="decreaseAgreePoint"
    @increaseDisagreePoint="increaseDisagreePoint"
    @decreaseDisagreePoint="decreaseDisagreePoint"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ContentCard from './ui/card/ContentCard.vue';


export default defineComponent({
    name: "RenderContent",
    data(){
        return{
          dataArray:[
            {
              id: 1,
              agree: 1,
              disagree: 10,
              title: "A guy",
              content: "I had sex with a guy",
              username: "Selan"
            },
            {
              id: 2,
              agree: 5,
              disagree: 15,
              title: "A woman",
              content: "I had sex with a guy",
              username: "Selan"
            },
          ]
        }
    },
    components:{
      ContentCard,
    },
    methods: {
      increaseAgreePoint(index: number): void{
        this.dataArray[index].agree++;
      },
      decreaseAgreePoint(index: number): void{
        this.dataArray[index].agree--;
      },
      increaseDisagreePoint(index: number): void{
        this.dataArray[index].disagree++;
      },
      decreaseDisagreePoint(index: number): void{
        this.dataArray[index].disagree--;
      },
    },
})
</script>

<style>

</style>
