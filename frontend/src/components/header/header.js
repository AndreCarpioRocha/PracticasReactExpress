import { Link, useLocation } from "react-router-dom"
import "./header.css";
export const Header = () => {
    const location = useLocation();
    return (
        <div className="header-pesonalizado">
            <Link to="/" className= {location.pathname === "/"? "active" :"" }>Inicio</Link>
            <Link to="/pointerFollower" className= {location.pathname === "/pointerFollower"? "active" :"" }  >PointerFollower</Link>
            <Link to="/tictactoe" className= {location.pathname === "/tictactoe"? "active" :"" }  >Tictactoe</Link>
            <Link to="/moviesStore" className= {location.pathname === "/moviesStore"? "active" :"" }  >Movies</Link>
            <Link to="/twitterFollowCard" className= {location.pathname === "/twitterFollowCard"? "active" :"" }  >Follow Card </Link>            
        </div>
    )
}