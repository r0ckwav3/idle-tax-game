import React, {useState, useEffect} from 'react';
import eventManager from './EventManager.js';

export default function TopPanel(){
  return(
  <div className="topPanel">
    <GoldDisplay />
  </div>
  );
}

function GoldDisplay(){
  let gold = useGold();
  return <h2> {gold} </h2>;
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
