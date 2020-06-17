import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './Components/movie_list';
import MovieDetails from './Components/movie_details';
import MovieForm from './Components/movie-form';

function App() {

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editedMovie, setEditedMovie] = useState(null);


  useEffect(()=>{
    fetch("http://127.0.0.1:8000/api/movies/", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token 7cb7b1f367fc71d75cb1b88b0d392985f4059440'
    }
    
    })
    .then( resp => resp.json())
    .then( resp => setMovies(resp))
    .catch( error => console.log(error))

  }, [])

 
  const loadMovie = movie => {
    setSelectedMovie(movie);
    setEditedMovie(null);
  }

  const editClicked = movie => {
    setEditedMovie(movie);
    setSelectedMovie(null);
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


  return (
    <div className="App">
      <header className="App-header">
        <h1> Movie Rating Sysytem </h1>
      </header>
      <div className="layout">
          <div>
          <MovieList movies={movies} movieClicked = {loadMovie} editClicked = {editClicked} />
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
