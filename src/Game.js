import milestoneManager from "./MilestoneManager.js"
import eventManager from "./EventManager.js"

export default class Game{
  constructor(){
    this.gold = 0;
    this.resources = [];
    this.resources.push(new Resource(0, "Wheat", 10, 500));
    this.resources.push(new Resource(1, "Cattle", 10, 500));
    // temp
    // eventManager.createHook("updateGold", e => console.log(e.value));
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
}

// baseinterval is in milliseconds
// id corresponds to index in resources array
class Resource{
  constructor(id, name, basevalue, baseinterval){
    this.id = id;
    this.name = name;
    this.basevalue = basevalue;
    this.baseinterval = baseinterval;
    this.active = true;

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
