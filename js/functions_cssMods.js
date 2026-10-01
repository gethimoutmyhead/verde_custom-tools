function toggleLock(e) {
  const t = e.currentTarget;
  const locked = t.dataset.locked !== 'true';
  t.dataset.locked = locked;
  t.title = locked ? 'Locked' : 'Unlocked';
  t.classList.toggle('text-danger', locked);
  t.classList.toggle('text-secondary', !locked);
  t.querySelector('i').className = locked ? 'bi bi-pin-fill' : 'bi bi-pin-angle';
}