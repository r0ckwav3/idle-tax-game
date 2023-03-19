import eventManager from "./EventManager.js"

class MilestoneManager{
  constructor(){
    this.milestones = [];
    this.currentid = 0;
  }

  createMilestone(name, displayName, cost, kind, description){
    let milestone = new Milestone(this.currentid, name, displayName, cost, kind, description);
    this.milestones.push(milestone);
    this.currentid += 1;
    return milestone;
  }

  getMilestone(name){
    let ans = null;
    this.milestones.forEach((ms)=>{
      if(ms.name === name){
        ans = ms;
      }
    });
    return ans;
  }

  getMilestonebyID(id){
    return this.milestones[id];
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
      active: active
    });
  }
}

class Milestone{
  constructor(id, name, displayName, cost, kind, description){
    this.id = id; // id corresponds to position in list
    this.name = name; // name should be snake case
    this.displayName = displayName; // display name can be anything
    this.description = description;
    this.active = false;
    this.cost = cost; // negative cost means not purchasable
    this.prerequisites = [];

    this.kind = kind; // achievement, upgrade_global, upgrade_wheat etc.
    this.pos = null; // used when making upgrade trees
  }
}

export function MilestoneBox({ milestoneName }){
  // TODO: allow using IDs intstead of names
  // TODO: change this to use a custom hook
  // TODO: add a tooltip
  const milestone = milestoneManager.getMilestone(milestoneName);
  const imgpath = require("./images/milestones/"+milestone.kind+"/"+milestone.name+".png");

  return (<img className="milestone-box" src={imgpath} alt={milestone.displayName}/>);
}

// export
let milestoneManager = new MilestoneManager();
export default milestoneManager;
// create the milestones
// misc
milestoneManager.createMilestone("unknown", "???", -1, "other", "You have not unlocked this yet.");
