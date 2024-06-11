let player;
let bullets = [];
let enemies = [];
let score = 0;

function setup() {
  createCanvas(500, 300);
  player = new Player(250, 250, 50);
}

function draw() {
  background("#607D8B");
  player.draw();
  player.move();

  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].draw();
    bullets[i].move();
    if (bullets[i].posY < 0) {
      bullets.splice(i, 1);
    } else {
      for (let j = enemies.length - 1; j >= 0; j--) {
        if (bullets[i].hits(enemies[j])) {
          bullets.splice(i, 1);
          enemies.splice(j, 1);
          score += 10;
          break;
        }
      }
    }
  }

  if (frameCount % 60 === 0) {
    let enemy = new Enemy(random(width), 0, 30);
    enemies.push(enemy);
  }

  for (let enemy of enemies) {
    enemy.draw();
    if (enemy.hits(player)) {
      // Game Over Logic (You can implement this)
    }
  }

  fill(255);
  textSize(24);
  text("Score: " + score, 20, 30);
}

class Player {
  constructor(posX, posY, size) {
    this.posX = posX;
    this.posY = posY;
    this.size = size;
  }

  draw() {
    fill("white");
    rect(this.posX, this.posY, this.size, this.size);
    fill("black");
    rect(this.posX + 10, this.posY - 10, 10, 30);
    fill("white");
    rect(this.posX + 30, this.posY + 5, 5, 20);
    rect(this.posX - 5, this.posY + 5, 5, 20);
    rect(this.posX + 12, this.posY - 20, 5, 20);
  }

  move() {
    if (keyIsDown(LEFT_ARROW) && this.posX >= 5) {
      this.posX -= 5;
    }

    if (keyIsDown(RIGHT_ARROW) && this.posX <= width - this.size) {
      this.posX += 5;
    }

    if (keyIsDown(UP_ARROW) && this.posY >= 5 + this.size) {
      this.posY -= 5;
    }

    if (keyIsDown(DOWN_ARROW) && this.posY <= height - this.size) {
      this.posY += 5;
    }

    if (keyIsDown(32)) { // 32 is the ASCII code for spacebar
      this.shoot();
    }
  }

  shoot() {
    let bullet = new Bullet(this.posX + this.size / 2, this.posY, 5, 10);
    bullets.push(bullet);
  }
}

class Bullet {
  constructor(posX, posY, sizeX, sizeY) {
    this.posX = posX;
    this.posY = posY;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
  }

  draw() {
    fill("red");
    rect(this.posX, this.posY, this.sizeX, this.sizeY);
  }

  move() {
    this.posY -= 10;
  }

  hits(enemy) {
    return (
      this.posX > enemy.posX &&
      this.posX < enemy.posX + enemy.size &&
      this.posY > enemy.posY &&
      this.posY < enemy.posY + enemy.size
    );
  }
}

class Enemy {
  constructor(posX, posY, size) {
    this.posX = posX;
    this.posY = posY;
    this.size = size;
  }

  draw() {
    fill("green");
    rect(this.posX, this.posY, this.size, this.size);
    this.posY++;
  }

  hits(player) {
    return (
      this.posX < player.posX + player.size &&
      this.posX + this.size > player.posX &&
      this.posY < player.posY + player.size &&
      this.posY + this.size > player.posY
    );
  }
}
