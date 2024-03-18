// import { useNavigate, useParams } from "react-router-dom";
// import NavB from "../navB/navB";
// import "../movieDetail/movieDetail.css"
// import { useEffect, useState } from "react";

// export default function UpdateReview(){
//     const { id } = useParams()
//     const { imdbId } = useParams();
//     const [review, setReview] = useState();
//     const navigate = useNavigate();
//     const [ok, setOk] = useState();

//     useEffect(() => {
//         fetch("http://localhost:8080/api/v1/review/all")
//         .then(response => response.json())
//         .then(json => {
//             for(let i = 0; i < Object.keys(json).length; i++){
//                 if(json[i].id == id){
//                     setReview(json[i].body);
//                     setOk(  <>
//                                 <div className="review">
//                                     <div className="row">
//                                         <h1>Update Review</h1>
//                                         <button className="review-button" onClick={() => handleUpdate()}>Update</button>
//                                     </div>
//                                     <textarea className="review-new" style={{height: 300}} defaultValue={json[i].body}></textarea>
//                                 </div>
//                             </>
//                             );
//                 }
//             } 
//         })
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [])

//     function handleUpdate(){
//         const reviewBody = document.querySelector(".review-new")
//         const requestOptions = {
//             method: 'PUT',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({"reviewBody": reviewBody.value})
//         };

//         fetch(`http://localhost:8080/api/v1/review/${id}`, requestOptions)
//         .then(alert("Review Successfully Updated"))
//         .then(navigate(`/imdbId/${imdbId}`))
//     }

//     const notOk = <div className="app"><div className='caricamento'/></div>

    
//     return(
//         <>
//             <NavB />
//             { review ? ok : notOk}
//         </>
//     )
// }