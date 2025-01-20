import "./taskCard.css"

export const TaskCard = ({ title = "Sin titulo", content = "Sin contenido", color = "#FDF2B3" }) => {

    return (
        <div className="taskCard" style={{ backgroundColor: color }}>
            <p className="titleCard">{title}</p>
            <div className="containerContentCard" style={{ overflowY: "auto", flex: 1 }}>
                <p className="contentCard">{content}</p>
            </div>
        </div>
    )
}