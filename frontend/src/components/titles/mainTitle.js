import "./mainTitle.css"

export const MainTitle = ( {title = ""}) => {
    return (
        <>
            <div className="mainTitle">
                <p>{title}</p>
            </div>
        </>
    )
}