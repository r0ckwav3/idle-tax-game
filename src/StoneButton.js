export function StoneButton2x1({onClick, selected, children}){
  const unselectedStyle = {backgroundImage:`url(${require("./images/buttons/2x1Button.png")})`};
  const style = unselectedStyle;
  return(
    <div className="stoneButtonBG" style={style} onClick={onClick}>
        {children}
    </div>
  );
}
