import "./settingsMenu.css"

export const SettingMenu = ({ size, background,transparecy,borderColor, setBackGround , setBorderColor,setSize, setTransperency}) => {


    return (
        <div className="settingsMenu">
            <div className="settingsMenuOption">
                <label > Background: </label>
                <input type="color"  value= {background} onChange={(event) => {
                    setBackGround("" + event.target.value)
                    
                }} />
            </div>
            <div className="settingsMenuOption">
                <label > Transparency: </label>
                <input type="range" name="" value ={transparecy} max={1} step={0.01} onChange={(event) =>{

                    setTransperency(event.target.value)
                }} />
            </div>

            <div className="settingsMenuOption">
                <label >Border:</label>
                <input type="color" name=""  value={borderColor} onChange={(event)=>{
                    setBorderColor("" + event.target.value)
                }} />
            </div>

            <div className="settingsMenuOption">
                <label > Size: </label>
                <input type="range" name="" value={size.width} max={100} onChange={(event) =>{
                    setSize(event.target.value)
                }} />
            </div>
        </div>
    )
}