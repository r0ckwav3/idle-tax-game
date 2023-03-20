import React from 'react';
import MainLoop from 'mainloop.js';
import game from './Game.js';
import TopPanel from './TopPanel.js';
import BottomPanel from './BottomPanel.js';
import { TooltipManager } from "./Tooltip.js";

MainLoop.setUpdate((dt)=>{game.gameTick(dt)}).start();

export default function App() {
    return (
    <div className="App">
      <TooltipManager>
        <TopPanel />
        <MiddlePanel />
        <BottomPanel />
      </ TooltipManager>
    </div>
    );
}

function MiddlePanel(){
  return(
  <div className="middlePanel">
    temp
  </div>
  );
}
