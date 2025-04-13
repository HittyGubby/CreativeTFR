<template>

  <div class="control-group">
    <div class="windowtoggle">
      <div v-for="window in windows" :key="window.id" class="toggle-item">
        <span>{{ window.name }}</span>
        <ToggleSwitch v-model="window.visible" @click="toggleWindowVisibility(window)" />
      </div>
    </div>
    <br>
    <div class="toggle-item">
      <span>窗口是否可拖拽</span>
      <ToggleSwitch v-model="draggable" />
    </div>
    <div class="toggle-item">
      <span>背景色：</span>
      <InputText type="color" v-model="backgroundColor" @input="updateBackground"
        style="height: 40px; width: 20%; float: right;" />
    </div>
    <div class="toggle-item">
      <span>选择该网页点击分<br>享即可快速截图 -></span>
      <Button label="截图" @click="capture" style="margin-left: 10px;" />
    </div>
    <div class="toggle-item" style="right: 0px;">
      <Button label="清除缓存" @click="clearSessionStorage" style="width: inherit;" severity="danger" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import ToggleSwitch from 'primevue/toggleswitch';
import { useWindows } from '@/composables/useWindows';
const { windows, draggable } = useWindows();
const backgroundColor = ref('#0b0012');
const updateBackground = () => {
  document.body.style.backgroundColor = backgroundColor.value;
};

const toggleWindowVisibility = (window) => {
  window.visible = !window.visible;
  const element = document.getElementById(window.id);
  element.style.display = window.visible ? '' : 'none';
};

const clearSessionStorage = () => {
  sessionStorage.clear();
  if (window.confirm('是否清除缓存？')) {
    sessionStorage.clear();
    alert('缓存已清除');
  }
};

async function capture() {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
    const track = stream.getVideoTracks()[0];
    const bitmap = await new ImageCapture(track).grabFrame();
    const canvas = document.createElement('canvas');
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    canvas.getContext('2d').drawImage(bitmap, 0, 0);
    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${new Date().toLocaleString("zh-CN")}.png`;
      a.click();
      URL.revokeObjectURL(url);
      track.stop();
    }, 'image/png');
  } catch (err) { console.log(err) };
}
</script>

<style scoped>
.control-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-color-secondary);
}

.windowtoggle {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  gap: 10px;
}

.toggle-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
</style>
