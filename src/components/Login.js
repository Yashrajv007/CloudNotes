import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
const Login = (props) => {
    const [credentials,setCredentials] =useState({email:"",password:""})
    const navigate = useNavigate()

    const handleSubmit= async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json'
              
            },
            body: JSON.stringify({ email:credentials.email,password:credentials.password })
          });
          const json=await response.json();
          console.log(json);
          if(json.success){
            // redirect
            localStorage.setItem('token',json.authtoken);
            props.showAlert("Login Successful","success");
            navigate("/home");
          }
          else{
            props.showAlert("invalid details","danger");
          }
    }

    const handlechange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className="mt-3">
            <h2>Login to continue to CloudNotes</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} id="email" name='email' onChange={handlechange} aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} id="password" name='password' onChange={handlechange}/>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
