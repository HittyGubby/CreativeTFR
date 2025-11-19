<script setup>
import { onMounted, nextTick } from "vue";
let zIndexCounter = 10;
const prioritizeWindow = (event) => {
  const target = event.target.closest(".draggable");
  if (target) {
    zIndexCounter++;
    target.style.zIndex = zIndexCounter;
  }
};

const adjustContainerSize = async () => {
  await nextTick(); // Wait for DOM updates to complete
  const container = document.getElementById("descwindow");
  const content = document.getElementById("desc");

  if (container && content) {
    const contentRect = content.getBoundingClientRect();
    container.style.width = contentRect.width + 6 + "px";
    container.style.height = contentRect.height + 6 + "px";
  }
};

onMounted(async () => {
  const windowElement = document.getElementById("descwindow");
  windowElement.addEventListener("mousedown", prioritizeWindow);
  await nextTick();
  setTimeout(adjustContainerSize, 0);
});

onMounted(() => {
  const content = document.getElementById("desc");
  if (content) {
    const observer = new MutationObserver(() => {
      setTimeout(adjustContainerSize, 50);
    });
    observer.observe(content, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });
  }
});

</script>
<template>
  <div class="draggable resizable" id="descwindow"
    style="position: absolute; z-index: 4; display: inline-block; background-color: #000c13; border: 3px solid;border-image: linear-gradient(to right, #3f0081, #992ecf);border-image-slice: 1;">
    <span id="desc" class="text"
      style="position: absolute; font-family:Cubic; font-size: 12px; min-height: min-content; color: #8aadbe; white-space: pre-line; width: 320px; padding: 7px; line-height: 16px;">
      <span style="color: #cccc00;">唐纳德·特朗普</span>
      <br />
      -----------
      <br />
      唐纳德·约翰·特朗普是当代美国最具有分裂性的政治家。身为纽约房地产大亨弗雷德·特朗普的儿子，将父亲的公司从一个酒店和赌场连锁企业，转变成了以他个人形象为招牌的国际品牌。他在2000年和2012年尝试过涉足政坛，最终在2016年总统选举中全力投入。经过一连串的爆冷，他最终获得共和党提名，并在大选中击败了前参议员和第一夫人希拉里·克林顿，成为美国总统。
      <br />
      <br />
      特朗普从政策到个性的方方面面都颠覆了华盛顿特区所崇尚的老派形象。他信奉商业哲学：不做不能立即给自己带来实际利益的交易，绝不存在任何负面新闻，以及出现问题时绝不承认失败。支持者赞赏他的坦率，认为他敢于为中西部受挫的民众发声，敢于挑战迂腐的联邦体制。然而，众多批评者也谴责其肤浅自负，过于迎合极右翼分子，为了自己的虚荣不惜摧毁民主传统。但无论是支持还是反对，人们都难以否认，他拥有能激怒或煽动任何团体的魔力。
    </span>
  </div>
</template>