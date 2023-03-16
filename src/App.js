import React from 'react';
import MainLoop from 'mainloop.js';
import Game from './Game.js';
import TopPanel from './TopPanel.js';
import './App.css';

let game = new Game();
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

function BottomPanel(){
  return(
  <div className="bottomPanel">
    temp
  </div>
  );
}
