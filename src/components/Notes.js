import React, { useContext, useEffect, useRef, useState } from 'react'
import notecontext from "../context/notes/notecontext";
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    let navigate=useNavigate();
    const context = useContext(notecontext);
    const { notes, getNotes, editNote } = context;
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes()
        }
        else
        {
            navigate("/");
        }
        // eslint-disable-next-line
    }, [])

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    const ref = useRef(null)
    const refClose = useRef(null)

    const handleclick = (e) => {
        console.log("updatng note", note)
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        props.showAlert("Updated Successfully","success");
    }
    const handlechange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }


    return (
        <>
            <Addnote showAlert={props.showAlert}  />

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={handlechange} minLength={5} required/>

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" onChange={handlechange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={handlechange} minLength={5} required />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleclick} type="button" className="btn btn-primary">Update note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h1>Your notes</h1>
                <div className="container mx-2">
                    {notes.length === 0 && 'No notes to display'}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
