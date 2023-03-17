import eventManager from "./EventManager.js"

export default class MilestoneManager{
  constructor(){
    this.milestones = [];
    this.currentid = 0;
  }

  createMilestone(name, cost, kind, description){
    let milestone = new Milestone(currentid, name, cost, kind, description);
    this.milestones.push(milestone);
    this.currentid += 1;
    return milestone;
  }

  getMilestone(name){
    let ans = null;
    this.milestones.foreach((ms)=>{
      if(ms.name === name){
        ans = ms;
      }
    });
    return ans;
  }

  // react hooks and stuff should use this one, since its significantly faster
  // and you only need to search the whole list once to get the id and store it
  isActiveID(id){
    return this.milestones[id].active;
  }

  isActive(name){
    return this.getMilestone(name).active;
  }

  setActive(name, active){
    let milestone = this.getMilestone(name);
    milestone.active = active;
    eventManager.sendEvent({
      name: "updateMilestone",
      milestoneName: name,
      milestoneID: milestone.id,
      value: active
    });
  }
}

class Milestone{
  constructor(id, name, cost, kind, description){
    this.id = id; // id corresponds to position in list
    this.name = name;
    this.description = description;
    this.active = false;
    this.cost = cost; // negative cost means not purchasable
    this.prerequisites = [];

    this.kind = kind; // achievement, upgrade_global, upgrade_wheat etc.
    this.pos = null; // used when making upgrade trees
  }
}
