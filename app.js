function MouseWelcome() {
  const cursor = document.querySelector('.cursor');
  const cursorWidth = cursor.offsetWidth;
  const cursorHeight = cursor.offsetHeight;

  document.getElementById("welcome").addEventListener("mouseover", (e) => {
    document.addEventListener("mousemove", onMouseMove);
  });

  document.getElementById("welcome").addEventListener("mouseout", (e) => {
    document.removeEventListener("mousemove", onMouseMove);
  });

  function onMouseMove(e) {
    const x = e.clientX + window.pageXOffset - cursorWidth / 2;
    const y = e.clientY + window.pageYOffset - cursorHeight / 2;

    cursor.style.top = `${y}px`;
    cursor.style.left = `${x}px`;
  }
}

document.addEventListener("mousemove",parallax);
function parallax(a){
  document.querySelectorAll(".square").forEach(function(move){
    var moving_value = move.getAttribute("data-value");
    var x = (a.clientX*moving_value) / 250;
    var y =(a.clientY * moving_value) / 250;

    move.style.transform = "translateX("+x +"px) translateY("+y+"px)";

  });
}

const audio = document.getElementById('mus-audio');
const image = document.getElementById('mus-img');

audio.addEventListener('play', () => {
  image.classList.add('animation-active');
  image.classList.remove('animation-inactive');
});

audio.addEventListener('pause', () => {
  image.classList.add('animation-inactive');
  image.classList.remove('animation-active');
}); 