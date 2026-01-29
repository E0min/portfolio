let night;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // HSB mode: Hue (0-360), Saturation (0-100), Brightness (0-100), Alpha (0-100)
  colorMode(HSB, 360, 100, 100, 100);
  night = new Night();
}

function draw() {
  // Clear background completely with opaque black
  background(0, 0, 0);
  night.display();
}

function mousePressed() {
  night.launchFirework(mouseX, mouseY);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Night {
  constructor() {
    this.stars = [];
    this.fireworks = [];
    this.gravity = createVector(0, 0.2);
    this.initStars(200);
  }

  initStars(count) {
    for (let i = 0; i < count; i++) {
      this.stars.push({
        x: random(width),
        y: random(height),
        brightness: random(50, 100),
        flickerSpeed: random(0.01, 0.05),
        size: random(2, 4),
      });
    }
  }

  drawStars() {
    noStroke();
    for (let star of this.stars) {
      star.brightness += sin(frameCount * star.flickerSpeed);
      // Map sine wave to valid brightness range
      let b = map(sin(frameCount * star.flickerSpeed), -1, 1, 50, 100);
      fill(60, 10, b, 80); // Adjusted alpha for 0-100 range
      ellipse(star.x, star.y, star.size);
    }
  }

  launchFirework(x, y) {
    // Launch multiple for a "finale" feel if desired, or just one
    this.fireworks.push(new Firework(x, y, this.gravity));
  }

  display() {
    // Stars in background
    this.drawStars();

    // Update and draw fireworks
    for (let i = this.fireworks.length - 1; i >= 0; i--) {
      this.fireworks[i].update();
      this.fireworks[i].show();

      if (this.fireworks[i].done()) {
        this.fireworks.splice(i, 1);
      }
    }
  }
}

class Particle {
  constructor(x, y, hu, firework, gravity, targetY) {
    this.pos = createVector(x, y);
    this.firework = firework; // Is this the rocket (seed) or a particle?
    this.lifespan = 500;
    this.hu = hu;
    this.acc = createVector(0, 0);
    this.history = []; // For trail

    if (this.firework) {
      // Calculate exact launch velocity to stop at targetY
      // v^2 = u^2 + 2as -> 0 = u^2 + 2*g*(targetY - startY)
      // u = sqrt(-2*g*(targetY - startY))
      // Since positive direction is down:
      // displacement = targetY - height (negative value)
      // acceleration = gravity (positive value)
      // u^2 = -2 * g * displacement
      let displacement = targetY - height;
      let u = sqrt(abs(2 * gravity.y * displacement));
      this.vel = createVector(0, -u);
    } else {
      this.vel = p5.Vector.random2D();
      // Depth effect: Random magnitude multiplier passed from Firework or randomized here?
      // Logic handled in Firework for consistent depth per explosion
    }
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    if (this.firework) {
      // Record history for rocket
      this.history.push(this.pos.copy());
      if (this.history.length > 60) {
        this.history.splice(0, 1);
      }
    } else {
      this.vel.mult(1); // Air resistance / drag for explosion particles

      // Decay based on velocity: Faster particles fade faster
      // Base decay 1.5 + extra based on speed (tuned for 100 range)
      this.lifespan -= 1.5 + this.vel.mag() * 0.8;
    }

    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  done() {
    return this.lifespan < 0;
  }

  show() {
    // Already in correct color mode from setup

    if (this.firework) {
      // Draw Trail
      noFill();
      stroke(this.hu, 100, 100, 60); // Alpha 60/100
      strokeWeight(4);
      beginShape();
      for (let i = 0; i < this.history.length; i++) {
        vertex(this.history[i].x, this.history[i].y);
      }
      endShape();

      // Draw Head
      stroke(this.hu, 100, 100, 100);
      strokeWeight(4);
      point(this.pos.x, this.pos.y);
    } else {
      strokeWeight(4); // Particles
      stroke(this.hu, 100, 100, this.lifespan);
      point(this.pos.x, this.pos.y);
    }
  }
}

class Firework {
  constructor(targetX, targetY, gravity) {
    this.hu = random(360); // Base color (not used for particles in new logic)
    this.gravity = gravity;
    // Rocket particle
    this.firework = new Particle(targetX, height, this.hu, true, this.gravity, targetY);
    this.exploded = false;
    this.particles = [];
  }

  done() {
    return this.exploded && this.particles.length === 0;
  }

  update() {
    // 1. Update the main rocket if it exists
    if (!this.exploded) {
      this.firework.applyForce(this.gravity);
      this.firework.update();

      // Explode when it reaches the apex (velocity turns positive/downward)
      if (this.firework.vel.y >= 0) {
        this.exploded = true;
        this.explode();
      }
    }

    // 2. Update all explosion particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].applyForce(this.gravity);
      this.particles[i].update();
      if (this.particles[i].done()) {
        this.particles.splice(i, 1);
      }
    }
  }

  explode() {
    // Generate 5 random colors for this explosion
    let colors = [];
    for (let i = 0; i < 10; i++) {
      colors.push(random(360));
    }

    // Depth effect: Randomize burst power/size for this specific firework
    let scale = random(0.5, 1.5);

    // Generate many particles
    for (let i = 0; i < 150; i++) {
      // Pick one of the 5 colors randomly
      let c = random(colors);
      const p = new Particle(this.firework.pos.x, this.firework.pos.y, c, false);

      // Scale the velocity for depth
      p.vel.mult(random(2, 10) * scale);

      this.particles.push(p);
    }
  }

  show() {
    if (!this.exploded) {
      this.firework.show();
    }
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].show();
    }
  }
}
