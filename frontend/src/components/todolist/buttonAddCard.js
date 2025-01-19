import "./buttonAddCard.css"
export const ButtonAddCard = ({changeVisibilityFormTask}) =>{
    return (
        <button className="buttonAddCard" onClick={changeVisibilityFormTask}>
          + 
        </button>
    )
}