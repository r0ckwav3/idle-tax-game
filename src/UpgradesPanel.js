import React, {useState} from 'react';
import game from './Game.js';
import {MilestoneBox} from "./MilestoneManager.js"

export default function UpgradesPanel(){
  const activeCategories = useUpgradeCategories();
  const [selectedCategory, setSelectedCategory] = useState(0);

  const sidebarButtons = activeCategories.map((r, i) => {
    return (<button className="upgradeSidebarButton" onClick={()=>setSelectedCategory(i)}>
      {r.displayName}
    </button>);
  });

  console.log(sidebarButtons);

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
  <div style = {{textAlign: "center"}}>
    You are looking at {category.displayName}
    <br />
    <MilestoneBox milestoneName="unknown"/>
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
