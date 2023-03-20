import React from 'react';
import MainLoop from 'mainloop.js';
import game from './Game.js';
import TopPanel from './TopPanel.js';
import BottomPanel from './BottomPanel.js';

MainLoop.setUpdate((dt)=>{game.gameTick(dt)}).start();

export default function App() {
    return (
    <div className="App">
      <TopPanel />
      <MiddlePanel />
      <BottomPanel />
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
