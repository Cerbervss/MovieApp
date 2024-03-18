import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import WatchList from './components/watchlist/watchList.jsx'
import './index.css'
import ErrorPage from './errorPage.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MovieDetail from './components/movieDetail/movieDetail.jsx'
import SearchRes from './components/searchRes/searchRes.jsx'

const router = createBrowserRouter([
  {
    path : "/", 
    element : <App />,
    errorElement: <ErrorPage />
  },
  {
    path : "/watchlist",
    element : <WatchList />
  },
  {
    path : "/imdbId/:imdbId",
    element : <MovieDetail />
  },
  // {
  //   path : "/imdbId/:imdbId/update-review/:id",
  //   element : <UpdateReview />
  // },
  {
    path : "/title/:title",
    element : <SearchRes />
  },
  {
    path : "/genre/:gnr",
    element : <SearchRes />
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
