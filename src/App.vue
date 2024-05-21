<script setup>
import { RouterView } from "vue-router"
import TheHeadingNavbar from "@/components/layout/TheHeadingNavbar.vue"
import Footer from "@/components/layout/Footer.vue"
</script>

<template>
  <div>
    <TheHeadingNavbar></TheHeadingNavbar>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<style scoped></style>
