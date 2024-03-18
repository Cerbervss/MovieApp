import { Link, useNavigate } from "react-router-dom";
import "./navB.css"
import { useState, useEffect } from "react";

export default function NavB(){
    let titleList = [];
    const [list, setList] = useState();
    const [fullList, setFullList] = useState();
    const genre = ["animation", "action", "adventure", "comedy", "family", "horror", "fantasy", "drama", "history"]
    const [sclt, setSclt] = useState("Title");
    const [imdbId, setImdbId] = useState();
    const [gnr, setGnr] = useState();
    const [halfTitle, setHalfTitle] = useState();
    const inputCerca = document.querySelector(".inputCerca")
    const navigate = useNavigate();
    
    useEffect(()=>{
        fetch("http://localhost:8080/api/v1/movie")
        .then(response => response.json())
        .then(json => {
            setFullList(json);
            if(titleList.length == 0){
                for(let i = 0; i < Object.keys(json).length; i++){
                    titleList.push(json[i].title)
                }
                setList(titleList);
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function cambioScelta(e){
        setSclt(e.target.value)
        inputCerca.value=""
    }

    function cercaFilm(e){
        if(sclt == "Title"){
            for(let i = 0; i < Object.keys(fullList).length; i++){
                if(fullList[i].title.toLowerCase().trim() === e.target.value.toLowerCase().trim()){
                    setImdbId(fullList[i].imdbId)
                    break;
                }
            }
            if(imdbId == undefined){
                setHalfTitle(e.target.value.toLowerCase());
            }
        } else {
            if(genre.includes(e.target.value.toLowerCase().trim())){
                setGnr(e.target.value.toLowerCase().trim())
            }
        }
    }

    function handleSubmit (e) {
        e.preventDefault();
        e.stopPropagation();                           
        if(imdbId != undefined && sclt == "Title"){
            navigate(`/imdbId/${imdbId}`);
            setImdbId(undefined);
        } else if(gnr != undefined && sclt != "Title"){
            navigate(`/genre/${gnr}`)
            setGnr(undefined);
        } else if(halfTitle != undefined && sclt == "Title"){
            navigate(`/title/${halfTitle}`)
            setHalfTitle(undefined);
        }
        inputCerca.value=""

    }

    return(
        <div className="nav">
            <button className="tastoHome" onClick={() => navigate("/")}>
                <Link to="/" >Home</Link>
            </button>
            <form className="formCerca" onSubmit={handleSubmit}>
                <select name="opt" id="opt" onChange={cambioScelta}>
                    <option value="Title" defaultValue>Title</option>
                    <option value="Genre">Genre</option>
                </select>
                <input className="inputCerca" type="text" placeholder="Search for a movie..." list="datafilm" onChange={cercaFilm}/>
                <datalist id="datafilm">
                    {sclt == "Title" ? list ? list.map((val, key) => <option key={key}>{val}</option>) : <></>
                                    :   genre.map((val, key) => <option key={key}>{val}</option>)}
                </datalist>
                <button className="buttonCerca" >Search</button>
            </form>
            <button className="tastoWL" onClick={() => navigate("/watchlist")}>
                <Link to="/watchlist" >Watch List</Link>
            </button>
        </div>
    )
}