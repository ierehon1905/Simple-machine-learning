function mousePressed() {
  for (var i = 0; i < points.length; i++) {
    if (dist(mouseX, mouseY, points[i].pos.x, points[i].pos.y) < points[i].d/2) {
      if (!points[i].dragged) points[i].dragged  = true;
      else points[i].dragged = false;
      console.log(i, points[i].dragged);
      break;
    }
  }
}