import milestoneManager from "./MilestoneManager.js"
import eventManager from "./EventManager.js"

class Game{
  constructor(){
    this.gold = 0;
    this.resources = [];
    this.resources.push(new Resource(0, "wheat", "Wheat", 10, 2000));
    this.resources.push(new Resource(1, "cattle", "Cattle", 10, 2000));
    // temp
    this.resources[0].active = true;
  }

  // dt: time since last game tick, in milliseconds
  gameTick(dt){
    const oldgold = this.gold;
    this.resources.forEach((resource) => {
      if(resource.active){
        const amount = resource.gameTick(dt);
        if(amount > 0){
          for(let i = 0; i<amount; i++){
            this.harvestResource(resource)
          }
        }
      }
    });
    if(oldgold !== this.gold){
      eventManager.sendEvent({name: "updateGold", value: this.gold})
    }
  }

  harvestResource(resource){
    this.gold += resource.value;
  }

  attemptPurchase(cost){
    if(this.gold < cost){
      return false;
    }else{
      this.gold-=cost;
      eventManager.sendEvent({name: "updateGold", value: this.gold})
      return true;
    }
  }
}

// baseinterval is in milliseconds
// id corresponds to index in resources array
class Resource{
  constructor(id, name, displayName, basevalue, baseinterval){
    this.id = id;
    this.name = name;
    this.displayName = displayName;
    this.basevalue = basevalue;
    this.baseinterval = baseinterval;
    this.active = false;

    this.value = basevalue;
    this.interval = baseinterval;

    this.timer = 0;
  }

  gameTick(dt){
    this.timer += dt;
    if(this.timer > this.interval){
      const toreturn = Math.floor(this.timer/this.interval);
      this.timer = this.timer % this.interval;
      return toreturn;
    }
    return 0;
  }

  get calculateValue(){
    return this.basevalue;
  }

  get calculateInterval(){
    return this.baseinterval;
  }

  set setActive(a){
    this.active = a;
  }
}

let game = new Game();
export default game;
