import eventManager from "./EventManager.js";

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

  isActive(id){
    return this.milestones[id].active;
  }

  setActive(id, active){
    console.log("setActive(", id, "+", active, ");")
    let milestone = this.getMilestonebyID(id);
    milestone.active = active;
    eventManager.sendEvent({
      name: "updateMilestone",
      milestoneName: milestone.name,
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

// export
let milestoneManager = new MilestoneManager();
export default milestoneManager;
// create the milestones
// misc
milestoneManager.createMilestone("unknown", "???", -1, "other", "You have not unlocked this yet.");

// -- UPGRADES --
// Global Upgrades

// Wheat Upgrades
milestoneManager.createMilestone("wheat_double_1", "Plowed Fields", 200, "upgrade_wheat", "Double the output of your feilds.");

// -- Acheivements --
milestoneManager.createMilestone("wheat_achievement_1", "First Field", -1, "achievement", "Purchase your first field.");
