// Importazione delle librerie Matter.js
let Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

let engine, world;
let numbers = [];
let clockCenter;

function setup() {
  createCanvas(600, 600);

  // Configura il motore di Matter.js
  engine = Engine.create();
  world = engine.world;

  // Centro dell'orologio
  clockCenter = createVector(width / 2, height / 2);

  // Crea i numeri come corpi fisici
  for (let i = 1; i <= 12; i++) {
    let angle = random(TWO_PI); // Posizione casuale
    let x = clockCenter.x + cos(angle) * random(50, 200);
    let y = clockCenter.y + sin(angle) * random(50, 200);
    let num = new NumberBody(x, y, i);
    numbers.push(num);
  }

  // Aggiungi i bordi per contenere i numeri
  let ground = Bodies.rectangle(width / 2, height + 20, width, 40, { isStatic: true });
  let leftWall = Bodies.rectangle(-20, height / 2, 40, height, { isStatic: true });
  let rightWall = Bodies.rectangle(width + 20, height / 2, 40, height, { isStatic: true });
  let ceiling = Bodies.rectangle(width / 2, -20, width, 40, { isStatic: true });

  // Aggiungi i bordi al mondo fisico
  World.add(world, [ground, leftWall, rightWall, ceiling]);
}

function draw() {
  background(255);
  Engine.update(engine);

  // Disegna i numeri
  for (let num of numbers) {
    num.show();
  }

  // Disegna le lancette dell'orologio
  drawClockHands();
}

// Classe per i numeri
class NumberBody {
  constructor(x, y, value) {
    // Crea un corpo circolare per il numero
    this.body = Bodies.circle(x, y, 30, {
      restitution: 0.7, // Rimbalzo
      friction: 0.1,
    });
    this.value = value; // Valore del numero
    World.add(world, this.body); // Aggiungi al mondo fisico
  }

  show() {
    let pos = this.body.position;
    let angle = this.body.angle;

    // Disegna il numero
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(0);
    noStroke();
    text(this.value, 0, 0);
    pop();
  }
}

// Funzione per disegnare le lancette
function drawClockHands() {
  let hr = hour() % 12; // Ore (in formato 12 ore)
  let min = minute(); // Minuti
  let sec = second(); // Secondi

  strokeWeight(4);
  stroke(0);

  // Lancetta delle ore
  let hourAngle = map(hr + min / 60, 0, 12, 0, TWO_PI) - HALF_PI;
  line(
    clockCenter.x,
    clockCenter.y,
    clockCenter.x + cos(hourAngle) * 80,
    clockCenter.y + sin(hourAngle) * 80
  );

  // Lancetta dei minuti
  let minuteAngle = map(min + sec / 60, 0, 60, 0, TWO_PI) - HALF_PI;
  strokeWeight(2);
  line(
    clockCenter.x,
    clockCenter.y,
    clockCenter.x + cos(minuteAngle) * 120,
    clockCenter.y + sin(minuteAngle) * 120
  );

  // Lancetta dei secondi
  let secondAngle = map(sec, 0, 60, 0, TWO_PI) - HALF_PI;
  stroke(255, 0, 0);
  strokeWeight(1);
  line(
    clockCenter.x,
    clockCenter.y,
    clockCenter.x + cos(secondAngle) * 150,
    clockCenter.y + sin(secondAngle) * 150
  );
}
