import { Link } from "react-router-dom"
import "./header.css";
export const Header = () => {
    return (
        <div className="header-pesonalizado">
            <Link to="/">Inicio</Link>
            <Link to="/pointerFollower">PointerFollower</Link>
            <Link to="/twitterFollowCardd">Follow Card </Link>
            <Link to="/tictactoe">Tictactoe</Link>
            <Link to="/movies">Movies</Link>
            
        </div>
    )
}