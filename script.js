const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

const NUM_PARTICLES = 100;
let RADIUS = 50;
let SPEED = 2;
let NOISE = 0.1;
let running = true;
let particles = [];

class Particle {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
  }

  move() {
    this.x += SPEED * Math.cos(this.angle);
    this.y += SPEED * Math.sin(this.angle);

    // Wrap around edges
    if (this.x < 0) this.x += canvas.width;
    if (this.x > canvas.width) this.x -= canvas.width;
    if (this.y < 0) this.y += canvas.height;
    if (this.y > canvas.height) this.y -= canvas.height;
  }
}

function createParticles() {
  particles = [];
  for (let i = 0; i < NUM_PARTICLES; i++) {
    particles.push(
      new Particle(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 2 * Math.PI
      )
    );
  }
}

function getAverageAngle(p, neighbors) {
  let sinSum = 0;
  let cosSum = 0;

  neighbors.forEach(n => {
    sinSum += Math.sin(n.angle);
    cosSum += Math.cos(n.angle);
  });

  return Math.atan2(sinSum / neighbors.length, cosSum / neighbors.length);
}

function getNeighbors(p) {
  return particles.filter(n => {
    const dx = p.x - n.x;
    const dy = p.y - n.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    return dist < RADIUS && n !== p;
  });
}

function update() {
  particles.forEach(p => {
    const neighbors = getNeighbors(p);
    if (neighbors.length > 0) {
      const avgAngle = getAverageAngle(p, neighbors);
      p.angle = avgAngle + (Math.random() * 2 - 1) * NOISE;
    }
    p.move();
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
  });
}

function loop() {
  if (running) {
    update();
    draw();
  }
  requestAnimationFrame(loop);
}

// Event Listeners for Controls
document.getElementById("playPause").addEventListener("click", () => {
  running = !running;
  document.getElementById("playPause").textContent = running ? "Pause" : "Play";
});

document.getElementById("restart").addEventListener("click", () => {
  createParticles();
});

document.getElementById("radius").addEventListener("input", (e) => {
  RADIUS = parseInt(e.target.value);
});

document.getElementById("speed").addEventListener("input", (e) => {
  SPEED = parseInt(e.target.value);
});

document.getElementById("noise").addEventListener("input", (e) => {
  NOISE = parseFloat(e.target.value);
});

// Initialize Simulation
createParticles();
loop();
