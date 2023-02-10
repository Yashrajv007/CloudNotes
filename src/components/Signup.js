// import { PromiseProvider } from 'mongoose'
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Signup = (props) => {
  const [credentials,setCredentials] =useState({name:"",email:"",password:"",cpassword:""})
  const navigate = useNavigate()

  const handleSubmit= async (e)=>{
    e.preventDefault();
    const {name,email,password} = credentials;
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
          
        },
        body: JSON.stringify({name,email,password })
      });
      const json=await response.json();
      console.log(json);
      if(json.success){
        // redirect
        localStorage.setItem('token',json.authtoken);
        navigate("/login");
        props.showAlert("Account Created Successfully","success");
      }
      else{
        props.showAlert("invalid credentials","danger");
      }
}

const handlechange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
}

  return (
    <div className='container mt-3'>
      <h2>SignUp to use CloudNotes</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Enter your Name</label>
          <input type="text" className="form-control" id="name" name='name'  onChange={handlechange} aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name='email' onChange={handlechange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={handlechange} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label"> Confirm Password</label>
          <input type="password" className="form-control" id="cpassoword" name='cpassword' onChange={handlechange} minLength={5} required  />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
