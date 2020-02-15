
var gameBall; 
var player1;
var player2;
var p1Score;
var p2Score;
class Ball {

  constructor (x, y, dx, dy, size, color) {

    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.size = size;
    this.color = color;
  }

  move() {

    this.x += this.dx;
    this.y += this.dy;
  }

  update() {

    fill(this.color); 
    ellipse(this.x, this.y, this.size, this.size); 
  }

  bounce() {

    if (this.y + this.size > windowHeight) {
      this.dy *= -1;
    }
    else if (this.y - this.size < 0) {
      this.dy *= -1;
    }

    if (this.x + this.size > player2.x - player2.width/2 && this.y - this.size < player2.y + player2.length/2 && this.y + this.size > player2.y - player2.length/2) {
      this.dx *= -1;
    }
    else if (this.x - this.size < player1.x + player1.width/2 && this.y - this.size < player1.y + player1.length/2 && this.y + this.size > player1.y - player1.length/2) {
      this.dx *= -1;
    }
  }

  checkBounds() {

    if (this.x - this.size < 0) {
      p2Score++; 
      this.x = windowWidth/2;
      this.y = windowHeight/2;
    }
    else if (this.x + this.size > windowWidth) {
      p1Score++; 
      this.x = windowWidth/2;
      this.y = windowHeight/2;
    }
  }

  vanish() {
    this.color = 0; 
  }
  
  stop() {
    this.dx = 0;
    this.dy = 0;
  }
}

class Paddle {

  constructor (x, y, width, length, player) {
    
    this.x = x;
    this.y = y;
    this.width = width;
    this.length = length;
    this.player = player;
  }

  update() {

    fill(255);
    rect(this.x, this.y, this.width, this.length); 
    
  }

  up() {
    if (this.y - this.length/2 > 0) {
        this.y -= 5; 
    }
  }

  down() {
    if (this.y + this.length/2 < windowHeight) {
      this.y += 5; 
    }
  }

  move() {

    if (this.player == 2) {

      if (keyIsDown(UP_ARROW)) {
        this.up();
      }
      else if (keyIsDown(DOWN_ARROW)) {
        this.down();
      }
    }
    
    if (this.player == 1) {
      if (keyIsDown(87)) {
        this.up(); 
      }
      else if (keyIsDown(83)) {
        this.down();
      }
    }
   
  }
}

function setup() {

  ellipseMode(RADIUS);
  rectMode(CENTER);
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.id('canvas');
   
  gameBall = new Ball(100, 100, 20, 20, 20, 255); 
  player1 = new Paddle(25, windowHeight/2, 50, 400, 1);
  player2 = new Paddle(windowWidth - 25, windowHeight/2, 50, 400, 2); 
  p1Score = 0;
  p2Score = 0;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function draw() {
  background(0);
  gameBall.move();
  gameBall.update();
  gameBall.bounce();
  gameBall.checkBounds();

  player1.update();
  player1.move();
  player2.move();
  player2.update();

  textSize(100);
  text(p1Score, windowWidth/4, 100); 
  text(p2Score, windowWidth*3/4, 100); 

  if (p1Score == 5 || p2Score == 5) {
    textAlign(CENTER, CENTER);
    text("Game Over!", windowWidth/2, windowHeight/2);
    gameBall.stop(); 
    gameBall.vanish();
  }
}