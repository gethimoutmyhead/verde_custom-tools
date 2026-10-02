function toggleLock(e) {
  const t = e.currentTarget;
  DOMToggleLock(t)
  // const locked = t.dataset.locked !== 'true';
  // t.dataset.locked = locked;
  // t.title = locked ? 'Locked' : 'Unlocked';
  // t.classList.toggle('text-success', locked);
  // t.classList.toggle('text-secondary', !locked);
  // t.querySelector('i').className = locked ? 'bi bi-pin-fill' : 'bi bi-pin-angle';
}

function DOMToggleLock(t){
  const locked = t.dataset.locked !== 'true';
  t.dataset.locked = locked;
  t.title = locked ? 'Locked' : 'Unlocked';
  t.classList.toggle('text-success', locked);
  t.classList.toggle('text-secondary', !locked);
  t.querySelector('i').className = locked ? 'bi bi-pin-fill' : 'bi bi-pin-angle';
}

function setDOMToggleLock(t, tethered) {
  t.dataset.locked = tethered;
  t.title = tethered ? 'Locked' : 'Unlocked';
  t.classList.toggle('text-success', tethered);
  t.classList.toggle('text-secondary', !tethered);
  t.querySelector('i').className = tethered ? 'bi bi-pin-fill' : 'bi bi-pin-angle';
}