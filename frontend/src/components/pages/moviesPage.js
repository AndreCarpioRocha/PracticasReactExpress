import { Header } from "../header/header";
import { MainTitle } from "../titles/mainTitle";
import "./moviesPage.css";

export const MoviesPage = () => {
    return (
        <>
            <Header></Header>
            <MainTitle title="Movies"></MainTitle>
            <form style={{display: "flex", flexDirection : "row", justifyContent: "center",alignItems:"center" ,gap: "10px" }} >
                <input  style={{margin: "0px" , minWidth: "300px"}} type="text" name="" id=""  placeholder="Enter a movie name"/>
                <button style={{margin: "0px"}}  type="submit">Search</button>
            </form>
        </>
    )
}
