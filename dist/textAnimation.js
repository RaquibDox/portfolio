let animatedText ={};

// onWindowResize();

// function onWindowResize(){
  
  if(window.innerWidth > 687){
    animatedText = {
      name: "Md Raquib",
      spikeRatio: 0.044,
      fontSize: 0.175,
      particleOpacity: 0.28,
      particleSpeed: 1
    }
  }
  else{
    animatedText = {
      name: "Raquib",
      spikeRatio: 0.024,
      fontSize: 0.275,
      particleOpacity: 0.5828,
      particleSpeed: 1
    }
  }


// console.log(animatedText.name);

const config = {
  text: animatedText.name,
  widthToSpikeLengthRatio: animatedText.spikeRatio,
};

const colorConfig = {
  particleOpacity: animatedText.particleOpacity,
  baseHue: 150,
  hueRange: 20,
  hueSpeed: 0.01,
  colorSaturation: 80
};

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(v) {
    return new Vector(
      this.x + v.x,
      this.y + v.y);
  }

  addTo(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  sub(v) {
    return new Vector(
      this.x - v.x,
      this.y - v.y);
  }
  
  subFrom(v) {
    this.x -= v.x;
    this.y -= v.y;
  }
  
  mult(n) {
    return new Vector(this.x * n, this.y * n);
  }
  
  multTo(n) {
    this.x *= n;
    this.y *= n;
    return this;
  }
  
  div(n) {
    return new Vector(this.x / n, this.y / n);
  }
  
  divTo(n) {
    this.x /= n;
    this.y /= n;
  }
  
  setAngle(angle) {
    var length = this.getLength();
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
  }
  
  setLength(length) {
    var angle = this.getAngle();
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
  }
  
  getAngle() {
    return Math.atan2(this.y, this.x);
  }
  
  getLength() {
    return Math.hypot(this.x, this.y);
  }

  getLengthSq() {
    return this.x * this.x + this.y * this.y;
  }

  distanceTo(v) {
    return this.sub(v).getLength();
  }
  
  distanceToSq(v) {
    return this.sub(v).getLengthSq();
  }

  manhattanDistanceTo(v) {
    return Math.abs(v.x - this.x) + Math.abs(v.y - this.y);
  }
  
  copy() {
    return new Vector(this.x, this.y);
  }
  
  rotate(angle) {
    return new Vector(
      this.x * Math.cos(angle) - this.y * Math.sin(angle), 
      this.x * Math.sin(angle) + this.y * Math.cos(angle)
    );
  }
  
  rotateTo(angle) {
    let x = this.x * Math.cos(angle) - this.y * Math.sin(angle); 
    let y = this.x * Math.sin(angle) + this.y * Math.cos(angle);
    this.x = x;
    this.y = y;
    return this;
  }
  
  rotateAround(v, angle) {
    let x = (this.x - v.x) * Math.cos(angle) - (v.y - this.y) * Math.sin(angle) + v.x;
    let y = (this.x - v.x) * Math.sin(angle) + (v.y - this.y) * Math.cos(angle) + v.y;
    return new Vector(x, y);
  }

  rotateMeAround(v, angle) {
    let x = (this.x - v.x) * Math.cos(angle) - (v.y - this.y) * Math.sin(angle) + v.x;
    let y = (this.x - v.x) * Math.sin(angle) + (v.y - this.y) * Math.cos(angle) + v.y;
    this.x = x;
    this.y = y;
    return this;
  }
  
  equals(v) {
    return this.x == v.x && this.y == v.y;
  }
  
  reflectAlongX() {
    this.y *= -1;
  }
  
  reflectAlongY() {
    this.x *= -1;
  }
}

class Planet {
  constructor(x, y, g) {
    this.pos = new Vector(x, y);
    this.g = g;
  }
  
  draw() {
    ctx.fillStyle = "#AAA";
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, 8, 0, Math.PI * 2);
    ctx.fill();  
  } 
}

// A line that is part of forming the text
class Particle {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(0, spikeLength);
  }
  
  move(force) {
    if(force) {
      this.vel.addTo(force);
    }
    if(this.vel.getLength() > spikeLength) {
      this.vel.setLength(spikeLength);
    }
  }
    
  draw() {
    ctx.beginPath();
    ctx.moveTo(this.pos.x, this.pos.y);
    let p2 = this.pos.add(this.vel);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();  
  }  
}

let canvas;
let ctx;
let w, h;
let hue;
let particles;
let spikeLength;
let planets;
let A;
let B;
let a;
let b;
let tick;

function setup() {
  tick = 0;
  planets = [];
  let len = Math.round(Math.random() * 3 + 3);
  for(let i = 0; i < len; i++) {
    let p = new Planet(50 + i * 100, 340, i ? 1000 : 4000);
    planets.push(p);
  }
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("resize", reset);
  canvas.addEventListener("mousemove", mousemove);
  reset();
}

function reset() {
  hue = colorConfig.baseHue; 
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  spikeLength = w * config.widthToSpikeLengthRatio;
  A = w/2.2 ;
  B = h/2.2 ;
  a = Math.round(Math.random() + 2);
  b = Math.round(Math.random() + 2);
  drawText();
}

function mousemove(event) {
  let x = event.clientX;
  let y = event.clientY+100;
  planets[0].pos.x = x;
  planets[0].pos.y = y;
}

function draw(now) {
  clear();
  requestAnimationFrame(draw);
  updateParticles();
  updatePlanets();
  tick = now / 50;
}

function clear() {
  ctx.clearRect(0, 0, w, h);
}

function drawText() {
  ctx.save();
  let fontSize = w * animatedText.fontSize;
  ctx.font = "bold " + fontSize + "px Arial, Helvetica, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle"
  ctx.lineWidth = 0.75;
  ctx.strokeStyle = "white";
  ctx.strokeText(config.text, w/2, h/2);
  ctx.restore();
  let imageData = ctx.getImageData(0, 0, w, h);

  particles = [];

  for(let x = 0; x < w; x++) {
    for(let y = 0; y < h; y++) {
      let i = (x + w*y)*4;
      let average = (imageData.data[i] + 
                     imageData.data[i + 1] + 
                     imageData.data[i + 2] +
                     imageData.data[i + 3]) / 4;
      if(average > 200) {
        let particle = new Particle(x, y);
        particles.push(particle);
      }
    }
  }
  clear();
}

function updatePlanets() {
  let len = planets.length;
  for(let i = 1; i < len; i++) {
    let angle = Math.PI * 2 / (len - 1) * i;
    let x = A * Math.sin(a * tick / 100 + angle) + w/2;
    let y = B * Math.sin(b * tick / 100 + angle) + h/2; 
    let p = planets[i];
    p.pos.x = x;
    p.pos.y = y;
    p.draw();
  }
}

function updateParticles() {
  hue += colorConfig.hueSpeed; 
  let h = Math.sin(hue) * colorConfig.hueRange + colorConfig.baseHue;
  ctx.strokeStyle = `hsla(${h}, ${colorConfig.colorSaturation}%, 50%, ${colorConfig.particleOpacity})`;  
  particles.forEach(p => {
    // Apply the force of each planet (repeller) to the current particle
    planets.forEach(planet => {
      let d = p.pos.sub(planet.pos);
      let length = d.getLength();
      let g = planet.g / length;
      if(g > 40) {
        g = 40;
      }
      // We keep the angle of the distance
      d.setLength(g);
      p.move(d);
    });
    p.draw();
  });
}

setup();
draw(1);

// }

// window.addEventListener('resize', onWindowResize);
// document.addEventListener('DOMContentLoaded', onWindowResize);
