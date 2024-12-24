const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

let NUM_PARTICLES = 100;
let RADIUS = 50;
let SPEED = 2;
let NOISE = 0.1;
let running = true;
let particles = [];
let selectedParticleIndex = 0; // Index of the selected particle to show its radius

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
    this.x = (this.x + canvas.width) % canvas.width;
    this.y = (this.y + canvas.height) % canvas.height;
  }

  draw() {
    const arrowLength = 10;
    const headSize = 5;

    const dx = Math.cos(this.angle) * arrowLength;
    const dy = Math.sin(this.angle) * arrowLength;

    // Draw arrow line (tail)
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + dx, this.y + dy);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw arrowhead
    ctx.beginPath();
    ctx.moveTo(this.x + dx, this.y + dy);
    ctx.lineTo(this.x + dx - headSize * Math.cos(this.angle - Math.PI / 6), this.y + dy - headSize * Math.sin(this.angle - Math.PI / 6));
    ctx.lineTo(this.x + dx - headSize * Math.cos(this.angle + Math.PI / 6), this.y + dy - headSize * Math.sin(this.angle + Math.PI / 6));
    ctx.closePath();
    ctx.fillStyle = 'white';
    ctx.fill();
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
    p.draw();
  });

  // Draw radius circle for the selected particle
  const selectedParticle = particles[selectedParticleIndex];
  ctx.beginPath();
  ctx.arc(selectedParticle.x, selectedParticle.y, RADIUS, 0, 2 * Math.PI);
  ctx.strokeStyle = 'red'; // Circle color for radius
  ctx.lineWidth = 2;
  ctx.stroke();
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
  document.getElementById("radiusValue").textContent = RADIUS;
});

document.getElementById("speed").addEventListener("input", (e) => {
  SPEED = parseInt(e.target.value);
});

document.getElementById("noise").addEventListener("input", (e) => {
  NOISE = parseFloat(e.target.value);
  document.getElementById("noiseValue").textContent = NOISE;
});

document.getElementById("particles").addEventListener("input", (e) => {
  NUM_PARTICLES = parseInt(e.target.value);
  document.getElementById("particlesValue").textContent = NUM_PARTICLES;
  createParticles();
});

// Initialize Simulation
createParticles();
loop();
