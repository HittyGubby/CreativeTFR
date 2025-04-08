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
</script>
