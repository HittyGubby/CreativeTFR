<script setup>
import { onMounted } from 'vue';
import { initApp } from './components/onload.vue';
import MainWindow from './components/HtmlBase/mainwindow.vue';
import Description from './components/HtmlBase/description.vue';
import News from './components/HtmlBase/news.vue';
import Sfx from './components/HtmlBase/sfx.vue';
import Sidebar from './components/HtmlBase/sidebar.vue';
import SuperEvent from './components/HtmlBase/superevent.vue';
onMounted(() => { window.onload = initApp; });
</script>

<template>
  <MainWindow></MainWindow>
  <vue-draggable-resizable>
    <Description></Description>
  </vue-draggable-resizable>
  <vue-draggable-resizable>
    <News></News>
  </vue-draggable-resizable>
  <vue-draggable-resizable>
    <SuperEvent></SuperEvent>
  </vue-draggable-resizable>
  <Sidebar></Sidebar>
  <Sfx></Sfx>
</template>
