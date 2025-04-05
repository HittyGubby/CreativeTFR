<script>
export function Edittext(original) {
  if (original.dataset.editing) return;
  original.dataset.editing = 'true';
  const rawHTML = original.innerHTML;
  const editable = original.cloneNode(true);
  editable.textContent = original.innerHTML;
  editable.setAttribute('contenteditable', true);
  original.style.display = 'none';
  original.parentNode.insertBefore(editable, original);
  editable.focus();
  editable.addEventListener('input', () => {
    if (editable.innerHTML.trim()) {
      original.innerHTML = editable.textContent;
    }
  });
  editable.addEventListener('blur', () => {
    if (!editable.innerHTML.trim()) {
      original.innerHTML = editable.innerHTML = rawHTML;
    }
    original.style.display = '';
    delete original.dataset.editing;
    editable.remove();
  });
  editable.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      editable.blur();
    }
  });
}


export let highestZIndex = 10;
export function DragElement(elmnt) {
  const draggableElements = document.querySelectorAll('.draggable');
  highestZIndex = Math.max(
    highestZIndex,
    ...Array.from(draggableElements).map(
      (el) => parseInt(window.getComputedStyle(el).zIndex) || 0
    )
  );
  const sidebarButton = document.getElementById('sidebarexpand');
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


export function UpdatePop() {
  const a = Array.from(document.getElementById("poplist").children).filter((child) => child.tagName === 'INPUT').map(child => Number(child.value));
  const angles = [];
  for (let i = 0; i < a.length; i++) { angles.push(a[i]); }
  const cumulativeAngles = angles.reduce((acc, angle, index) => {
    acc.push((acc[index - 1] || 0) + angle); return acc;
  }, []);
  const total = cumulativeAngles[cumulativeAngles.length - 1];
  const scaleFactor = 360 / total;
  const scaledAngles = cumulativeAngles.map(angle => angle * scaleFactor);
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

</script>
