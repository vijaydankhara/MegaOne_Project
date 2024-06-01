const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = []; // Array that contains the stars
const FPS = 60; // Frames per second
const numStars = 70; // Number of stars
const mouse = { x: 0, y: 0 };  // Mouse location

// Initialize stars
for (let i = 0; i < numStars; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1 + 1,
    vx: Math.random() * 50 - 25,
    vy: Math.random() * 50 - 25
  });
}

// Draw the scene
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "lighter";

  stars.forEach(star => {
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.stroke();
  });

  ctx.beginPath();
  stars.forEach(starI => {
    ctx.moveTo(starI.x, starI.y);
    if (distance(mouse, starI) < 150) ctx.lineTo(mouse.x, mouse.y);
    stars.forEach(starII => {
      if (distance(starI, starII) < 150) {
        ctx.lineTo(starII.x, starII.y);
      }
    });
  });
  ctx.lineWidth = 0.05;
  ctx.strokeStyle = 'white';
  ctx.stroke();
}

// Calculate distance between two points
function distance(point1, point2) {
  const xs = point2.x - point1.x;
  const ys = point2.y - point1.y;
  return Math.sqrt(xs * xs + ys * ys);
}

// Update star locations
function update() {
  stars.forEach(star => {
    star.x += star.vx / FPS;
    star.y += star.vy / FPS;

    if (star.x < 0 || star.x > canvas.width) star.vx = -star.vx;
    if (star.y < 0 || star.y > canvas.height) star.vy = -star.vy;
  });
}

// Track mouse movement
canvas.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Update and draw
function tick() {
  draw();
  update();
  requestAnimationFrame(tick);
}

tick();
