<template>
  <MainHeader />
  <main class="main-content">
    <SideBar/>
    <router-view  class='content-view'/>
  </main>
  <MainFooter />
</template>

<script setup>
import SideBar from '@/components/sideBar.vue'
import MainHeader from '@/components/MainHeader.vue';
import MainFooter from '@/components/MainFooter.vue';
</script>
<style>
  .main-content{
    display: flex;
    flex-direction: row;
  }
  .content-view{
    width: 100%;
    background: silver;
  }
</style>