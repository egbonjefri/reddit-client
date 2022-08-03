import Homepage from './Homepage'
import Subreddit from './Subreddit'
import Search from './Search'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState} from 'react'
import {NavLink, useSearchParams, useNavigate, Routes, Route} from 'react-router-dom';

import {
  searchAdder,homepage
} from './features/counter/counterSlice';
function App() {
  const link = useSelector((state)=>state.counter.link);
  // eslint-disable-next-line 
  const search = useSelector((state)=>state.counter.searchPage);
  // eslint-disable-next-line 
  const [searchParams, setSearchParams] = useSearchParams();
  let navigate = useNavigate();
  const dispatch = useDispatch()
  const [change, setChange] = useState('');
  function handleSubmit(e) {
    navigate(`/search/?q=${change}`);
    e.preventDefault();
    dispatch(searchAdder(change))
      }

  useEffect(()=> {
    if (link === '') {
     navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="App">
              <nav>
    <div className="nav-wrapper">
      <NavLink onClick={()=>dispatch(homepage())} to='/' className="left brand-logo">Egbonddit</NavLink>
      <form noValidate onSubmit={handleSubmit}>
      <div className="search input-field inline right">
           <i className='material-icons'>search</i> <input onChange={(e)=>{
                 let search;       
                 if (e.target.value) {
                   setChange(encodeURIComponent(e.target.value))
                     search = {
                         q: encodeURIComponent(e.target.value)
                     }
                   }
                     else {
                         search = undefined
                     }
                 setSearchParams(search, {replace: true})
           }
             } placeholder='Search Reddit' type="email"/>
          </div>
          </form>
    </div>
  </nav>
      <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path={link} element={<Subreddit />} />
      <Route path={`/search/`} element={<Search />} />
           </Routes>  
    </div>
  );
}

export default App;
