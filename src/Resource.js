import milestoneManager from "./MilestoneManager.js";
import eventManager from "./EventManager.js";

// baseinterval is in milliseconds
// id corresponds to index in resources array
export default class Resource{
  constructor(id, name, displayName, basevalue, baseinterval){
    this.id = id;
    this.name = name;
    this.displayName = displayName;
    this.basevalue = basevalue;
    this.baseinterval = baseinterval;
    this.active = false;

    this.onHarvest = (x => x);

    this.value = basevalue;
    this.interval = baseinterval;

    this.timer = 0;

    this.hooks = []
    this.hooks.push(eventManager.createHook("updateMilestone", ()=>{this.recalculateAttributes()}));
    // I could filter out these hooks, but its not that computationally intensive
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

  // slightly different than calculateValue because it will trigger on harvest effects
  runHarvest(){
    let x = this.value;
    x = this.onHarvest(x);
    return x;
  }

  calculateValue(){
    let value = this.basevalue;
    for(let i = 0; i<4; i++){ // CHANGE LATER IF I ADD MORE UPGRADES
      if(milestoneManager.isActive(this.name+"_double_"+i)){
        value*=2;
      }
    }
    return value;
  }

  calculateInterval(){
    return this.baseinterval;
  }

  recalculateAttributes(){
    this.value = this.calculateValue();
    this.interval = this.calculateInterval();
  }

  setActive(a){
    this.active = a;
  }
}

export let resourcelist = [];
resourcelist.push(new Resource(0, "wheat", "Wheat", 10, 2000));
resourcelist.push(new Resource(1, "cattle", "Cattle", 10, 2000));

// On harvest functions
resourcelist[0].onHarvest = (x) => {
  if(milestoneManager.getMilestone("wheat_special_1").active){
    if(Math.random() < 0.1){
      return x*2;
    }
  }
  return x;
}
