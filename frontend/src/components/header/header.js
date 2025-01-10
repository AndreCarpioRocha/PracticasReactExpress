import { Link } from "react-router-dom"
import "./header.css";
export const Header = () => {
    return (
        <div className="header-pesonalizado">
            <Link to="/">Inicio</Link>
            <Link to="/pointerFollower">Ver Pointer Follower</Link>
            <Link to="/twitterFollowCardd">Ver twitter Follow Card </Link>
            <Link to="/tictactoe">Ver tictactoe</Link>
        </div>
    )
}