import { reactive, watch } from 'vue';
import { saveData } from "@/utils/onload.js";

export const state = reactive({
  chartData: {
    labels: ['争取社会主义和解放党（反修派）', '争取社会主义和解放党（温和派）', '美国民主社会主义者', '民主党（进步派）', '民主党（自由派）', '自由意志党', '共和党（保守派）', '共和党（民粹派）', '美国武装力量', '爱国者阵线', '民族社会主义运动'],
    datasets: [
      {
        data: [0, 1, 3, 8, 40, 5, 42, 1, 0, 0, 0],
        backgroundColor: ['#640000', '#990000', '#BD3643', '#FF0A66', '#FFAA1E', '#E1D700', '#0A0FFF', '#7C7C7C', '#050505', '#7B542E', '#4E3939'],
        borderWidth: 0,
        spacing: 0,
      },
    ],
    options: {
      rotation: 90,
    },
  },
  spiritPictures: [
    {
      id: 1,
      url: "/preset/USA_USA_america_first.png",
      filename: "USA_USA_america_first",
      scale: 1.0
    },
    {
      id: 2,
      url: "/preset/USA_USA_constitutional_protections.png",
      filename: "USA_USA_constitutional_protections",
      scale: 1.0
    },
    {
      id: 3,
      url: "/preset/USA_USA_immigration.png",
      filename: "USA_USA_immigration",
      scale: 1.0
    },
    {
      id: 4,
      url: "/preset/USA_USA_political_division.png",
      filename: "USA_USA_political_division",
      scale: 1.0
    },
    {
      id: 5,
      url: "/preset/USA_USA_political_establishment.png",
      filename: "USA_USA_political_establishment",
      scale: 1.0
    },
    {
      id: 6,
      url: "/preset/USA_USA_the_trump_economy.png",
      filename: "USA_USA_the_trump_economy",
      scale: 1.0
    },
    {
      id: 7,
      url: "/preset/USA_USA_second_ammendment.png",
      filename: "USA_USA_second_ammendment",
      scale: 1.0
    },
    {
      id: 8,
      url: "/preset/USA_USA_world_police.png",
      filename: "USA_USA_world_police",
      scale: 1.0
    }
  ],
  windows: {
    main: {
      name: "主窗口",
      x: 0,
      y: 0,
      w: 1,
      h: 1,
      zIndex: 1,
      visible: true,
      active: false,
    },
    description: {
      name: "人物介绍",
      x: 6,
      y: 420,
      w: 320,
      h: 400,
      zIndex: 1,
      visible: true,
      active: false,
    },
    news: {
      name: "新闻",
      x: 450,
      y: -100,
      w: 1,
      h: 1,
      zIndex: 1,
      visible: true,
      active: false,
    },
    superevent: {
      name: "超事件",
      x: 420,
      y: 740,
      w: 1,
      h: 1,
      zIndex: 2,
      visible: true,
      active: false,
    },
    event: {
      name: "事件",
      x: 1300,
      y: 100,
      w: 1,
      h: 1,
      zIndex: 1,
      visible: true,
      active: false,
    },
    spirit: {
      name: "国家精神",
      x: 5,
      y: 240,
      w: 1,
      h: 1,
      zIndex: 1,
      visible: true,
      active: false,
    },
  }
});

watch(state, () => {
  saveData();
}, { deep: true });
