import { useEffect, useReducer, useRef, useState } from 'react'
import axios from 'axios'
import Select from 'react-select'
function Books() {
    // Call Api Books for bookData
    const [booksData, setBooksData] = useState([])
    //Call Api Authors for Authors
    const [authors, setAuthors] = useState([])
    // Call Api Categories for categories
    const [categories, setCategories] = useState([])

    // Set AuthorID with select_react for author
    const [authorId, setAuthorId] = useState()
    // Set description for description
    const [description, setDescription] = useState('')
    // Set hidenAds for Ads Alaways Actice
    const [hiddenAds, setHiddenAds] = useState(false)

    // Set source = 1 Always nothing for that
    const [source, setSource] = useState(1)
    //Set title for title
    const [title, setTitle] = useState('')

    // Set FileUpload render UploadBook with image/,,,,
    const [fileUploadBook, setFileUploadBook] = useState()

    const [idRepair, setId] = useState()
    
    const [selected, setSelected] = useState([])



    // const stateBooks = {
    //     authorId: null,
    //     description: "",
    //     hiddenAds: false,
    //     id: null,
    //     source: 1,
    //     title: "",
    //     imageThumbnail: "",
    // }


    const hostApi = 'http://localhost:4000';

    // Call Api Books get booksData
    useEffect(() => {
        axios.get(`${hostApi}/books`)
            .then(res => {
                const booksData = res.data
                console.log(res.data)
                console.log(booksData.data.imageThumbnail)
                booksData.data.map (bookData =>   {
                    return {
                        ...bookData,
                        imageThumbnail:bookData.imageThumbnail ? bookData.imageThumbnail : "https://aunovel.com/images/demo.png"
                    }
                })
                setBooksData(booksData.data)
            })
            .catch(err => console.log(err))
    }, [])



    // Handle When click btn Submit Book
    const handelSubmitBookBtn = () => {
        let data = {
            author: authorId,
            description: description.trim(),
            hiddenAds,
            source,
            title : title.trim(),
            imageThumbnail: fileUploadBook,
        }
        // Call api book send data for api
        axios.post(`${hostApi}/books`, data)
            .then(res => {
                const dataRes = res.data
                console.log(dataRes)

                // merge 2 arrays together and 
                setBooksData([...booksData, dataRes])
                // Set Authors
                setAuthorId("")
                //Set Description
                setDescription("")
                // Set title
                setTitle("")
                //Set new File // have errer don't delete data send to api Upload
                setFileUploadBook("")
            })
            .catch(err => console.log(err))
    }
    const handleDeleteAuthor = (id) => {
        axios.delete(`${hostApi}/books/${id}`)
            .then(res => {
                const response = res.data;
                const newBooksData = booksData.filter(bookData => {
                    return bookData.title != response.title
                })
                setBooksData(newBooksData)
            })
    }


    // When click icon Repair
    const handleRepariAuthor = (id) => {
        document.querySelector("#modalRepairBookData").style.display = "flex"
        const dataTitle = document.querySelector('#bookData-title-' + id)
        // const dataCategory = document.querySelector("#bookData-catogory" + id)
        const dataAuthor = document.querySelector("#bookData-author-" + id)
        const dataDescription = document.querySelector('#bookData-decription-' + id)
        const dataThumbnail = document.querySelector('#bookData-Thumbnail-' + id)

        const valueTitle = document.querySelector("#InputRepairTitleBookData")
        // const valueCatefory = document.querySelector("#InputRepairCategoryBookData")
        const valueAuthor = document.querySelector("#InputRepairAuthorBookData")
        const valueDescription = document.querySelector("#InputRepairDescriptionBookData")
        const valueThumbnail = document.querySelector("#InputRepairThumbnailBookData")

        valueTitle.value = dataTitle.innerText
        valueAuthor.value = dataAuthor.innerText
        valueDescription.value = dataDescription.innerText
        valueThumbnail.value = dataThumbnail.innerText
        
    }
    // When Click Sumbit modal repair
    const handleSubmitRepairBookData = () => {
        let data = {
            author: authorId,
            description: description.trim(),
            hiddenAds,
            source,
            title: title.trim(),
            imageThumbnail: fileUploadBook,
        }
        axios.put(`${hostApi}/books/${idRepair}`, data)
        .then(res => {
            const {id} = res.data
            setBooksData(booksData.map (bookData => {
                console.log(id, bookData.id)
                return bookData.id === id ? {...res.data} : bookData
            }))
        })
        // Set Authors
        setAuthorId("")
        //Set Description
        setDescription("")
        // Set title
        setTitle("")
        //Set new File // have errer don't delete data send to api Upload
        setFileUploadBook("")
    }


    // When click choose file Render Dom and Upload API 
    const handelAddFileImageBook = (e) => {
        const formData = new FormData();
        const file = e.target.files[0]

        formData.append('file', file);
        axios.post(`${hostApi}/upload`, formData)

            .then(res => {
                setFileUploadBook(res.data);
            })
            .catch(err => console.log(err))
    }

    // When click Add Book ACtive modal Add Book
    const handleAddBookModal = () => {
        document.querySelector("#modalAddBook").style.display = "flex"
    }
    // When click target element and click outside modal 
    const handelAddBookModal = (e) => {
        const modal = document.querySelector("#modalAddBook")
        if (e.target == modal) {
            modal.style.display = "none"
        }
    }

    // When click target element repair click outside modal 
    const handelRepairBookModal = (e) => {
        const modal = document.querySelector("#modalRepairBookData")
        if (e.target === modal) {
            modal.style.display = "none"
        }
    }

    const handleAddBookSelect = (e) => {
        setSelected(e)

        console.log(selected)
    }

    // Render Book to Dom
    const RenderBooks = () => {
        return (
            <div
                className="authorRender"
            >
                <ul className="displayInfoAuthor">
                    <h3 className="authorTitle"> Titles </h3>
                    {booksData.map(bookData => (
                        <li
                            className="authorData"
                            key={bookData.id}
                            id={`bookData-title-${bookData.id}`}
                        >
                            <span className="bookData">{bookData.title}</span>
                            {/* <span className="bookData">{bookData.slug}</span>
                        <span className="bookData">{bookData.description}</span>
                        <img className="imgUploadBook" src={bookData.imageThumbnail} /> */}
                        </li>
                    ))}
                </ul>
                <ul className="displayInfoAuthor">
                    <h3 className="authorTitle"> Slugs </h3>
                    {booksData.map(bookData => (
                        <li
                            className="authorData"
                            key={bookData.id}
                            id={`bookData-author-${bookData.id}`}
                        >
                            {/* <span className="bookData">{bookData.title}</span> */}
                            <span className="bookData">{bookData.slug}</span>
                            {/* <span className="bookData">{bookData.description}</span> */}
                            {/* <img className="imgUploadBook" src={bookData.imageThumbnail} /> */}
                        </li>
                    ))}
                </ul>
                <ul className="displayInfoAuthor">
                    <h3 className="authorTitle"> Descriptions </h3>
                    {booksData.map(bookData => (
                        <li
                            className="authorData"
                            key={bookData.id}
                            id={`bookData-decription-${bookData.id}`}
                        >
                            {/* <span className="bookData">{bookData.title}</span> */}
                            {/* <span className="bookData">{bookData.slug}</span> */}
                            <span className="bookData">{bookData.description}</span>
                            {/* <img className="imgUploadBook" src={bookData.imageThumbnail} /> */}
                        </li>
                    ))}
                </ul>
                <ul className="displayInfoAuthor">
                    <h3 className="authorTitle"> Thumbnails </h3>
                    {booksData.map(bookData => (
                        <li
                            className="authorData"
                            key={bookData.id}
                            id={`bookData-Thumbnail-${bookData.id}`}
                        >
                            {/* <span className="bookData">{bookData.title}</span> */}
                            {/* <span className="bookData">{bookData.slug}</span> */}
                            {/* <span className="bookData">{bookData.description}</span> */}
                            <img className="imgLoadBook" src={`${hostApi}/${bookData.imageThumbnail}`} />
                        </li>
                    ))}
                </ul>
                <ul className="authorHandle">
                    <h3 className="authorTitle">Delete</h3>
                    {booksData.map(bookData => (
                        <li
                            key={bookData.id}
                            onClick={() => {
                                return handleDeleteAuthor(bookData.id)
                            }}
                        ><i className="authorData fa-solid fa-trash-can"></i>
                        </li>
                    ))}
                </ul>
                <ul className="authorHandle">
                    <h3 className="authorTitle">Edit</h3>
                    {booksData.map(bookData => (
                        <li
                            key={bookData.id}
                        >
                            <i
                                onClick={() => handleRepariAuthor(bookData.id)}
                                onMouseEnter={() => setId(bookData.id)}
                                id="btnRepair"
                                className="authorData fa-solid fa-pen-to-square"
                            ></i>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }


    // Call Api to add authors
    useEffect(() => {
        axios.get("http://localhost:4000/authors")
            .then(res => {
                setAuthors(res.data)
            }).catch(err => console.log(err))
    }, [])
    //Call api to add categories
    useEffect(() => {
        axios.get("http://localhost:4000/categories")
            .then(res => {
                setCategories(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    // Prize array author into single Array
    const optionsAuthors = [...authors]
    // Prize array categories into single Array
    const optionsCategories = [...categories]

    // Loop through the Array optionsAuthors to get value and label
    const newOptionsAuthorsId = optionsAuthors.map((option) => {
        return {
            value: option.name, label: option.name
        }
    })
    // loop thround the Array optionsCategories to get value and label
    const newOptionsCategories = optionsCategories.map((optionCategory) => {
        return {
            value: optionCategory.name, label: optionCategory.name
        }
    })

    return (
        <div className = "authorDashBoards">
            <button
                className="btnAddBook"
                onClick={handleAddBookModal}
            >
                Add Books</button>

            <div
                className="modalAddBook"
                id="modalAddBook"
                onClick={handelAddBookModal}
            >
                <div className="formAddBook">
                    <label>
                        <h3>Title</h3>
                        <input
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            type="text" />
                    </label>
                    <label>
                        <h3>Author</h3>
                        <Select options={newOptionsAuthorsId} />
                    </label>
                    <label>
                        <h3>Categories</h3>
                        <Select
                            id = "selectedCategories"
                            closeMenuOnSelect={false}
                            isMulti
                            options={newOptionsCategories}
                            onChange = {handleAddBookSelect}
                        />
                    </label>
                    <label>
                        <h3>Hidden Ads</h3>
                        <input
                            value={hiddenAds}
                            className="checkBoxInputBook" type="checkbox" />
                    </label>
                    <label>
                        <h3>Descriptions</h3>
                        <input
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            type="type" />
                    </label>
                    <label>
                        <h3>File Image</h3>
                        <input
                            onChange={handelAddFileImageBook}
                            type="file" />
                    </label>
                    {fileUploadBook && <img className="imgUploadBook" src={`http://localhost:4000/${fileUploadBook}`} />}
                    <button
                        onClick={handelSubmitBookBtn}
                        className="btnAddNewBook">
                        Submit</button>
                </div>
            </div>
            <RenderBooks />
            <div
                className="modalAddBook"
                id="modalRepairBookData"
                onClick={handelRepairBookModal}
            >
                <div className="formAddBook">
                    <label>
                        <h3>Title</h3>
                        <input
                            id="InputRepairTitleBookData"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            type="text" />
                    </label>
                    <label>
                        <h3>Author</h3>
                        <Select
                            id="InputRepairAuthorBookData"
                            options={newOptionsAuthorsId} />
                    </label>
                    <label>
                        <h3>Categories</h3>
                        <Select
                            id="InputRepairCategoryBookData"
                            closeMenuOnSelect={false}
                            defaultValue = {[selected[2]]}
                            isMulti
                            options={newOptionsCategories}
                        />
                    </label>
                    <label>
                        <h3>Hidden Ads</h3>
                        <input
                            id="InputRepairAdsBookData"
                            value={hiddenAds}
                            className="checkBoxInputBook" type="checkbox" />
                    </label>
                    <label>
                        <h3>Descriptions</h3>
                        <input
                            id="InputRepairDescriptionBookData"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            type="type" />
                    </label>
                    <label>
                        <h3>File Image</h3>
                        <input
                            id="InputRepairThumbnailBookData"
                            onChange={handelAddFileImageBook}
                            type="file" />
                    </label>
                    {fileUploadBook && <img className="imgUploadBook" src={`http://localhost:4000/${fileUploadBook}`} />}
                    <button
                        onClick={handleSubmitRepairBookData}
                        className="btnAddNewBook">
                        Submit</button>
                </div>

            </div>
        </div>
    )
}

export default Books