import React from 'react';
import './App.css';

export default function App() {
    return (
    <div className="App">
      <TopPanel />
      <MiddlePanel />
      <BottomPanel />
    </div>
    );
}

function TopPanel(){
  return(
  <div className="topPanel">
    temp
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
