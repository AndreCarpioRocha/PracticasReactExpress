import "./taskCard.css"

export const TaskCard = ({title = "Sin titulo", content = "Sin contenido", cardColor = "#FDF2B3" }) =>{
    return (
        <div className="taskCard" style={{backgroundColor :  cardColor }}>
            <p className="titleCard">{title}</p>
            <p className="contentCard">{content}</p>
        </div>
    )
}