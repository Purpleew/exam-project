// Global variables for Matter.js and p5.js setup
let engine, world, particles = [];

function setup() {
  createCanvas(400, 400);

  // Set up Matter.js engine
  engine = Matter.Engine.create();
  world = engine.world;

  // Create a boundary for the canvas (the "clock border")
  let boundary = Matter.Bodies.circle(width / 2, height / 2, 150, { isStatic: true });
  Matter.World.add(world, boundary);

  // Create particles for numbers (collision objects)
  for (let i = 0; i < 12; i++) {
    let angle = map(i, 0, 12, 0, TWO_PI);
    let x = width / 2 + 160 * cos(angle);
    let y = height / 2 + 160 * sin(angle);

    let num = createNumberParticle(x, y, i + 1);
    particles.push(num);
  }
}

function draw() {
  background(255);

  // Update Matter.js physics engine
  Matter.Engine.update(engine);

  // Draw clock hands
  drawClockHands();

  // Draw the SVG numbers (not moving, just background)
  drawNumbersSVG();

  // Draw the numbers as moving particles
  for (let particle of particles) {
    fill(0);
    textSize(24);
    textAlign(CENTER, CENTER);
    text(particle.num, particle.body.position.x, particle.body.position.y);
  }
}

function drawClockHands() {
  let hr = hour();
  let mn = minute();
  let sc = second();

  // Clock hands rotation based on time
  let hourAngle = map(hr % 12, 0, 12, 0, TWO_PI) - HALF_PI;
  let minuteAngle = map(mn, 0, 60, 0, TWO_PI) - HALF_PI;
  let secondAngle = map(sc, 0, 60, 0, TWO_PI) - HALF_PI;

  stroke(0);
  strokeWeight(8);

  // Draw the hour hand
  line(width / 2, height / 2, width / 2 + 60 * cos(hourAngle), height / 2 + 60 * sin(hourAngle));

  // Draw the minute hand
  strokeWeight(6);
  line(width / 2, height / 2, width / 2 + 80 * cos(minuteAngle), height / 2 + 80 * sin(minuteAngle));

  // Draw the second hand
  stroke(255, 0, 0);
  strokeWeight(4);
  line(width / 2, height / 2, width / 2 + 100 * cos(secondAngle), height / 2 + 100 * sin(secondAngle));
}

function drawNumbersSVG() {
  // Here, the numbers are static in SVG, so no movement
  // You can expand to add more if needed, for example:
  // <text x="50%" y="10%" text-anchor="middle" font-size="24" fill="black">12</text>
}

function createNumberParticle(x, y, num) {
  // Create a Matter.js body for each number as a dynamic particle
  let particle = Matter.Bodies.circle(x, y, 20, { restitution: 0.9 });
  Matter.World.add(world, particle);
  particle.num = num;  // Store the number in the particle object
  return particle;
}
