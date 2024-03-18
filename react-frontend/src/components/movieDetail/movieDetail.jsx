import "./movieDetail.css"
import NavB from "../navB/navB"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

export default function MovieDetail(){
    const { imdbId } = useParams()
    const [movie, setMovie ] = useState();
    const [review, setReview] = useState();
    const [render, setRender] = useState(false);
    const [trailer, setTrailer] = useState(false);
    const [index, setIndex] = useState(0);
    const [update, setUpdate] = useState(false);
    const [bodyB, setBodyB] = useState();
    const [idR, setIdR] = useState();
    const root = document.querySelector("#root")
    const title = document.querySelector(".title-title")
    let updatePage
    let trailerPage;
    let ok;

    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/movie/${imdbId}`)
        .then(response => response.json())
        .then(json =>{
            setMovie(json)
            title.innerHTML = `Movie App - ${json.title}`
            setReview(json.reviewIds.reverse())
            setRender(false);
        })

        return () => {
            title.innerHTML = "Movie App"
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imdbId, render])

    function handleSubmit(){
        const newReview = document.querySelector("#new-review")
        if(newReview.value.trim() == "") return;
        fetch("http://localhost:8080/api/v1/review", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({"reviewBody": newReview.value, "imdbId": imdbId})})
        .then(setRender(true), newReview.value = "")
        .catch(error => console.log(error))
    }

    function handleDelete(id){
        if(confirm("Are you sure to delete this review?")){
            fetch(`http://localhost:8080/api/v1/review/${id}`, {method: "DELETE"})
            .then(setRender(true), alert("Review Successfully Deleted"))
            .catch(e => console.log(e))
        }
    }

    // function handleUpdate(id){
    //     navigate(`/imdbId/${imdbId}/update-review/${id}`)
    // }

    function handleTrailer(){
        root.style.height = "100vh"
        root.style.overflow = "hidden"
        setTrailer(true)
    }

    function handleTrailerOut(){
        root.style.height = ""
        root.style.overflow = ""
        setTrailer(false)
    }

    function handleUpdateIn(b, id){
        setBodyB(b)
        setIdR(id)
        root.style.height = "100vh"
        root.style.overflow = "hidden"
        setUpdate(true)
    }

    function handleUpdateOut(){
        root.style.height = ""
        root.style.overflow = ""
        setUpdate(false)
        setBodyB()
        setIdR()
    }

    function handleUpdateSubmit(){
        const updatedReview = document.querySelector("#update-review")

        if(updatedReview.value.trim() == ""){
            alert("Review can not be blank!")
            return
        }

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"reviewBody": updatedReview.value})
        };

        fetch(`http://localhost:8080/api/v1/review/${idR}`, requestOptions)
        .then(alert("Review Successfully Updated"))
        .then(handleUpdateOut, setRender(true))
    }


    if(movie){
        trailerPage =   <div className="trailer-container" onClick={() => handleTrailerOut()}>
                            <iframe className="trailer-video" src={`https://www.youtube.com/embed/${movie.trailerLink.substring(32)}`}></iframe>
                        </div>

        updatePage =    <div className="trailer-container" style={{cursor:"auto"}}>
                            <div className="review">
                                <div className="row">
                                    <h1 style={{flex: 1}}>Update Review</h1>
                                    <button className="review-button" onClick={() => handleUpdateSubmit()}>Update</button>
                                    <button className="review-button"  onClick={() => handleUpdateOut()}>Cancel</button>
                                </div>
                                <textarea className="review-new" id="update-review" style={{height: 300}} defaultValue={bodyB}></textarea>
                            </div>
                        </div>

        ok =    <>
                    <div className="detail-all">
                        <span className="detail-poster">
                            <img src={movie.poster}  height={300} alt="poster" style={{borderRadius:"10px"}} />
                        </span>
                        <span className="detail-info">
                            <h1>{movie.title}</h1>
                            <p style={{paddingBottom:5}}>{movie.releaseDate}</p>
                            <hr />
                            <p style={{paddingBottom:5, paddingTop:5}} >{movie.genres.join(" - ")}</p>
                            <p className="detail-trailer" onClick={()=> handleTrailer()}>Watch Trailer</p>
                        </span>
                    </div>
                    <div className="detail-all" style={{justifyContent: "space-between"}}>
                        <div style={{cursor:"pointer"}} onClick={() => index > 0 ? setIndex(i => i-1) : setIndex(movie.backdrops.length-1) }>
                            <img src="/src/assets/indietro.png" width={40} height={40} />
                        </div>
                        
                        <img src={movie.backdrops[index]} alt="image" style={{borderRadius:"10px", height:"80%", width:"80%" }}/>

                        <div style={{cursor:"pointer"}} onClick={() => index < movie.backdrops.length-1 ? setIndex(i => i+1) : setIndex(0)}>
                            <img src="/src/assets/avanti.png" width={40} height={40} />
                        </div>
                    </div>
                    <br />
                    <div className="review">
                        <div className="row">
                            <h1>Create New Review</h1>
                            <button className="review-button" onClick={() => handleSubmit()}>Submit</button>
                        </div>
                        <textarea className="review-new" id="new-review" ></textarea>
                    </div>
                    {review.map((obj, key) =>   <div key={key} className="review">
                                                    <p className="review-body">{obj.body}</p>
                                                    <div className="row">
                                                        <p> 
                                                            Creation: {obj.dateCreation.substring(11, 16)} {obj.dateCreation.substring(0, 10)} 
                                                            &nbsp; Last update: {obj.dateUpdate.substring(11, 16)} {obj.dateUpdate.substring(0, 10)}
                                                        </p>
                                                        <div className="row"> 
                                                            <button className="review-button" onClick={() => handleUpdateIn(obj.body, obj.id)}>Update</button>
                                                            <button className="review-button" onClick={() => handleDelete(obj.id)}>Delete</button>
                                                        </div>
                                                    </div>
                                                </div>)}
                </>
    }

    const notOk = <div className="app"><div className='caricamento'/></div>

    return(
        <>
            <NavB />
            {movie ? ok : notOk}
            {trailer ? trailerPage : <></>}
            {update ? updatePage : <></>}
        </>
    )
}