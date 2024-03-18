import './App.css'
import NavB from './components/navB/navB'
import Movie from "./components/movie/movie"
import { useEffect, useState } from 'react'

function App() {

  const [data, setData] = useState();
  useEffect(()=>{
    fetch("http://localhost:8080/api/v1/movie")
    .then(response => response.json())
    .then(json => {
      setData(json)}
    )
  }, [])


  const ok = <Movie data={data} />

  const notOk = <div className='caricamento'/>

  
  return (
    <>
      < NavB />
      <div className='app'>
        {data ? ok : notOk}
      </div>
    </>
  )
}

export default App
