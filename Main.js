var rockets = [];
var bf = -1;
var br;
var routeCount;
var rocketCount = 50;
var Mag = 30; 
var spawnPoint;
var target;
var maxMutated = 5;
var myFont;
var Obstacles = [];

function preload() {
  myFont = loadFont('VT323.ttf');
}

function setup() {
  // do not move createCanvas pls.
  createCanvas(windowWidth, windowHeight);
  routeCount = floor(width / Mag * 1.5);
  spawnPoint = new Point(20, height/2);
  target = new Point(width-10, height/2);
  
  background(100);
  noStroke();
  fill(255, 70);
  
  textFont(myFont);
  textSize(100);
  textAlign(CENTER);
  //frameRate(60);
 // Obstacles.push(new Obstacle(width/3, height/2 - 20, 70 , 400));
  Obstacles.push(new Obstacle(width/1.5, 0, 70 , 300));
  for( var i=0; i < rocketCount; i++) rockets.push(new Rocket());
}

function draw() {
  background(100);
  text(nfc(bf, 4), width/2, height/2);
  push();
  fill('#32cd32');
  // drawing start point
  ellipse(spawnPoint.pos.x, spawnPoint.pos.y, spawnPoint.d, spawnPoint.d);
  // drawing finish point. It is supposed to be gradienting. ENGLAND IS MY CITY
  /*colorMode(HSB, 360, 100, 100);
  for (i = 40; i >= 4; i-=40/14) {
    fill(map(i, 4, 40, 180, 0) * (sin(frameCount*0.1) + 1) , 100, 100);
    ellipse(target.x, target.y, i, i);
  }*/
  // but to be simple I use this
  fill('#ff4d00');
  ellipse(target.pos.x, target.pos.y, target.d, target.d);
  pop();
  
  for( i=0; i < rockets.length; i++){
    rockets[i].show();
    //console.log(rockets[i].pos.y);
    if (!rockets[i].killed) {
     rockets[i].applyForce();           //it is a fittness counter inside
    }
  }
  for (i=0; i<Obstacles.length; i++) {
    Obstacles[i].show();
  }
  
  //finding best fitness with route killing everithing and respawning
  if (rockets.every(IsDead)) {
    findBest();
    respawn();
  }
  
  //moving start and finish
  if (mouseIsPressed){
    if (dist(mouseX, mouseY, target.pos.x, target.pos.y) < target.d/2) {
      target.pos.x = mouseX;
      target.pos.y = mouseY;
    }
    else if (dist(mouseX, mouseY, spawnPoint.pos.x, spawnPoint.pos.y) < spawnPoint.d/2) {
      spawnPoint.pos.x = mouseX;
      spawnPoint.pos.y = mouseY;
    }
    bf = 0;
  }
}