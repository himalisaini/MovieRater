import React, { useState , useEffect } from 'react';
import API from '../api-service';
import {useCookies } from 'react-cookie';


function MovieForm(props){

    const mov = props.movie;
    const [ title , setTitle ] = useState ('');
    const [ genre , setGenre ] = useState ('');
    const [ description , setDescription ] = useState ('');
    const [token] = useCookies(['mr-token']);


    useEffect ( () => {

        setTitle(mov.title)
        setGenre(mov.genre) 
        setDescription(mov.description)
    } , [mov])

    const updateClicked = () =>{
        API.updateMovie(mov.id, {title,genre,description}, token['mr-token'])
        .then( resp=> props.updatedMovie(resp))
        .catch( error => console.log(error))
    }

    const createClicked = () =>{
        API.createMovie({title,genre,description},token['mr-token'])
        .then( resp=> props.addMovie(resp))
        .catch( error => console.log(error))
    }

    return (
        <React.Fragment>

        { mov ? (

    <div className="movie-form-data">
        <h2> Movie Details </h2>

        <label htmlFor="title"> Title </label> <br></br>
        <input type="text" placeholder={title} size="30" value={title} id="title" onChange={ evt=> setTitle(evt.target.value)}/>
        <br/><br/>
        <label htmlFor="genre"> Genre </label> <br></br>
        <input type="text" placeholder={genre} value={genre} id="genre" onChange={ evt=> setGenre(evt.target.value)} />
        <br/><br/>
        <label htmlFor="description"> Description </label> <br/>
        <textarea type="text" rows="6" cols="40" placeholder={description} value={description} id="description" onChange={ evt=> setDescription(evt.target.value)} />
            <br/>

            { mov.id ? 
       <button onClick={updateClicked}>Update</button> :
       <button onClick={createClicked}>Add</button>
            }

    </div>

    ) : null}


    </React.Fragment>
    )
}

export default MovieForm;