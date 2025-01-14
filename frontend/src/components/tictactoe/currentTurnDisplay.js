import "./currentTurnDisplay.css";

export const CurrentTurnDisplay = ({ turn }) => {
    return (
        <div className="currentTurnDisplay">
            <div className="sign">
                <p className="title">TURN</p>
                <p className="simbol">{turn}</p>
            </div>
        </div>
    )
}