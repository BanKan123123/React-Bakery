

// function Authors () {
//     // const [authors, setAuthors] = useState([])
//     // const [name, setName] = useState('')

//     // const inputAuthorRef = useRef()

//     // useEffect( () => {
//     //     fetch('http://localhost:4000/authors')
//     //         .then(res => res.json())
//     //         .then(authors => setAuthors(authors))
//     //         .catch(err => console.error(err))
//     // },[])

//     // Btn Click Add authors
//     // const handleCreateAuthor = () => {
//     //     fetch("http://localhost:4000/authors",{
//     //         method: "POST",
//     //         body: JSON.stringify({name}),
//     //         header : {
//     //             "Content-type ": "application/json"
//     //         }
//     //     })
//     //     .then(res => res.json())
//     //     .then(authors => console.log(authors))
//     // }

//     // const handleDeleteAlbum = (id) => {
//     //     fetch(`http://localhost:4000/authors/${id}`,{
//     //         method: 'DELETE',
//     //         header : {
//     //             'Content-Type': 'application/json'
//     //         }
//     //     })
//     //     .then(res => res.json())
//     //     .then( authors => {
//     //         return setAuthors([authors])
//     //     })
//     // }   
//     const RenderAuthor = () => {
//         return (
//             <ul>
//                 {authors.map(author => (
//                     <li 
//                         key = {author.id}
//                         id = {`author-${author.id}`}
//                     >{author.name} 
//                         <span
//                             style = {{
//                                 fontSize:30,
//                             }}
//                             // onClick = {() => handleDeleteAlbum(author.id)}
//                         >&times;</span>
//                         <button
//                             // onClick = {() => handelPutAuthors(author.id)}
//                             id = "btnRepair"
//                         > Repair </button>
//                     </li>
//                 ))}
//             </ul>
//         )
//     }


//     // const handelPutAuthors = (id) => {
//     //     document.querySelector("#btnAddAuthor").style.display = "none"
//     //     document.querySelector("#btnSaveAuthor").style.display = "inline"
//     //     var nameAuthor = document.querySelector("#author-"+id)
//     //     console.log(nameAuthor)
//     // }
//     // const saveAuthors = (id, data, callback) => {   
//     //     var options = {
//     //         method: 'PUT',
//     //         header: {
//     //             'Content-Type': 'application/json',
//     //         },
//     //         body: JSON.stringify(data)
//     //     }
//     //     fetch('https://jsonplaceholder.typicode.com/albums' + "/" + id, options)
//     //         .then(res=> res.json())
//     //         .then(callback)
//     // }
//     // const handleSaveAuthor = () => {
//     //     document.querySelector("#btnAddAuthor").style.display = "inline"
//     //     document.querySelector("#btnSaveAuthor").style.display = "none"

//     // }


//     return (
//         <div>
//             <input 
//                 ref = {inputAuthorRef}
//                 id = "inputAuthor"
//                 value = {name}
//                 onChange = {e => setName(e.target.value)}
//                 style = {{
//                     width: 200,
//                     height:35,
//                     outline:'none',
//                     fontSize:20,
//                 }}
//             />
//             <button
//                 // onClick = {handleCreateAuthor}
//                 style = {{
//                     height:35,
//                     marginLeft:10,
//                 }}
//                 id = "btnAddAuthor"
//             >Add Album</button>
//             <button
//                 style = {{
//                     height:35,
//                     marginLeft:10,
//                     display:'none'
//                 }}
//                 // onClick = {handleSaveAuthor}
//                 id = "btnSaveAuthor"
//             >Save Album</button>
//             <RenderAuthor />
//         </div>  

//     )
// }

// export default Authors

// Mỗi hàm được gọi nó sẽ tạo ra phạm vi mới và nó không liên quan gì đến phạm vi trước đó

// useReducer
// Init state: 0;
// Actions:
// Reducer
// Dispatch

import { useEffect, useReducer, useRef, useState } from 'react'
import React from "react";
import axios from "axios";


