import eventManager from "./EventManager.js";
import Resource, {resourcelist} from "./Resource.js";

class Game{
  constructor(){
    this.gold = 0;
    this.resources = resourcelist;
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
    this.gold += resource.runHarvest();
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

let game = new Game();
export default game;
