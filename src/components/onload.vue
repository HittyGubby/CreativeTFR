<script>
import { Edittext } from './index.vue';

export function initApp() {
  let observer = new MutationObserver(() => { sessionStorage.setItem('data', document.body.innerHTML) });
  observer.observe(document.body, { childList: true, subtree: true });

  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('text')) {
      event.stopPropagation();
      Edittext(event.target);
    }
  });

  if (sessionStorage.getItem('data') != null) {
    //ONLY ENABLE ON PRODUCTION
    //document.body.innerHTML = sessionStorage.getItem('data');
  }
}
</script>