function Authors() {
    const [authors, setAuthors] = useState([])

    const [name, setName] = useState('')
    const [idRepair, setId] = useState()
    const [authorRequired, setAuthorRequired] = useState(false)
    const [editModal, setEditModal] = useState(false)


    const inputRefAddAuthor = useRef()

    useEffect(() => {
        axios.get("http://localhost:4000/authors")
            .then(res => {
                const authors = res.data
                setAuthors(authors)

            })
            .catch(err => console.log(err))
    }, [])

    const handleRequiredInput = () => {
        const regex = new RegExp("^[a-zA-Z]{5,30}$")

        regex.test(name)
        if (regex.test(name) || name.includes(" ", 0)) {
            setAuthorRequired(false)
        } else {
            setAuthorRequired(true)
        }



        // requiredAuthor code Formal
        // if(name === '' || name.trim().length < 6 || 
        //  name.trim().length > 50 || name.includes(1,2,3,4,5,6,7,8,9) || 
        //  format.test(name)) {
        //  setAuthorRequired(true)
        // }else {
        //      setAuthorRequired(true)
        // }
    }
    const handleAddTitle = () => {
        const modalHidden = document.querySelector("#modalAddAuthor")
        modalHidden.style.display = "flex"
    }
    const handelModalHidden = (e) => {
        const modalHidden = document.querySelector("#modalAddAuthor")
        if (e.target === modalHidden) {
            modalHidden.style.display = "none"
        }
    }
    const handelRepairModalHidden = (e) => {
        const modalHidden = document.querySelector("#modalRepairAuthor")
        if (e.target === modalHidden) {
            modalHidden.style.display = "none"
        }
    }
    const handelAddAuthor = () => {
        const regex = new RegExp("^[a-zA-Z]{5,30}$")
        if (regex.test(name) || name.includes(" ", 0)) {
            axios.post("http://localhost:4000/authors", { name: name.trim() })
                .then(res => {
                    const Addedauthors = res.data
                    setAuthors([...authors, Addedauthors])
                    RenderAuthors()
                    setName('')
                })
                .catch(err => console.log(err))
            const modalHidden = document.querySelector("#modalAddAuthor")
            modalHidden.style.display = "none"
        } else {
            console.log("Name", name)
            const modalHidden = document.querySelector("#modalAddAuthor")
            modalHidden.style.display = "flex"
        }

    }
    const handleDeleteAuthor = (id) => {
        axios.delete(`http://localhost:4000/authors/${id}`)
            .then(res => {
                const response = res.data
                const newAuthor = authors.filter((author) => {
                    return author.name !== response.name
                })
                setAuthors(newAuthor)
            })
    }

    const handleRepariAuthor = (id) => {
        const modalRepairAuthor = document.querySelector("#modalRepairAuthor")
        modalRepairAuthor.style.display = "flex"
        let authorData = document.querySelector("#author-" + id)
        let inputRepairAuthor = document.querySelector("#inputRepairAuthor")
        inputRepairAuthor.value = authorData.innerText

    }
    const handelSubmitRepairAuthor = () => {
        console.log(idRepair)
        axios.put(`http://localhost:4000/authors/${idRepair}`, { name: name.trim() })
            .then(res => {
                const { id } = res.data
                setAuthors(authors.map(author => {
                    return author.id === id ? { ...res.data } : author;
                }))
            })
        const modalRepairAuthor = document.querySelector("#modalRepairAuthor")
        modalRepairAuthor.style.display = "none"
    }


    const RenderAuthors = () => {
        return (
            <div className="authorRender">
                <ul className="displayInfoAuthor">
                    <h3 className="authorTitle">Name</h3>
                    {authors.map(author => (
                        <li
                            className="authorData"
                            id={`author-${author.id}`}
                            key={author.id}>{author.name}

                        </li>
                    ))}
                </ul>
                <ul className="displayInfoAuthor">
                    <h3 className="authorTitle">Create At</h3>
                    {authors.map(author => (
                        <li
                            className="authorData"
                            key={author.id}
                        >
                            {author.created_at}
                        </li>
                    ))}
                </ul>
                <ul className="displayInfoAuthor">
                    <h3 className="authorTitle">Updated At</h3>
                    {authors.map(author => (
                        <li
                            className="authorData"
                            key={author.id}
                        >
                            {author.updated_at}
                        </li>
                    ))}
                </ul>
                <ul className="authorHandle">
                    <h3 className="authorTitle">Delete</h3>
                    {authors.map(author => (
                        <li
                            key={author.id}
                            onClick={() => {
                                return handleDeleteAuthor(author.id)
                            }}
                        ><i className="authorData fa-solid fa-trash-can"></i>
                        </li>
                    ))}
                </ul>
                <ul className="authorHandle">
                    <h3 className="authorTitle">Edit</h3>
                    {authors.map(author => (
                        <li
                            key={author.id}
                        >
                            <i
                                onClick={() => handleRepariAuthor(author.id)}
                                onMouseEnter={() => setId(author.id)}
                                id="btnRepair"
                                className="authorData fa-solid fa-pen-to-square"
                            ></i>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
    return (
        <div
            className="authorDashBoards"
            id="authorDashBoards"
        >
            <div
                className="authorHandel"
            >
                <button
                    className="btnAddAuthor"
                    onClick={handleAddTitle}
                    id="btnAddAuthor"
                >Add Author</button>
                <div
                    className="modalAddAuthor"
                    onClick={handelModalHidden}
                    id="modalAddAuthor"
                >
                    <div className="formAddAuthor">
                        <h3>Add New Author</h3>
                        {authorRequired && <p className="requiredAuthor">Amount characters must than 6</p>}
                        <input
                            onBlur={handleRequiredInput}
                            placeholder="Enter Author..."
                            value={name}
                            onChange={e => {
                                setAuthorRequired(false)
                                return setName(e.target.value)
                            }}
                        />
                        <button
                            className="btnAddAuthor"
                            onClick={handelAddAuthor}
                        >Submit</button>
                    </div>
                </div>
                <div
                    className="modalAddAuthor"
                    onClick={handelRepairModalHidden}
                    id="modalRepairAuthor"
                >
                    <div className="formAddAuthor">
                        <h3>Repair Author</h3>
                        <input
                            id="inputRepairAuthor"
                            onBlur={handleRequiredInput}
                            placeholder="Enter Author..."
                            value={name}
                            onChange={e => {
                                setAuthorRequired(false)
                                return setName(e.target.value)
                            }}
                        />
                        <button
                            className="btnAddAuthor"
                            onClick={handelSubmitRepairAuthor}
                        >Submit</button>
                    </div>
                </div>
                {/* <button
                    className="btnSaveAuthor"
                    id="btnSaveAuthor"
                    onClick={handleSaveBtn}
                >Save Author</button> */}

            </div>
            <div className="authorDisplay"><RenderAuthors /></div>
        </div>
    )

}
export default Authors

// export default class Authors extends React.Component {
//     state = {
//         authors : [],
//     }
//     componentDidMount() {
//         axios.get("https://jsonplaceholder.typicode.com/albums")
//         .then(res => {
//             let authors =res.data
//             this.setState({authors})
//         })
//     }
//     render () {
//         return(
//             <div>
//                 <InputAuthor/>
//                 <ul>
//                     {this.state.authors.map (author => (
//                         <li key = {author.id}>{author.title}</li>
//                     )) }
//                 </ul>
//             </div>
//         )
//     }
// }
// class InputAuthor extends React.Component {
//     state = {
//         title : '',
//     }
//     handleAuthorAdd = e => {
//         this.setState({title: e.target.value});
//     }
//     handleSubmit = e => {
//         e.preventDefault();
//         const title = {
//             title : this.state.title
//         }
//         axios.post("https://jsonplaceholder.typicode.com/albums",title)
//             .then(res => {
//                 console.log("res", res)
//                 console.log("res",res.data)
//             })
//     }

//     render() {
//         return (
//             <form onSubmit={this.handleSubmit}>
//                 <label>
//                     <input type = "text" name = "nameAuthor" onChange ={this.handleAuthorAdd}/>
//                 </label>
//                 <button type = "submit" >Add Author</button>
//             </form>
//         )
//     }
// }
