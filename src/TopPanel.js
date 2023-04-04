import React, {useState, useEffect} from 'react';
import eventManager from './EventManager.js';

export default function TopPanel(){
  return(
  <div className="topPanel">
    <GoldDisplay />
    <div className="topButtons">
      Stats
      Help
      Settings
    </div>
  </div>
  );
}

function GoldDisplay(){
  let gold = useGold();
  return (
  <div className="resourceDisplay">
    <h2> {gold} </h2>
  </div>
  );
}

function useGold(){
  let [gold, setGold] = useState(0);
  useEffect(()=>{
    const eventHook = eventManager.createHook("updateGold", e => setGold(e.value));
    return () => {
      eventManager.removeHook(eventHook);
    };
  });
  return gold;
}
