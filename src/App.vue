<script setup>
import { onMounted, ref } from 'vue';
import { initApp } from './components/onload.vue';
import MainWindow from './components/HtmlBase/mainwindow.vue';
import Description from './components/HtmlBase/description.vue';
import News from './components/HtmlBase/news.vue';
import Sfx from './components/HtmlBase/sfx.vue';
import SuperEvent from './components/HtmlBase/superevent.vue';
import Generic from './components/Controller/Generic.vue';
onMounted(() => { window.onload = initApp; });
import { useWindows } from '@/composables/useWindows';
var { draggable } = useWindows();
var visible = ref(false);
let isDragging = false;

onMounted(() => {
  document.getElementById('app').addEventListener('mousedown', (event) => {
    if (event.target === document.getElementById('app')) {
      isDragging = false;
    }
  });

  document.getElementById('app').addEventListener('mousemove', () => {
    isDragging = true;
  });

  document.getElementById('app').addEventListener('mouseup', (event) => {
    if (!isDragging && event.target === document.getElementById('app')) {
      visible.value = true;
    }
  });
});
</script>

<template>
  <MainWindow></MainWindow>

  <vue-draggable-resizable id="Description" :draggable="draggable" style="position: absolute; height: min-content;"
    :w="320" :x="12" :y="255">
    <Description class="window"></Description>
  </vue-draggable-resizable>

  <vue-draggable-resizable id="News" :draggable="draggable" :w="713" :x="-30" :y="600" :h="935">
    <News></News>
  </vue-draggable-resizable>

  <vue-draggable-resizable id="SuperEvent" :draggable="draggable" :w="1001" :x="530" :y="-930" :h="639">
    <SuperEvent class="window"></SuperEvent>
  </vue-draggable-resizable>

  <Dialog v-model:visible="visible" :style="{ width: '300px', fontFamily: 'Cubic' }" header="控制面板">
    <Generic class="window"></Generic>
  </Dialog>

  <Sfx></Sfx>
</template>