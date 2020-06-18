import React , {useState ,useEffect, useContext } from 'react';
import API from '../api-service';
import {useCookies } from 'react-cookie';

function Auth(){

    const [ username , setUsername ] = useState('');
    const [ password , setPassword ] = useState('');
    const [ isLogin , setIsLogin ] = useState(true);

    const [token , setToken] = useCookies(['mr-token']);

    useEffect ( () => {
        if(token['mr-token']) window.location.href = '/movies';
    } , [token])

    const loginClicked = () => {
        API.loginUser({username,password}).then( resp=> setToken('mr-token',resp.token))
        .catch(error => console.log(error))
    }

    const registerClicked = () => {
        API.registerUser({username,password}).then( ()=> loginClicked())
        .catch(error => console.log(error))
    }

    return ( 
        <React.Fragment>

<div className="App auth-container">

    { isLogin ?  <h2> Log In </h2> : <h2> Register </h2> }
  
        <div className="auth-sub">
        <label htmlFor="username"> Username </label> <br></br>
        <input type="text" placeholder="username" size="30" value={username} id="username" onChange={ evt=> setUsername(evt.target.value)}/>
        <br/><br/>
        <label htmlFor="password"> password </label> <br></br>
        <input type="password" placeholder={password} value={password} id="password" onChange={ evt=> setPassword(evt.target.value)} />
        <br/>

          
        <div className="pointer">
        { isLogin ?  <button onClick={loginClicked}>Log in</button> :
         <button onClick={registerClicked}>Sign up</button> }
       

        { isLogin ?
       <p onClick={()=> setIsLogin(false)}> New here? Register here </p> :

       <p onClick={()=> setIsLogin(true)}> Already have an account? Log in here </p>

        }

        </div>
        </div>

    </div>
        </React.Fragment>
    );
}

export default Auth;