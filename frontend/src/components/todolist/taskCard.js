import "./taskCard.css"

export const TaskCard = ({ title = "Sin titulo", content = "Sin contenido", cardColor = "#FDF2B3" }) => {

    const getRandomColor = () => {
        const colors = ["#FDF2B3", "#D1EAED", "#FFDADA", "#FFD4A9"]
        return colors[Math.floor(Math.random() * colors.length)]
    }
    return (
        <div className="taskCard" style={{ backgroundColor: getRandomColor() }}>
            <p className="titleCard">{title}</p>
            <p className="contentCard">{content}</p>
        </div>
    )
}