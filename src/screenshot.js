function screenshot() {
    capture(document.body, document.body.backgroundColor,
        Math.max(wid('main'), wid('econ'), wid('desc'), wid('newswindow'), wid('superwindow')),
        Math.max(hei('main'), hei('econ'), hei('desc'), hei('newswindow'), hei('superwindow')))
}
function screenshotpiechart() {
    capture(document.getElementById('piechart'), '#00000000', 100, 100)
}

/*
function capture(ele,bkg,width,height) {
  document.getElementById('screenshotprogress').innerHTML = '正在捕捉窗口内容'
  htmlToImage.toBlob(ele, {
    pixelRatio:Number(document.getElementById('screenshotscale').value),
    width:width,
    height:height,
    backgroundColor: bkg,
    fontEmbedCSS: true,
    filter: (node) => {return node.id !== 'sidebarbutton' && node.id !== 'sidebar';}
    //,quality: Number(document.getElementById('screenshotquality').value)
  }).then(async (blob) => {
      const compressedFile = await imageCompression(blob,{useWebWorker: true,alwaysKeepResolution:true,
      onProgress: (prog)=>{document.getElementById('screenshotprogress').innerHTML=`图片已压缩${prog}%`;}});
    const a = document.createElement('a');
    a.download = `${new Date().toLocaleString("zh-CN")}${username==="" ? username : " - "+username}`;
    a.href = URL.createObjectURL(compressedFile);
    a.click();
    a.remove();
    document.getElementById('screenshotprogress').innerHTML = '完成！'
  })
}*/ //with compression codes

async function capture(ele, bkg, width, height) {
    const svgData = await htmlToImage.toSvg(ele, {
        width: width,
        height: height,
        backgroundColor: bkg,
        filter: (node) => { return node.id !== 'sidebarbutton' && node.id !== 'sidebar'; }
    });
    const svgContent = svgData.replace(/^data:image\/svg\+xml;charset=utf-8,/, '');
    const decodedSvg = decodeURIComponent(svgContent);
    const svgBlob = new Blob([decodedSvg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    const a = document.createElement('a');
    a.download = `${new Date().toLocaleString("zh-CN")}${username === "" ? username : " - " + username}.svg`;
    a.href = url;
    a.click();
    URL.revokeObjectURL(url);
    a.remove();
}

function wid(e) {
    w = Number(window.getComputedStyle(document.getElementById(e)).left.replace("px", "")) +
    Number(window.getComputedStyle(document.getElementById(e)).width.replace("px", "")); if (isNaN(w)) return 0; else return w;
}
function hei(e) {
    h = Number(window.getComputedStyle(document.getElementById(e)).top.replace("px", "")) +
    Number(window.getComputedStyle(document.getElementById(e)).height.replace("px", "")); if (isNaN(h)) return 0; else return h;
}
