import React , {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

function MovieDetails(props){

    const mov = props.movie;
    const [ highlighted , setHighlighted ] = useState(-1);

    const highlightstars = high => evt => {
        setHighlighted(high);
    }

    const getdetails = () => {
        fetch(`http://127.0.0.1:8000/api/movies/${props.movie.id}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token 7cb7b1f367fc71d75cb1b88b0d392985f4059440'
            }                
            
            })
         .then( resp => resp.json())
         .then( resp => props.updateMovie(resp)) 
         .catch( error => console.log(error))
        }

    

    const rateClicked = rate => evt => {

        fetch(`http://127.0.0.1:8000/api/movies/${mov.id}/rate_movie/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token 7cb7b1f367fc71d75cb1b88b0d392985f4059440'
    },
    body: JSON.stringify({
        stars: rate+1 })

    
    })
    .then( () => getdetails())
    .catch( error => console.log(error))

    }

    return (
        <React.Fragment>
            { mov ? (
        <div>
           <h3> { mov.title } </h3>
           <h5> { mov.genre} </h5>
           <p> { mov.release_date} </p>
           <h4> { mov.description} </h4>
           
           
           <FontAwesomeIcon icon={ faStar } className={ mov.avg_rating>0 ? "golden" : ""} /> 
           <FontAwesomeIcon icon={ faStar } className={ mov.avg_rating>1 ? "golden" : ""} /> 
           <FontAwesomeIcon icon={ faStar } className={ mov.avg_rating>2 ? "golden" : ""} /> 
           <FontAwesomeIcon icon={ faStar } className={ mov.avg_rating>3 ? "golden" : ""} /> 
           <FontAwesomeIcon icon={ faStar } className={ mov.avg_rating>4 ? "golden" : ""} /> 
            ({ mov.no_of_ratings })

            <div className="rate-container">
            <h3> Add Rating </h3>
            { [...Array(5)].map ( (x , i) => {
                return <FontAwesomeIcon icon={ faStar } key={i} className={ highlighted > i-1 ? "golden" : ""}
                onMouseEnter={highlightstars(i)}  onMouseLeave={highlightstars(-1)}
                onClick={rateClicked(i)}

                /> 

            }) }


            </div>
                
         </div>

            ) : null}
           
        </React.Fragment>
    )
}

export default MovieDetails ;

