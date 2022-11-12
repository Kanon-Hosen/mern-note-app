import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiFillEdit, AiOutlinePlusCircle } from "react-icons/ai";
import { FaTrashAlt} from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { auth } from "../config/firebaseConfig";
const AddNote = () => {
    const navigate = useNavigate()
    const [editNote, setEditNote] = useState({})
    const [toggle, setToggle] = useState(false);
    const [editToggle, setEditToggle] = useState(false);
    const [notes, setNotes] = useState([]);
    const [refres, setRefres] = useState(false);
    const [user] = useAuthState(auth);
    const [editRefres, setEditRefres] = useState()
    const {id} = useParams()

    const handleNote = (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const description = e.target.description.value;

        const note={title, description}

        try {
            fetch(`https://mern-note-server.vercel.app/note/${user.displayName}`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(note)
            }).then(res => res.json())
                .then(data => {
                    e.target.reset();
                    setToggle(false)
                    
                    setRefres(true)
            })
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        fetch(`https://mern-note-server.vercel.app/note/${user.displayName}`)
            .then(res => res.json())
            .then(data => {
                setNotes(data.data)
            })
    }, [user ,id, refres, editRefres])

    //Edit post::::::::::::::::::::::::::::::::::

    useEffect(() => {
        fetch(`https://mern-note-server.vercel.app/note?name=${user.displayName}&id=${id}`)
          .then(res => res.json())
        .then(data=>setEditNote(data))
      }, [id, user.displayName, editRefres, editToggle])
    const handleNoteEdit = (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const des = e.target.des.value;
  
        const note = { title, des };
  
        try {
          fetch(`https://mern-note-server.vercel.app/note/${id}?name=${user.displayName}`, {
            method: "PATCH",
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify(note)
          }).then(() => {
             e.target.reset()
              setEditToggle(!editToggle)
              setEditRefres(!editRefres)
              navigate('/')
          })
        } catch (error) {
          console.log(error.message)
        }
      }

  
  //Delete Note::::::::::::::::::::::::::::::::::
  const handleDelete = (NoteId) => {
    const proced = window.confirm("Delete Note");

    if (proced) {
      try {
        fetch(`https://mern-note-server.vercel.app/note/${NoteId}?name=${user.displayName}`, {
          method:"DELETE"
        }).then(res => res.json())
          .then((data) => {
            setRefres(!refres)
            console.log('succesfully deleted')
        })
      } catch (error) {
        
      }
    } else {
      return;
    }
  }
  return (
    <div className="my-6 md:px-20 px-10 flex-col lg:flex-row flex gap-5 w-full">
          <div className="md:w-60 w-full ">
          <div onClick={()=> setToggle(true)} className="relative flex items-center justify-center flex-col shadow w-full h-44 rounded-md gap-2 cursor-pointer hover:border-teal-500 hover:border-2 transition-all">
        <AiOutlinePlusCircle className="text-4xl"></AiOutlinePlusCircle>
        <p className="text-xl ">Add Note</p>
      </div>
</div>
      <div className={` z-50 bg-transparent ${toggle ? 'scale-100' : 'scale-0'}  transition-transform absolute w-full h-screen flex  items-center justify-center top-0 left-0`}>
        <div className="relative flex flex-col items-center max-w-lg gap-4 p-6 rounded-md shadow-md sm:py-8 sm:px-12 bg-white z-50 text-gray-900">
          <button onClick={()=> setToggle(false)} className="absolute top-2 right-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="currentColor"
              className="flex-shrink-0 w-6 h-6"
            >
              <polygon points="427.314 107.313 404.686 84.687 256 233.373 107.314 84.687 84.686 107.313 233.373 256 84.686 404.687 107.314 427.313 256 278.627 404.686 427.313 427.314 404.687 278.627 256 427.314 107.313"></polygon>
            </svg>
                  </button>
                  <div>
                      <form onSubmit={handleNote} className="flex flex-col gap-2 ">
                          <label htmlFor="title">Note title</label>
                          <input className='p-3 border-2 rounded-md mb-3' name="title" type="text" placeholder="Title" required/>
                          <label htmlFor="description">Note description</label>
                          <textarea className='p-3 border-2 rounded-md resize-none' name="description" type="text" placeholder="Description" required/>
                          <button className="mt-4 px-4 py-3 bg-teal-500 rounded-md text-white" type="submit">Add note</button>
                      </form>
                  </div>
        </div>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 z-10 w-full ">
              {
                  notes.map(note => {
                    //   setNote(note)
                      return (
                          <div key={note._id} className="shadow md:w-72 w-full h-fit  p-4 rounded-md relative">
                              <h1 className="font-semibold text-base mb-2 text-teal-500">{note.title}.</h1>
                              <p className="text-sm font-light text-black">{note.description}</p>

                              <div className="flex items-center gap-5 text-sm mt-4 justify-between">
                                  <Link to={`${note._id}`} onClick={()=>setEditToggle(true)}>
                                  <AiFillEdit title="Edit" className="hover:text-teal-500 cursor-pointer"></AiFillEdit>
                                  </Link>
                                  <FaTrashAlt onClick={()=>handleDelete(note._id)} title="Delete" className="hover:text-teal-500 cursor-pointer"></FaTrashAlt>
                              </div>
                              <div className={`${editToggle ? 'scale-100' : 'scale-0'} fixed top-0 left-0 w-full mx-auto h-full flex items-center justify-center`}>
                  <div className="w-96 bg-white rounded-2xl h-96 shadow-md p-8  relative flex items-center justify-center flex-col">
                      <button onClick={() => setEditToggle(!editToggle)} className="text-right flex justify-end absolute top-10 z-50 right-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="currentColor"
              className="flex-shrink-0 w-6 h-6"
            >
              <polygon points="427.314 107.313 404.686 84.687 256 233.373 107.314 84.687 84.686 107.313 233.373 256 84.686 404.687 107.314 427.313 256 278.627 404.686 427.313 427.314 404.687 278.627 256 427.314 107.313"></polygon>
            </svg>
                                      </button>
                                      <div className={` flex  transition-transform w-full h-full items-center justify-center `}>
        <div className="relative flex flex-col items-center gap-4 rounded-md z-30 p-2 text-gray-900 w-full h-full">
                  <div className='w-full h-full'>
                      <form onSubmit={handleNoteEdit} className="flex flex-col gap-2 w-full h-full">
                          <label htmlFor="title" >Note title</label>
                          <input name='title' defaultValue={editNote.title} className='p-3 border-2 rounded-md mb-3' type="text" placeholder="Title" required/>
                          <label htmlFor="description">Note description</label>
                          <textarea name='des' defaultValue={editNote.description} className='p-3 border-2 rounded-md resize-none' 
                          type="text" placeholder="Description" required/>
                          <button className="mt-4 px-4 py-3 bg-teal-500 rounded-md text-white" type="submit">Edit note</button>
                      </form>
                  </div>
        </div>
          </div>
                  </div>
            </div>
                          </div>
                      )
                  })
              }

          </div>
    </div>
  );
};

export default AddNote;
