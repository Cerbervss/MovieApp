import "./searchRes.css"
import NavB from "../navB/navB"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

export default function SearchRes(){
    const { gnr } = useParams()
    const { title } = useParams()
    const [noRes, setNoRes] = useState(false);
    const navigate = useNavigate();
    const [ok, setOk] = useState();
    const title2 = document.querySelector(".title-title")


    useEffect(()=>{
        title2.innerHTML = "Movie App - Search"
        if(gnr){
            fetch(`http://localhost:8080/api/v1/movie/genre/${gnr}`)
            .then(response => response.json())
            .then(json =>{
                Object.keys(json).length == 0 ? setNoRes(true) : setterOk(json)})
        } else if (title){
            fetch(`http://localhost:8080/api/v1/movie/title/${title}`)
            .then(response => response.json())
            .then(json =>{
                Object.keys(json).length == 0 ? setNoRes(true) : setterOk(json)})
        }
        
        return () => {
            title2.innerHTML = "Movie App"
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gnr, title])
    
    function handleNavigate(id){
        navigate(`/imdbId/${id}`)
    }

    function setterOk(json){
        setOk(
            json.map((obj, key) =>   <div className="movie-list-item" key={key}>
                                                <div>
                                                    <img src={obj.poster} width="110px" height="160px" alt="poster" onClick={() => handleNavigate(obj.imdbId)} style={{cursor: "pointer"}}/>
                                                </div>
                                                <div>
                                                    <h1 style={{cursor: "pointer", flex: 1, marginLeft: "10px"}} onClick={() => handleNavigate(obj.imdbId)} >{obj.title}</h1>
                                                    <p style={{flex: 1, marginLeft: "10px"}}>{obj.releaseDate}</p>
                                                </div>
                                        </div>)
        )
        setNoRes(false)
    }

    const notOk = <div className="app"><div className="caricamento"/></div>

    const noResult = <div className="app"><h1 style={{color: "white"}}>No Result!</h1></div>

    return(
        <>
            <NavB />
            {ok ? ok : noRes ? noResult : notOk}
        </>
    )
}