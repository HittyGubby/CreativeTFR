import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import VueDraggableResizable from "vue-draggable-resizable";

createApp(App)
  .component("vue-draggable-resizable", VueDraggableResizable)
  .mount("#app");
