import "./movie.css"
export const Movie = ({ title = "", img = "", info = "" }) => {
    return (
        <div className="movie">
            <p className="titleMovie"> {title}</p>
            <div className="imageMovie">
                <img src={img} alt="" />
            </div>

            <div className="infoMovie" >
                <p>{info}</p>
            </div>
        </div>
    )
}