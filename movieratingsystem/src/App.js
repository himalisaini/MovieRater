import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './Components/movie_list';
import MovieDetails from './Components/movie_details';
import MovieForm from './Components/movie-form';
import {useCookies } from 'react-cookie';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faFilm } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



function App() {

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editedMovie, setEditedMovie] = useState(null);
  const [token , setToken , deleteToken ] = useCookies(['mr-token']);


  useEffect(()=>{
    fetch("http://127.0.0.1:8000/api/movies/", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token  ${token['mr-token']}`
    }
    
    })
    .then( resp => resp.json())
    .then( resp => setMovies(resp))
    .catch( error => console.log(error))

  }, [])

  useEffect ( () => {
    if(!token['mr-token']) window.location.href = '/';
} , [token])

 
  const loadMovie = movie => {
    setSelectedMovie(movie);
    setEditedMovie(null);
  }

  const editClicked = movie => {
    setEditedMovie(movie);
    setSelectedMovie(null);
  }

  const deleteClicked = movie => {
    const newMovies = movies.filter ( mov => mov.id !== movie.id);
    setMovies(newMovies);
  }

  const updatedMovie = movie => {
    const newMovies = movies.map( mov => {
      if (mov.id === movie.id) {
        return movie
      }
      return mov;
    })

    setMovies(newMovies);
  }

  const newMovie = () => {
    setEditedMovie({title:'',genre:'',description:''});
    setSelectedMovie(null);
  }

  const addMovie = movie => {
    const newMovies = [...movies, movie]
    setMovies(newMovies);
  }

const logoutUser = () => {
  deleteToken(['mr-token']);
}


  return (
    <div className="App">
      <header className="App-header">
        
        <h2>
        <FontAwesomeIcon icon={ faFilm } /> Movie Rating Sysytem </h2>
        <FontAwesomeIcon icon={ faSignOutAlt } onClick={logoutUser} />

      </header>
      <div className="layout">
          <div>
          <MovieList movies={movies} movieClicked = {loadMovie} editClicked = {editClicked} deleteClicked = {deleteClicked}/>
          <button onClick={ newMovie }> Add Movie </button>
          </div>
          <MovieDetails movie = {selectedMovie} updateMovie={loadMovie}/>
          { editedMovie?
          <MovieForm movie={editedMovie} updatedMovie={updatedMovie} addMovie={addMovie} /> : null }
          
        </div>
    </div>
  );
}

export default App;
