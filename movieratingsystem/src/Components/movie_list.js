import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'


function MovieList(props){

    const movieClicked = m => evt => {
        props.movieClicked(m)
    }

    const editClicked = m  => {
        props.editClicked(m)
    }

    return (
        <div >
           <h3> Movie List </h3>
           { props.movies && props.movies.map( movie =>{
               return (
                   <div key={movie.id} className="movie-item" >
               <h4 onClick={movieClicked(movie)}> {movie.title} </h4>
               <FontAwesomeIcon icon={ faEdit } onClick={() => editClicked(movie)}/> 
               <FontAwesomeIcon icon={ faTrash }  /> 


               </div>
               )
           })}
        </div>
    )
}

export default MovieList;