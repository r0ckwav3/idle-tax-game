import React, {useState} from 'react';
import UpgradesPanel from './UpgradesPanel.js';
import MilestoneBox from "./MilestoneBox.js";
import {StoneButton2x1} from "./StoneButton.js";

export default function BottomPanel(){
  const [selectedTab, setSelectedTab] = useState(1);

  function handleClick(n){
    setSelectedTab(n);
  }

  let currentPanel;
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
    default:
      currentPanel = "invalid tab selected";
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
  // TODO: move some css into the .css files
  // TODO: maybe make these smaller or otherwise make better use of the large space
  return(
  <div className="bottomSelector">
    <StoneButton2x1 onClick={()=>{onClick(0)}} selected={selected===0}>
      Achievements
    </StoneButton2x1>
    <StoneButton2x1 onClick={()=>{onClick(1)}} selected={selected===1}>
      Upgrades
    </StoneButton2x1>
    <StoneButton2x1 onClick={()=>{onClick(2)}} selected={selected===2}>
      Land
    </StoneButton2x1>
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
