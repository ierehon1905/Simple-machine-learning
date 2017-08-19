function Rocket(a){
  this.pos = createVector(spawnPoint.pos.x, spawnPoint.pos.y);
  this.route= [];
  this.counter= 0;
  this.fittness = 0;
  this.killed = false;
  //console.log(a);
  if(!a){
    for (i=0; i < routeCount; i++) {
      this.route.push(p5.Vector.random2D()); 
      this.route[i].setMag(Mag);
      // console.log(i);
    }
  } else {
    this.route = a.slice();
    //mutate block.
    
    for(var i = 0, index = floor(random(a.length - maxMutated)); i< maxMutated- floor(random(maxMutated)); i++, index++) {
      //console.log(this.route[i]);
      this.route[index] = p5.Vector.random2D().setMag(Mag);  //this.route[i].rotate(0.2*pow(-1, i));
    }
  }
  
  //console.log(mutate(this.route));
  this.applyForce = function() {
    if (this.counter == this.route.length-1 || this.outsideBorders() || this.inObstacle()){
      this.countFittness();
      if (this.inObstacle()) this.fittness*= 0.5;
      //console.log(this.fittness);
      this.killed = true;
    }
    this.pos.add(this.route[this.counter]);
    this.counter++;
  }
  this.countFittness = function() {
   this.fittness = 1/this.pos.dist(target.pos)*100; 
  }
  this.show = function() {
    ellipse(this.pos.x, this.pos.y, 10, 10);
  }
  this.outsideBorders = function() {
    return this.pos.x > width + 20 || this.pos.x < -20 || this.pos.y > height + 20 || this.pos.y < -20; 
  }
 this.inObstacle = function() {
   //yet not implemented
   for (var i = 0; i < Obstacles.length; i++) {
     if (this.pos.x > Obstacles[i].x &&
         this.pos.x < Obstacles[i].x + Obstacles[i].w &&
         this.pos.y > Obstacles[i].y &&
         this.pos.y < Obstacles[i].y + Obstacles[i].h) {
       return true;
     } else {return false}
   }
 }
}