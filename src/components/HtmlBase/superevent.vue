<script setup>
import { ref, onMounted } from "vue";
import { mousePosition } from "../../composables/useMousePosition.js";

const picManagerVisible = ref(false);
const picManagerType = ref("");
const picManagerTargetId = ref("");
const picManagerResizable = ref(false);
let zIndexCounter = 10;

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

onMounted(() => {
  document.addEventListener("click", handlePicClick);
  const windowElement = document.getElementById("superwindow");
  windowElement.addEventListener("mousedown", prioritizeWindow);
});
</script>
<template>
  <div class="draggable" id="superwindow" style="position: absolute; z-index: 4;">
    <img src="/template/super_frame.png" style="position: relative;z-index: 1;" data-modifiable="true" data-type="super"
      data-resizable="false" data-target-id="superpic">
    <div style="position:absolute;position:absolute;top:30px;left: 5px; width: 982px;height: 594px;">
      <img id="superpic" class="pic" src="/preset/super_USA_civil_war.png"
        style="height: inherit; width: inherit;z-index: 0;">
    </div>
    <button id="superbutton" class="button text"
      style="position:absolute; top: 585px; left: 350px; transition: 0.2s; background: url('/template/spacebar.png') no-repeat; border: none; width: 300px; height: 35px; font-family:Cubic;font-size: 19px;color: #cccccc;z-index: 5;text-shadow: 1px 1px 2px black;">分裂之家</button>
    <div
      style="position:absolute;display: flex; left: 230px; top:37px; justify-content: center; align-items: center; inline-size: 570px;">
      <p id="supertitle" class="text"
        style="color: white; position: absolute; text-align: center; font-family:Cubic; font-size: 24px;z-index: 5;text-shadow: 1px 1px 2px black;">
        第二次美国内战</p>
    </div>
    <span id="supermotto" class="text"
      style="text-shadow: 1px 1px 2px black; position: absolute;left:210px; top:440px;z-index: 5; color: #cccccc;inline-size: 580px; font-family: Type; font-size: 18px;font-family:Cubic; text-align: center;white-space: pre-line;">
      “如果毁灭是我们的命运，我们必须自己成为它的创造者和终结者。作为一个自由人的国家，我们将永远活着，或者自我灭亡。”
      <br />
      - 亚伯拉罕·林肯
    </span>
  </div>
</template>
