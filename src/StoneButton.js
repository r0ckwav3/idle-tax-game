import React, {useState} from 'react';

export function StoneButton2x1({onClick, selected, children}){
  const [hover, setHover] = useState(false);

  const unselectedStyle = {backgroundImage:`url(${require("./images/buttons/2x1Button.png")})`};
  const hoverStyle = {backgroundImage:`url(${require("./images/buttons/2x1ButtonHover.png")})`};
  const selectedStyle = {backgroundImage:`url(${require("./images/buttons/2x1ButtonSelected.png")})`};
  const style = selected ? selectedStyle : (hover ? hoverStyle : unselectedStyle);
  return(
    <div className="stoneButtonBG" style={style} onClick={onClick} onMouseOver={()=>setHover(true)} onMouseOut={()=>setHover(false)}>
        {children}
    </div>
  );
}
