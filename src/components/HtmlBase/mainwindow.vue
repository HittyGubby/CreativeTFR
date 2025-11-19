<script setup>
import Pie from "./piechart.vue";
import ChartEditor from "../Controller/ChartEditor.vue";
import { ref, onMounted } from "vue";
import PicManager from "@/components/Controller/PicManager.vue";
import { mousePosition } from "../../composables/useMousePosition.js";
import { state } from "@/utils/state.js";
import { Howl } from 'howler';

const editorVisible = ref(false);
const picManagerVisible = ref(false);
const picManagerType = ref("");
const picManagerTargetId = ref("");
const picManagerResizable = ref(false);

const updatePicture = ({ id, url, scale }) => {
  const element = document.getElementById(id);
  if (element) {
    element.src = url ? url : element.src;
    if (scale !== undefined) {
      element.style.scale = scale;
    }
  }
};

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

onMounted(() => {
  document.addEventListener("click", handlePicClick);
});

const handleClose = () => {
  new Howl({
    src: ["/sfx/click_window_close.wav"],
    volume: 1,
  }).play();
};

const handleShow = () => {
  new Howl({
    src: ["/sfx/click_window_open.wav"],
    volume: 1,
  }).play();
};
</script>

<template>
  <div id="main-container" style="position:absolute;z-index: 8; user-select: none;">
    <div>
      <img id="leader-overlay" src="/template/diplo_leader_frame.png" data-modifiable="true" data-type="leader"
        data-resizable="false" style="position: relative;z-index: 1;top:70px" data-target-id="leaderpic" />
      <div style="position:absolute; top: 15px; left: 22px; height: 55px; width: 90px; z-index: 2;">
        <img id="flag-overlay" src="/template/flag_overlay.png" data-modifiable="true" data-type="flag"
          data-resizable="false" data-target-id="flagpic"
          :style="{ position: 'absolute', top: '0', left: '0', height: 'inherit', width: 'inherit', scale: 1.3, zIndex: 1 }" />
        <img id="flagpic" src="/preset/USA.png"
          style="position:absolute; top:0; left:0; height: inherit; width: inherit;">
      </div>
      <div style="position:absolute; top: 79px; left: 7px; height: 160px; width: 120px; z-index: 0;">
        <img src="/template/Leader_Background.png"
          style="position:absolute; top:0; left:0; height: inherit; width: inherit;">
      </div>
      <div style="position:absolute; top: 79px; left: 7px; height: 160px; width: 120px; z-index: 0;">
        <img id="leaderpic" class="pic" src="/preset/USA_donald_trump5.png"
          style="position:absolute; top:0; left:0; height: inherit; width: inherit;">
      </div>
    </div>

    <div>
      <img src="/template/diplo_upper_win_bg.png" style="position: absolute;z-index: 2; left: 125px; top: 4px;">
      <img src="/template/diplo_top_bg_diplo_tab.png" style="position: absolute;z-index: 2; left: 125px; top: 76px;">
      <div
        style="position:absolute; top: 42px; left: 177px; z-index: 3;display: flex; justify-content: center; align-items: center;">
        <img id="ideologypic" class="pic" src="/preset/right_populism_USA.png" data-modifiable="true"
          data-type="ideology" data-resizable="true" data-initial-scale="1" :style="{ position: 'absolute', scale: 1 }"
          data-target-id="ideologypic" />
      </div>
      <div
        style="position:absolute; top: 40px; left: 485px; z-index: 3;display: flex; justify-content: center; align-items: center;">
        <img id="factionpic" class="pic" src="/preset/GFX_NATO_Member.png" data-modifiable="true" data-type="faction"
          data-resizable="true" data-initial-scale="1" :style="{ position: 'absolute', scale: 1 }"
          data-target-id="factionpic" />
      </div>
      <div
        style="position:absolute; top: 220px; left: 373px; z-index: 3;display: flex; justify-content: center; align-items: center;">
        <img src="/template/pol_goal_progress_frame.png" style="position:absolute;">
        <img src="/template/diplo_goal_button.png" style="position:absolute; top: -50px;">
      </div>
      <div style="position:absolute; top: 217px; left: 255px; z-index: 3;">
        <img id="progressbar" src="/template/pol_goal_progress.png" style="position:absolute; width: 0px;height: 6px;">
      </div>
      <div
        style="position:absolute; top: 202px; left: 182px; z-index: 5;display: flex; justify-content: center; align-items: center;">
        <img id="focuspic" class="pic" src="/preset/goal_unknown.png" data-modifiable="true" data-type="focus"
          data-resizable="true" data-initial-scale="0.9" :style="{ position: 'absolute', scale: 0.9 }"
          data-target-id="focuspic" />
      </div>
      <div id="piechartparent"
        style="position:absolute; top: 72px; left: 133px; z-index: 3;display: flex; justify-content: center; align-items: center;">
        <img src="/template/bck_shadow.png" style="position:absolute;scale: 0.6;z-index: 0;">
        <Pie class="piechart"
          style="width: 100px;height: 100px; border-radius: 50%;background:none; scale: 0.7;z-index: 4;"
          v-model="state.chartData" />
        <img src="/template/pol_piechart_overlay_63x63.png" style="position:absolute;scale: 0.9;z-index: 5;"
          @click="editorVisible = true">
      </div>
      <div
        style="z-index: 3;position: absolute; left: 230px; top: 10px; color: #cccccc;text-shadow: 1px 1px 2px black;font-family:Cubic; font-size: 16px; vertical-align:middle;">
        <p id="country" class="text" style="position: absolute; top: -15px;width:max-content;">美利坚合众国</p>
        <p id="factiontext" class="text" style="position: absolute; top: 5px;width:max-content;">北大西洋公约组织</p>
        <p id="leader" class="text" style="position: absolute; top: 25px;width:max-content;">唐纳德·特朗普</p>
      </div>
      <div
        style="position: absolute; top:85px;left: 238px;font-family:Cubic;color: #cccccc; text-shadow: 1px 1px 2px black;font-size: 16px;z-index: 3; vertical-align: middle;">
        <p id="party" class="text" style="position: absolute; top: -9px;width:max-content;">共和党（保守派）</p>
        <p id="ideologytext" class="text" style="position: absolute; top: 12px;width:max-content;">特朗普民粹主义</p>
        <p id="election" class="text" style="position: absolute; top: 34px;width:max-content;">下次大选<span
            style="color: sandybrown;">2020年11月</span></p>
        <div
          style="position:absolute; inline-size: 260px;display: flex; left: 6px; top:112px; justify-content: center; align-items: center;">
          <p id="focustext" class="text" style="position: absolute; text-align: center;width:max-content;">
            未知国策</p>
        </div>
      </div>
    </div>
  </div>
  <Dialog v-model:visible="editorVisible" header="饼图编辑" :style="{ width: '600px', fontFamily: 'Cubic', opacity: 0.9 }"
    @hide="handleClose" @show="handleShow">
    <ChartEditor v-model="state.chartData" />
  </Dialog>
  <PicManager v-model:visible="picManagerVisible" :type="picManagerType" :targetId="picManagerTargetId"
    :resizable="picManagerResizable" @update:pic="updatePicture" />
</template>
