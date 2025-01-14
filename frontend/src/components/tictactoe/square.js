import "./square.css"
export const Square = ({simbolo, checkSquare}) => {

    return(
        <div className="square" onClick={checkSquare}>
            <p>{simbolo}</p>
        </div>
    )
}