let isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

if (isMobile) {
  let controls = document.querySelector('.controls');
  let isDragging = false;
  let offsetX, offsetY;

  controls.addEventListener('touchstart', (e) => {
    isDragging = true;
    offsetX = e.touches[0].clientX - controls.offsetLeft;
    offsetY = e.touches[0].clientY - controls.offsetTop;
  });

  document.addEventListener('touchmove', (e) => {
    if (isDragging) {
      let x = e.touches[0].clientX - offsetX;
      let y = e.touches[0].clientY - offsetY;

      // Prevent going out of bounds
      x = Math.max(0, Math.min(window.innerWidth - controls.offsetWidth, x));
      y = Math.max(0, Math.min(window.innerHeight - controls.offsetHeight, y));

      controls.style.left = `${x}px`;
      controls.style.top = `${y}px`;
    }
  });

  document.addEventListener('touchend', () => {
    isDragging = false;
  });
}
