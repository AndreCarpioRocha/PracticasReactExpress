import "./resultBanner.css";

export const ResulBanner = ({ title = "", simbol = "", visibleBanner = false , setVisibleBanner}) => {

    return (
        <div className="resultBanner" style={{ display: visibleBanner ? "flex" : "none" }}>
            <div className="messageContainer">
                <p className="title">{title}</p>
                <p className="simbol">{simbol}</p>
                <button className="btnCloseBanner" onClick={()=>{setVisibleBanner(false)}}>✘</button>
            </div>
            
        </div>
    )
}