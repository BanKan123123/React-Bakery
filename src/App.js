import logo from './logo.svg';
import { useEffect, useState } from 'react'
import './styleApp/App.css';
import Authors from './component/authors';
import Categories from './component/categories';
import Books from './component/books';
import ReactPaginate from "react-paginate"
import axios from "axios"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

function App() {
  const tabs = ["Authors", "Categories", "Books"]
  const [type, setType] = useState('Authors')
  const [authors, setAuthors] = useState([])


  useEffect ( () => {
    axios.get('http://localhost:4000/authors')
    .then(res => {
      setAuthors(res.data)
    })
  }, [])

  const getApiLimits =  (currentPage) => {
    axios.get(`http://localhost:4000/authors?_page=${currentPage}&_limit=10`)
  }

  const handlePageClick = (data) => {
    console.log(data.selected)
  }
  return (

    <Router>
      <div className="App">
        <ul className="ListDashBoards">
          {tabs.map(tab => (
            <li
              key={tab}
            >
              <Link
                key={tab}
                style={tab === type ? {
                  backgroundColor: '#2c3344',
                  color: '#fff',
                } : {}}
                className="nameBoard" to={`/${tab}`}
                onClick={() => setType(tab)}
              >
                {tab === 'Authors' && <i className="fa-solid fa-user-pen"></i>}
                {tab === 'Categories' && <i className="fa-solid fa-clipboard-list"></i>}
                {tab === 'Books' && <i className="fa-solid fa-swatchbook"></i>}
                {tab}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={10}
        marginPagesDisplayed={4}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
      <Routes>
        <Route exact path='/authors' element={< Authors />}>
              
        </Route>
        <Route exact path='/categories' element={< Categories />}>

        </Route>
        <Route exact path='/books' element={< Books />}>

        </Route>

      </Routes>
    </Router >
  )

}
export default App;

// N???u m?? ta s???a d??? li???u ??? ngo??i giao di???n m?? ch??? c?? d??? li???u c???a minh thay ?????i th?? l?? one-Way binding ho???c ng?????c l???i
// M?? n???u s???a l???i d??? li???u c???a m??nh m?? giao di???n n?? c??ng thay ?????i theouseEffect hook th?? l?? Tow-Way binding