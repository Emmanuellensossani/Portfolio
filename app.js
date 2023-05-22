const cursor = document.querySelector('.cursor');
const cursorWidth = cursor.offsetWidth;
const cursorHeight = cursor.offsetHeight;

document.addEventListener("mousemove", (e) => {
  const x = e.clientX - cursorWidth / 2;
  const y = e.clientY - cursorHeight / 2;

  cursor.style.top = `${y}px`;
  cursor.style.left = `${x}px`;
});
