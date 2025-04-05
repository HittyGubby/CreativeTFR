<template>
  <div id="sidebar" style="
      position: fixed;
      z-index: 12;
      bottom: 0;
      right: 0;
      background-image: linear-gradient(rgb(138 0 153 / 20%), rgb(0 0 0));
      height: max-content; 
      width: max-content;
      outline: 1px solid #cccc0088;
      line-height: 27px;
      padding: 10px;
      text-align: center;
  ">
    <input type="checkbox">
    <label>锁定窗口</label>
    <br>
    <button style=" font-family: Cubic; transition: 0.2s; transition-timing-function: ease-in-out; color: #ffff00;
      font-size: 15px; background: url(&quot;/template/button_80x34.png&quot;) no-repeat; border: none; width: 80px;
      height: 34px;" class=" button" onclick="screenshot()">
      截图
    </button>
  </div>
</template>
