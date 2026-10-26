function popupMessage(DOMElem, str_message) {
  const msg = document.createElement('div');
  msg.textContent = str_message;

  const rect = DOMElem.getBoundingClientRect();
  Object.assign(msg.style, {
    position: 'fixed',
    left: `${rect.left + rect.width / 2}px`,
    top: `${rect.top - 6}px`,
    transform: 'translate(-50%, -100%)',
    padding: '2px 8px',
    font: '18px system-ui, sans-serif',
    color: '#fff',
    background: 'rgba(0, 0, 0, 0.8)',
    borderRadius: '4px',
    pointerEvents: 'none',
    zIndex: 9999,
  });

  document.body.appendChild(msg);

  msg.animate([{ opacity: 1 }, { opacity: 0 }], {
    duration: 1500,
    easing: 'ease-out',
    fill: 'forwards',
  }).finished.then(() => msg.remove());
}