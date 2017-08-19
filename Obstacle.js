function Obstacle(x_, y_, w_, h_) {
  this.x = x_;
  this.y = y_;
  this.w = w_;
  this.h = h_;
  this.show = function() {
    rect(this.x, this.y, this.w, this.h);
  }
}