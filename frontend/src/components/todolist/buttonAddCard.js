import "./buttonAddCard.css"
export const ButtonAddCard = ({changeVisibilityFormNewTask}) =>{
    return (
        <button className="buttonAddCard" onClick={changeVisibilityFormNewTask}>
          + 
        </button>
    )
}