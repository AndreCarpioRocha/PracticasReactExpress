import { Header } from "../header/header";
import { MainTitle } from "../titles/mainTitle";
import "./moviesPage.css";
import { Movie } from "../movies/movie";
import { MoviesList } from "../movies/moviesList";
import { useRef, useState } from "react";
import { LoadingBanner } from "../movies/loadingBanner";
import { NoFoundBanner } from "../movies/noFoundBanner";


export const MoviesPage = () => {

    const [movies, setMovies] = useState([])
    const [search, setSearch] = useState("")
    const [errorInput, setErrorInput] = useState("")
    const [loading, setLoading] = useState(false)
    let lastSearch = useRef(search);

    const handleSearch = (event) => {
        setSearch(event.target.value)
        searchMovies(event.target.value)
    }

    const handleForm = (event) => {
        event.preventDefault()
        searchMovies(search);
    }

    const searchMovies = (search) => {

        if (search.length < 4) {
            setErrorInput("Ingresar almenos 4 caracteres")
            return
        }

        setErrorInput("")

        if (lastSearch.current === search) return;
        lastSearch.current = search;

        setLoading(true);


        fetch(`https://www.omdbapi.com/?apikey=b51b7a82&s=${search}`)
            .then(res => res.json())
            .then(res => {
                if (res.Response === "True") {
                    if (res.Search) {
                        setMovies(res.Search);
                    } else {
                        setMovies([])
                    }
                } else {
                    setMovies([])
                }
                setLoading(false);
            })
            .catch(error => {
                console.log("Error al hacer el fech: " + error)
            })
            .finally(() => {
                setLoading(false);
            })
    }



    return (
        <>
            <Header></Header>
            <MainTitle title="Movies"></MainTitle>
            <form style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: "10px" }} onSubmit={handleForm} >
                <input onChange={handleSearch} value={search} style={{ margin: "0px", minWidth: "300px" }} type="text" name="" id="" placeholder="Enter a movie name" />
                <button style={{ margin: "0px" }} type="submit">Search</button>
            </form>

            {
                errorInput !== "" ?
                    <p style={{ textAlign: "center", color: "red" }}>{errorInput}</p> : ""
            }

            {loading ? <LoadingBanner></LoadingBanner> :
                movies.length === 0 ?
                    <NoFoundBanner></NoFoundBanner> :
                    <MoviesList>
                        {
                            movies.map(element => {
                                return (
                                    <Movie key={element.imdbID} title={element.Title} img={element.Poster} info={element.Year} ></Movie>
                                )
                            })
                        }
                    </MoviesList>
            }

        </>
    )
}
