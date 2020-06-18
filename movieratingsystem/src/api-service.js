
export default class API {
    static updateMovie(mov_id , body , TOKEN){
     return   fetch(`http://127.0.0.1:8000/api/movies/${mov_id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${TOKEN}`
    },
    body: JSON.stringify(
        body ) 

    
    }).then( resp => resp.json())

    }

    static loginUser(body){
      return   fetch(`http://127.0.0.1:8000/auth/`, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(
         body ) 
 
     
     }).then( resp => resp.json())
 
     }

     static registerUser(body){
      return   fetch(`http://127.0.0.1:8000/api/users/`, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(
         body ) 
 
     
     }).then( resp => resp.json())
 
     }

    static deleteMovie(mov_id , TOKEN){
      return   fetch(`http://127.0.0.1:8000/api/movies/${mov_id}/`, {
     method: 'DELETE',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Token ${TOKEN}`
     },  
     })
 
     }

    static createMovie(body , TOKEN){
      return   fetch(`http://127.0.0.1:8000/api/movies/`, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Token ${TOKEN}`
     },
     body: JSON.stringify(
         body ) 
 
     
     }).then( resp => resp.json())
 
     }

}