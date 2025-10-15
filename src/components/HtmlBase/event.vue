<script setup>
import { ref, onMounted, computed, nextTick, watch } from "vue";
import { mousePosition } from "../../composables/useMousePosition.js";

const picManagerVisible = ref(false);
const picManagerType = ref("");
const picManagerTargetId = ref("");
const picManagerResizable = ref(false);
let zIndexCounter = 10;

// Refs for dynamic sizing
const eventBodyRef = ref(null);
const tileCount = ref(3);
const tileHeight = 80;
const calculateTileCount = () => {
  nextTick(() => {
    if (eventBodyRef.value) {
      if (eventBodyRef.value.dataset.editing === "true") {
        return;
      }
      const computedStyle = window.getComputedStyle(eventBodyRef.value);
      const contentHeight = parseFloat(computedStyle.height.replace('px', ''));
      if (!isNaN(contentHeight) && contentHeight > 0) {
        const requiredTiles = Math.ceil(contentHeight / tileHeight);
        tileCount.value = Math.max(0, requiredTiles) - 1;
      }
    }
  });
};

// Create an array of tile indices for v-for
const tileIndices = computed(() => {
  return Array.from({ length: tileCount.value }, (_, i) => i);
});

const handlePicClick = (event) => {
  const distance = Math.sqrt(
    Math.pow(mousePosition.up.x - mousePosition.down.x, 2) +
    Math.pow(mousePosition.up.y - mousePosition.down.y, 2)
  );

  if (distance > 5) {
    return;
  }

  const target = event.target;
  if (target.dataset.modifiable === "true") {
    picManagerType.value = target.dataset.type;
    picManagerTargetId.value = target.dataset.targetId;
    picManagerResizable.value = target.dataset.resizable === "true";
    picManagerVisible.value = true;
  }
};

const prioritizeWindow = (event) => {
  const target = event.target.closest(".draggable");
  if (target) {
    zIndexCounter++;
    target.style.zIndex = zIndexCounter;
  }
};

const handleEditFinish = (event) => {
  if (eventBodyRef.value) {
    setTimeout(() => {
      calculateTileCount();
    }, 50);
  }
};

onMounted(() => {
  document.addEventListener("click", handlePicClick);
  const windowElement = document.getElementById("eventwindow");
  windowElement.addEventListener("mousedown", prioritizeWindow);

  document.addEventListener("blur", handleEditFinish, true);

  calculateTileCount();

  if (eventBodyRef.value) {
    const observer = new MutationObserver(() => {
      calculateTileCount();
    });
    observer.observe(eventBodyRef.value, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }
});
</script>

<template>
  <div class="draggable" id="eventwindow" style="position: absolute; z-index: 4">
    <img src="/template/news/event_report_top_win.png" style="position: relative; display: block;" />

    <img v-for="index in tileIndices" :key="index" src="/template/news/event_report_tileable_midsection.png"
      style="position: relative; display: block; width: 100%;" />

    <img src="/template/news/event_report_bottom_win.png" style="position: relative; display: block;" />

    <div :style="{
      position: 'absolute',
      top: `${375 + tileCount * tileHeight}px`,
      left: '300px',
      zIndex: 3,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }">
      <img id="eventpic" class="pic" src="/preset/USA_major_city_riots.png" data-modifiable="true" data-type="event"
        data-resizable="true" data-initial-scale="1" :style="{ position: 'absolute', scale: 1 }"
        data-target-id="eventpic" />
    </div>

    <button id="eventbutton" class="button text" :style="{
      position: 'absolute',
      top: `${190 + tileCount * tileHeight}px`,
      left: '130px',
      transition: '0.2s',
      background: 'url(/template/news/event_option_entry.png) no-repeat', border: 'none', width: '352px',
      height: '48px', fontFamily: 'OldTypeNr, FZRui', fontSize: '18px', color: '#FFFFFF'
    }">
      暴乱解决不了任何问题！
    </button>

    <div style="
          position: absolute;
          display: flex;
          left: 55px;
          top: 80px;
          justify-content: center;
          align-items: center;
          inline-size: 500px;
        ">
      <p id="eventtitle" class="text" style="
            position: absolute;
            color: #000000;
            text-align: center;
            font-family: OldTypeNr, FZRui;
            font-size: 23px;
          ">主要城市发生暴乱</p>
    </div>

    <span ref="eventBodyRef" id="eventbody" class="text"
      style="
              font-family: OldTypeNr, FZRui;
              position: absolute;
              left: 43px;
              top: 120px;
              color: #000000;
              inline-size: 530px;
              text-align: left;
              font-size: 18px;
              white-space: pre-line;
            ">在全国各大城市，暴力事件接连不断地发生，执法部门和“运动”之间的冲突日益升级，重要基础设施遭到破坏已经是无可避免的了。铁路、公路、电车和公共汽车等在不同的地区不断遭到严重破坏，在“运动”以某种方式被平息之前，这种破坏将继续下去。<br><br>“运动”的所言通过媒体渠道得到传播，从而降低了破坏的严重程度，同时也阻止了我们采取更加激烈的应对措施——即使我们有意这样做。
    </span>
  </div>
</template>
<style scoped></style>