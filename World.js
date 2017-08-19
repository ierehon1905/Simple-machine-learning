function respawn(){
  rockets.push(new Rocket());
  rockets[0].route = br;
  for (var i= 0; i < rocketCount - 1; i++) {
   rockets.push(new Rocket(br));
   
  }
}

function findBest() {
  for(i=0; i < rockets.length; i++) {
    if (rockets[i].fittness > bf){
     br = rockets[i].route;
     bf = rockets[i].fittness;
    }
  }
  rockets = [];
}

function IsDead(rocket_) {
  return rocket_.killed;
}