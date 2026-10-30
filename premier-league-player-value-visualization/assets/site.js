document.addEventListener('DOMContentLoaded', () => {
 const name = document.getElementById('player-name');
 if (name) new MutationObserver(() => { document.title = `${name.textContent} | Player Value Lab`; }).observe(name,{childList:true});
 document.querySelectorAll('select:not([aria-label])').forEach(select => {
  if (!select.labels?.length) select.setAttribute('aria-label', select.id.replace(/-/g,' ') || 'Choose an option');
 });
});
// Third-party headshots can be unavailable; keep profiles readable without a broken-image icon.
document.addEventListener('error', event => {
 const image=event.target;
 if(image instanceof HTMLImageElement && !image.closest('.squad-marker') && image.id!=='team-logo' && !image.classList.contains('team-logo') && !image.closest('.brand') && !image.classList.contains('pitch-bg')) {
  const fallback=new URL('player-placeholder.svg', document.querySelector('script[src$="assets/site.js"]').src).href;
  if(image.src!==fallback) { image.src=fallback; image.alt=image.alt||'Player portrait unavailable'; }
 }
}, true);
