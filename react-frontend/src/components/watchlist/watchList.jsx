import "./watchList.css"
import NavB from "../navB/navB"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

export default function WatchList(){
    const[watchlist, setWatchlist] = useState();
    const[movies, setMovies] = useState();
    const[allMovies, setAllMovies] = useState();
    const[currMovie, setCurrMovie] = useState("");
    const[reRender, setReRender] = useState(false);
    const navigate = useNavigate();
    let ok;

    useEffect(() => {
        const title = document.querySelector(".title-title")
        title.innerHTML = "Movie App - Watchlist"
        fetch("http://localhost:8080/api/v1/watchlist/65f18d50425cb202f01da7a6")
        .then(response => response.json())
        .then(json => {
            setWatchlist(json.moviesList)
            fetch("http://localhost:8080/api/v1/movie")
            .then(response => response.json())
            .then(json => {
                setAllMovies(json)
                let temp = []
                json.map((obj) => temp.push(obj.imdbId))
                setMovies(temp)
                setReRender(true)
            })
        })

        return () => {
            const title = document.querySelector(".title-title")
            title.innerHTML = "Movie App"
        }
    }, [reRender])

    function handleAdd(){
        if(currMovie.trim() !== ""){
            if(!watchlist.includes(currMovie)){
               setWatchlist(w => [...w, currMovie])
            } else {
                controllo()
            }
            setCurrMovie("")
        }
    }

    
    function filtra(obj, id){
        for(let i = 0; i < Object.keys(obj).length; i++){
            if(obj[i].imdbId == id) return obj[i].title
        }
    }

    function controllo(){
        const temp = movies.filter((val) => !watchlist.includes(val))
        setMovies(temp);
    }

    function handleUp(key){
        if(key > 0){
            const temp = [... watchlist];
            [temp[key], temp[key-1]] = [temp[key-1], temp[key]]
            setWatchlist(temp)
        }
    }

    function handleDown(key){
        if(key < watchlist.length-1){
            const temp = [... watchlist];
            [temp[key+1], temp[key]] = [temp[key], temp[key+1]]
            setWatchlist(temp)
        }
    }

    function handleDelete(key){
        setMovies(m => [...m, watchlist[key]])

        const temp = watchlist.filter((_, id) => id !== key)
        setWatchlist(temp)
    }

    function handleSave(){
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"list": watchlist})
        }
        
        fetch(`http://localhost:8080/api/v1/watchlist/65f18d50425cb202f01da7a6`, requestOptions)
        .then(alert("Watchlist Successfully Saved"))
        .then(setReRender(true))
    }

    function handleClear(){
        watchlist.map((imdbId) => setMovies(m => [...m, imdbId]) )
        setWatchlist([])
    }

    if(watchlist && movies){
        ok =    <div className="watchlist-container">
                    <div className="watchlist-select"> 
                        <select className="addMovie-select" value={currMovie} onChange={e => setCurrMovie(e.target.value)} onClick={controllo}>
                            <option value="" defaultValue>Choose a movie to add</option>
                            {movies.map((imdbId, key) => <option value={imdbId} key={key}>{filtra(allMovies, imdbId)}</option>)}
                        </select>
                        <button onClick={handleAdd} className="watchlist-button">Add</button>
                    </div>
                    <div className="watchlist-list">
                        <ul>
                            {watchlist.length > 0   ?   watchlist.map((imdbId, key) =>    
                                                                        <li key={key} style={{color: "white", display:"flex", flexDirection:"row"}}>
                                                                        <p style={{flex: 1}} onClick={() => navigate(`/imdbId/${imdbId}`)}>{filtra(allMovies, imdbId)}</p>
                                                                        <button onClick={() => handleUp(key)}>⬆️</button>
                                                                        <button onClick={() => handleDown(key)}>⬇️</button>
                                                                        <button onClick={() => handleDelete(key)} id="watchlist-button-delete">❎</button>
                                                                    </li>)
                                                    :   <li style={{color: "white", display:"flex", flexDirection:"row", textAlign:"center", justifyContent:"center"}} ><b>ADD A MOVIE</b></li>}
                        </ul>
                        <div style={{alignItems: "center", display:"flex", flexDirection:"row", justifyContent:"center", margin:"10px"}}>
                            <button onClick={handleSave} className="watchlist-button">Save</button>
                            <button onClick={handleClear} className="watchlist-button">Clear</button>
                        </div>
                    </div>
                </div>
    }

    const notOk = <div className="app"><div className='caricamento'/></div>


    return(
        <>
           <NavB />
           {watchlist && movies ? ok : notOk}
        </>
    )
}
