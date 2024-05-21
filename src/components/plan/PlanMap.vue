
<script setup>
import { KakaoMap } from 'vue3-kakao-maps';
</script>

<template>
  <KakaoMap 
    :lat="33.450701" 
    :lng="126.570667" 
    width=100%  
    height=900  
  />
</template>
  

<style scoped>
.v-img {
border-radius: 8px;
}
</style>
