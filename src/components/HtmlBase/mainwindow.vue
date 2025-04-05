<script>
import Pie from './piechart.vue';
import ChartEditor from '../Controller/ChartEditor.vue';

export default {
  components: { Pie, ChartEditor },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [{
          data: [0, 1, 3, 8, 40, 5, 42, 1, 0, 0, 0],
          backgroundColor: ['#640000', '#990000', '#BD3643', '#FF0A66', '#FFAA1E', '#E1D700', '#0A0FFF', '#7C7C7C', '#050505', '#7B542E', '#4E3939'],
          borderWidth: 0,
          spacing: 0
        }]
      },
      editorVisible: false
    }
  },
  methods: {
    updateChartData(newData) {
      this.chartData = newData
    }
  }
}
</script>

<template>
  <div id="main-container" style="position:absolute;z-index: 8; user-select: none;">
    <div>
      <img src="/template/diplo_leader_frame.png" style="position: relative;z-index: 1;top:70px">
      <div style="position:absolute; top: 15px; left: 22px; height: 55px; width: 90px; z-index: 2;">
        <img src="/template/flag_overlay.png"
          style="position:absolute; top:0; left:0;z-index: 1;height: inherit; width: inherit; scale: 1.3;">
        <img id="flagpic" class="pic" src="/preset/USA.png"
          style="position:absolute; top:0; left:0; height: inherit; width: inherit;">
      </div>
      <div style="position:absolute; top: 79px; left: 7px; height: 160px; width: 120px; z-index: 0;">
        <img src="/template/Leader_Background.png"
          style="position:absolute; top:0; left:0; height: inherit; width: inherit;">
      </div>
      <div style="position:absolute; top: 79px; left: 7px; height: 160px; width: 120px; z-index: 0;">
        <img id="portraitpic" class="pic" src="/preset/USA_donald_trump5.png"
          style="position:absolute; top:0; left:0; height: inherit; width: inherit;">
      </div>
    </div>

    <div>
      <img src="/template/diplo_upper_win_bg.png" style="position: absolute;z-index: 2; left: 125px; top: 4px;">
      <img src="/template/diplo_top_bg_diplo_tab.png" style="position: absolute;z-index: 2; left: 125px; top: 76px;">
      <div
        style="position:absolute; top: 42px; left: 177px; z-index: 3;display: flex; justify-content: center; align-items: center;">
        <img id="ideologypic" class="pic" src="/preset/right_populism_USA.png" style="position:absolute;">
      </div>
      <div
        style="position:absolute; top: 40px; left: 485px; z-index: 3;display: flex; justify-content: center; align-items: center;">
        <img id="factionpic" class="pic" src="/preset/GFX_NATO_Member.png" style="position:absolute;">
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
        style="position:absolute; top: 202px; left: 182px; z-index: 3;display: flex; justify-content: center; align-items: center;">
        <img id="focuspic" class="pic" src="/preset/goal_unknown.png" style="position:absolute;scale: 0.9;">
      </div>
      <div id="piechartparent"
        style="position:absolute; top: 72px; left: 133px; z-index: 3;display: flex; justify-content: center; align-items: center;">
        <img src="/template/bck_shadow.png" style="position:absolute;scale: 0.6;z-index: 0;">
        <Pie id="piechart"
          style="width: 100px;height: 100px; border-radius: 50%;background:none; scale: 0.7;z-index: 4;"
          :chart-data="chartData" />
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
  <ChartEditor v-if="editorVisible" :chart-data="chartData" @update-chart="updateChartData"
    @close="editorVisible = false" style="z-index: 100;" />
</template>
