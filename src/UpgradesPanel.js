import React, {useState, useEffect} from 'react';
import game from './Game.js';
import MilestoneBox from "./MilestoneBox.js"
import milestoneManager from "./MilestoneManager.js"
import eventManager from "./EventManager.js"

export default function UpgradesPanel(){
  const activeCategories = useUpgradeCategories();
  const [selectedCategory, setSelectedCategory] = useState(0);
  const thisCategory = activeCategories[selectedCategory];

  const sidebarButtons = activeCategories.map((r, i) => {
    return (<button key={r.name} className="upgradeSidebarButton" onClick={()=>setSelectedCategory(i)}>
      {r.displayName}
    </button>);
  });

  const upgradeContent = <UpgradeTree category={thisCategory} key={"upgrade_tree_"+thisCategory.name}/>;

  return (
    <div className="upgradesPanel">
      <div className="upgradeSidebar">
        {sidebarButtons}
      </div>
      {upgradeContent}
    </div>
    );
}

function UpgradeTree( {category} ){
  // The current way i'm doing this is slow, but I can't get the custom hook to work correctly
  // const relevantUpgrades = useRelevantUpgrades(category);
  const relevantUpgrades = milestoneManager.getMilestonesbyCategory("upgrade_"+category.name);

  const boxes = relevantUpgrades.map(m => <MilestoneBox milestoneID={m.id} />);
  console.log("upgrade_"+category.name);
  console.log(relevantUpgrades);
  console.log(boxes);
  console.log("----");
  return (
  <div style={{display:"flex"}}>
    You are looking at {category.displayName}
    <div>
      {boxes}
      {/* <MilestoneBox milestoneName="wheat_double_1"/> */}
    </div>
  </div>
  );
}

function useUpgradeCategories(){
  // TODO: make an event for when something gets unlocked
  const [upgradeCategories, setUpgradeCategories] = useState(
    [{name: "global", displayName: "General Upgrades"}, ...game.resources.filter(r => r.active)]
  );
  return upgradeCategories;
}

// function useRelevantUpgrades(category){
//   const [relevantUpgrades, setRelevantUpgrades] = useState([]);

//   useEffect(()=>{
//     const eventHook = eventManager.createHook("finishMilestoneInit", _ => {
//       console.log("This event: finishMilestoneInit has occured");
//       setRelevantUpgrades(milestoneManager.getMilestonesbyCategory("upgrade_"+category.name));
//     });

//     return () => {
//       eventManager.removeHook(eventHook);
//     };
//   });

//   return relevantUpgrades;
// }
