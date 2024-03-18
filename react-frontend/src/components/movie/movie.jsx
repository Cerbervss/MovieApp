import "./movie.css"
import PropTypes from "prop-types"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Movie(props){
    const data = props.data
    const [index, setIndex] = useState(0)
    const navigate = useNavigate()

    function max(data) {
      return Object.keys(data).length -1
    }
    
    function vai(){
        navigate(`/imdbId/${data[index].imdbId}`);
    }

    return(
        <>
            <div className="container" style={{backgroundImage : `url(${props.data[index].backdrops[index != 9 ? 0 : 1]})`}}>
                <div className="indietro" onClick={() => index > 0 ? setIndex(i => i-1) : setIndex(max(data)) }>
                    <img src="/src/assets/indietro.png" width={40} height={40} />
                </div>

                <div className="movie">
                    <div className="poster"  style={{backgroundImage : `url(${props.data[index].poster})`}} onClick={() => vai()}>
                        <div className="posterImg" />
                    </div>
                    <div className="detail" onClick={() => vai()}>
                        <h1>{props.data[index].title.toUpperCase()}</h1>
                    </div>
                </div>

                <div className="avanti" onClick={() => index < max(data) ? setIndex(i => i+1) : setIndex(0)}>
                    <img src="/src/assets/avanti.png" width={40} height={40} />
                </div>
            </div>
        </>
    )
}

Movie.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        title : PropTypes.string,
        imdbId : PropTypes.string,
        poster : PropTypes.string,
        backdrops : PropTypes.arrayOf(PropTypes.string)
    }))
}

Movie.defaultProps = {
    data : []
}