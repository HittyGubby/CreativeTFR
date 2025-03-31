window.onload = function () {   
  document.getElementById("progressbar").style.width = Math.round(Math.random() * 237) + "px";

  //add attribs
  appendattrib(document.body, '.button', { 'onmouseover': 'this.style.opacity = 0.7', 'onmouseleave': 'this.style.opacity = 1' })
  appendattrib(document.body, '.text', { 'onclick': 'Edittext(this)'})

  //init input data
  if (sessionStorage.getItem('data') != null) {
    //recover(JSON.parse(sessionStorage.getItem('data')));
  } else {
    //init data
    document.getElementById('progressbar').style.width = Math.round(Math.random() * 237) + 'px';
  }
}
// main end
function Edittext(text) {
  let lastValidHTML = text.innerHTML;

  text.setAttribute('contenteditable', true);
  text.focus();

  text.addEventListener('input', () => {
    if (text.innerHTML.trim()) {
      lastValidHTML = he.decode(text.innerHTML);
    }
  });

  text.addEventListener('blur', () => {
    if (!text.innerHTML.trim()) {
      text.innerHTML = lastValidHTML;
    } else {
      text.innerHTML = he.decode(text.innerHTML);
    }
    text.removeAttribute('contenteditable');
  });
}

function appendattrib(parent, child, attribs) {
  const c = parent.querySelectorAll(child);
  for (let i = 0; i < c.length; i++) { for (let key in attribs) { c[i].setAttribute(key, attribs[key]); } }
}

function updatepop() {
  let a = Array.from(document.getElementById("poplist").children).filter((child) => child.tagName === 'INPUT').map(child => Number(child.value));
  let angles = [];
  for (let i = 0; i < a.length; i++) { angles.push(a[i]); }
  let cumulativeAngles = angles.reduce((acc, angle, index) => {
    acc.push((acc[index - 1] || 0) + angle); return acc;
  }, []);
  let total = cumulativeAngles[cumulativeAngles.length - 1];
  let scaleFactor = 360 / total;
  let scaledAngles = cumulativeAngles.map(angle => angle * scaleFactor);
  document.getElementById("piechart").style.background = `conic-gradient(
    from ${a[1]}deg, 
      rgb(100,0,0) 0 ${scaledAngles[0]}deg,rgb(153,0,0) 0 ${scaledAngles[1]}deg,
      rgb(189,54,67) 0 ${scaledAngles[2]}deg,rgb(255,10,102) 0 ${scaledAngles[3]}deg,
      rgb(255,170,30) 0 ${scaledAngles[4]}deg,rgb(225,215,0) 0 ${scaledAngles[5]}deg,
      rgb(10,15,255) 0 ${scaledAngles[6]}deg,rgb(124,124,124) 0 ${scaledAngles[7]}deg,
      rgb(5,5,5) 0 ${scaledAngles[8]}deg,
      rgb(123,84,46) 0 ${scaledAngles[9]}deg,rgb(78,57,57) 0 ${scaledAngles[10]}deg`;
  sessionStorage.setItem('data', JSON.stringify(returnjson()));
}

function update(input) {
  document.getElementById(input.id.replace("input", "")).innerHTML = input.value
    .replace(/{leader}/g, `<span class="leaderdesc" style="color:#cccc00"></span>`)
    .replace(/{country}/g, `<span class="countrydesc" style="color:#cccc00"></span>`)
    .replace(/{flag}/g, `<div style="margin: 0px 0px 0px 9px; position:absolute; z-index: 3; display: inline; justify-content: center; align-items: center; height: 13px; width: 20px;"><img class="descflag" style="left: 0px; margin: 0 -10px; height: inherit; width: inherit;"></div>`);

  requestAnimationFrame(() => {
    let flagSrc = document.getElementById("flagpic").src;
    document.querySelectorAll(".descflag").forEach(flag => {
      flag.src = flagSrc;
    });

    let leaderText = document.getElementById("leader").innerHTML;
    document.querySelectorAll(".leaderdesc").forEach(desc => {
      desc.innerHTML = leaderText;
    });

    let countryText = document.getElementById("country").innerHTML;
    document.querySelectorAll(".countrydesc").forEach(desc => {
      desc.innerHTML = countryText;
    });
  });
}

let highestZIndex = 10;
function dragElement(elmnt) {
  const draggableElements = document.querySelectorAll('[draggable="true"]');
  highestZIndex = Math.max(
    highestZIndex,
    ...Array.from(draggableElements).map(
      (el) => parseInt(window.getComputedStyle(el).zIndex) || 0
    )
  );
  const sidebarButton = document.getElementById('sidebarbutton');
  const sidebar = document.getElementById('sidebar');
  const main = document.getElementById('main');

  sidebarButton.style.zIndex = '1000';
  sidebar.style.zIndex = '999';
  main.style.zIndex = '998';
  draggableElements.forEach((el) => {
    if (el !== elmnt) {
      el.style.zIndex = parseInt(el.style.zIndex) || 0;
    }
  });
  elmnt.style.zIndex = (highestZIndex + 1).toString();
  highestZIndex++;
}

function sidebarexpand() {
  const e = document.getElementById('sidebar');
  e.style.top = '0px';
  e.style.padding = '10px';
  document.getElementById('sidebarexpand').style.display = 'none';
}

function sidebarretract() {
  const e = document.getElementById('sidebar');
  e.style.top = `-${window.getComputedStyle(e).height}`;
  e.style.padding = '0px';
  document.getElementById('sidebarexpand').style.display = 'inline-block';
}

function check(c) {
  if (c.style.background == "url('template/generic_checkbox_checked.png') no-repeat") {
    c.style.background = "url('template/generic_checkbox_unchecked.png') no-repeat";
    document.getElementById(c.id.replace("checkbox", "")).style.display = "none";
    document.getElementById("sfxcheck").play();
  }
  else {
    c.style.background = "url('template/generic_checkbox_checked.png') no-repeat";
    document.getElementById(c.id.replace("checkbox", "")).style.display = "";
    document.getElementById("sfxcheck").play();
  }
}

function recover(){
  document.getElementsByTagName("BODY")[0].innerHTML = sessionStorage.getItem('data');
}