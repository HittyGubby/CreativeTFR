<script>
export function Edittext(event) {
  let original = event.target;
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

  event.stopPropagation();
}
</script>
