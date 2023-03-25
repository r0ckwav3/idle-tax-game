import React, {useState} from 'react';
import game from './Game.js';
import MilestoneBox from "./MilestoneBox.js"

export default function UpgradesPanel(){
  const activeCategories = useUpgradeCategories();
  const [selectedCategory, setSelectedCategory] = useState(0);

  const sidebarButtons = activeCategories.map((r, i) => {
    return (<button key={r.name} className="upgradeSidebarButton" onClick={()=>setSelectedCategory(i)}>
      {r.displayName}
    </button>);
  });

  const upgradeContent = <UpgradeTree category={activeCategories[selectedCategory]}/>;

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
  return (
  <div style={{paddingLeft:"500px"}}>
    You are looking at {category.displayName}
    <br />
    <MilestoneBox milestoneName="wheat_double_1"/>
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
