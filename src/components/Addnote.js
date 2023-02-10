import notecontext from "../context/notes/notecontext";
import React, { useContext, useState } from 'react'


const Addnote = (props) => {
    const context=useContext(notecontext);
    const {addNote}=context;
    const [note,setNote]=useState({title:"",description:"",tag:""})
    const handleclick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""})
        props.showAlert("Added Successfully","success")
    }
    const handlechange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div>
      <div className="container my-3">
      <h1>Add a note</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={handlechange} minLength={5} required/>
            
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={handlechange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={handlechange} minLength={5} required/>
        </div>
        {/* <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div> */}
        <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleclick}>Done</button>
      </form>
      </div>
    </div>
  )
}

export default Addnote
