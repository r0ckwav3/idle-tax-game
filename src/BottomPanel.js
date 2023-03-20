import React, {useState} from 'react';
import UpgradesPanel from './UpgradesPanel.js';
import {MilestoneBox} from "./MilestoneManager.js"

export default function BottomPanel(){
  const [selectedTab, setSelectedTab] = useState(1);

  function handleClick(n){
    setSelectedTab(n);
  }

  let currentPanel = "invalid tab selected";
  switch(selectedTab){
    case 0:
      currentPanel = <AcheivementsPanel key="BottomPanel0"/>;
      break;
    case 1:
      currentPanel = <UpgradesPanel key="BottomPanel1"/>;
      break;
    case 2:
      currentPanel = <LandPanel key="BottomPanel2"/>;
      break;
  }

  return(
  <div>
    <BottomSelector onClick={handleClick} selected={selectedTab}/>
    <div className="bottomPanel">
      {currentPanel}
    </div>
  </div>
  );
}

function BottomSelector({ onClick, selected }){
  // TODO: mark the selected tab somehow
  return(
  <div className="bottomSelector">
    <button className="bottomSelectorButton" onClick={()=>{onClick(0)}}>
      Achievements
    </button>
    <button className="bottomSelectorButton" onClick={()=>{onClick(1)}}>
      Upgrades
    </button>
    <button className="bottomSelectorButton" onClick={()=>{onClick(2)}}>
      Land
    </button>
  </div>
  );
}

function AcheivementsPanel(){
  return (
    <div style={{paddingLeft:"500px"}}>
    achievments! Here's one:
    <br />
    <MilestoneBox milestoneName="wheat_achievement_1"/>
  </div>
  );
}

function LandPanel(){
  return <div style={{textAlign: "center"}}> land! </div>;
}
