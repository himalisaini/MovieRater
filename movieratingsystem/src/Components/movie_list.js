import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import API from '../api-service'
import {useCookies } from 'react-cookie';



function MovieList(props){

    const [token] = useCookies(['mr-token']);


    const movieClicked = m => evt => {
        props.movieClicked(m);
    }

    const editClicked = m  => {
        props.editClicked(m);
    }

    const deleteClicked = m  => {
        API.deleteMovie(m.id,token['mr-token']).then(
            () => props.deleteClicked(m)
        ).catch(error => console.log());
        
    }

    return (
        <div >
           <h3> Movie List </h3>
           { props.movies && props.movies.map( movie =>{
               return (
                   <div key={movie.id} className="movie-item" >
               <h4 onClick={movieClicked(movie)}> {movie.title} </h4>
               <FontAwesomeIcon icon={ faEdit } onClick={() => editClicked(movie)}/> 
               <FontAwesomeIcon icon={ faTrash } onClick={() => deleteClicked(movie)}   /> 


               </div>
               )
           })}
        </div>
    )
}

export default MovieList;