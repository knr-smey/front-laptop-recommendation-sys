<script setup>
import SideBar from './components/SideBar.vue';
import Main from './components/Main.vue';
</script>

<template>
  <div class="h-screen w-screen overflow-hidden bg-[#f3f6fb]">
    <div class="flex h-full w-full flex-col lg:flex-row">
      <SideBar />
      <Main />
    </div>
  </div>
</template>
