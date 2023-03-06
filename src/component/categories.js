import { useEffect, useState } from 'react'
import axios from "axios";

function Categories() {
    const [authors, setAuthors] = useState([])

    const [name, setName] = useState('')
    const [idRepair, setId] = useState()
    const [authorRequired, setAuthorRequired] = useState(false)

    useEffect(() => {
        axios.get("http://localhost:4000/categories")
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
        const regex = new RegExp("^[a-zA-Z]{3,30}$")
        if (regex.test(name) || name.includes(" ", 0)) {
            axios.post("http://localhost:4000/categories", { name: name.trim() })
                .then(res => {
                    const Addedauthors = res.data
                    setAuthors([...authors, Addedauthors])
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
        axios.delete(`http://localhost:4000/categories/${id}`)
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
        axios.put(`http://localhost:4000/categories/${idRepair}`, { name: name.trim() })
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
                >Add Category</button>
                <div
                    className="modalAddAuthor"
                    onClick={handelModalHidden}
                    id="modalAddAuthor"
                >
                    <div className="formAddAuthor">
                        <h3>Add New Author</h3>
                        {authorRequired && <p className="requiredAuthor">Amount characters must than 4</p>}
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

export default Categories