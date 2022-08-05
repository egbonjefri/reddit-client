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
  const comments = useSelector((state)=>state.counter.comments);

  // eslint-disable-next-line 
  const search = useSelector((state)=>state.counter.searchPage);
  // eslint-disable-next-line 
  const [searchParams, setSearchParams] = useSearchParams();
  const [truthy, setTruthy] = useState(false)
  let navigate = useNavigate();
  const dispatch = useDispatch()
  const [change, setChange] = useState('');
  function handleSubmit(e) {
    navigate(`/search/?q=${change}`);
    e.preventDefault();
    dispatch(searchAdder(change))
      }
      
 useEffect(()=> {
  function handleChange() {
    
    const posts = document.querySelectorAll('.posts');
    const comments = document.querySelectorAll('.post-replies');
    const replies = document.querySelectorAll('.post-comment');



    const paragraphs = document.querySelectorAll('p');
    const titles = document.querySelectorAll('h5');
    const header = document.getElementsByClassName('nav-wrapper')[0];
    const icon1 = document.getElementsByClassName('ab')[0];
    const icon2 = document.getElementsByClassName('ab')[1];

    const body = document.body;
    const postTitle = document.querySelectorAll('.post-title')
  
  
    if (truthy) {
      
      body.style.backgroundColor = 'black';
      
      header.style.backgroundColor = 'black';
      icon1.style.color = 'white';
      icon2.style.color = 'white';

     
      
      posts.forEach(post => {
        post.style.backgroundColor = 'black';
        post.style.color = 'white'
      })
      comments.forEach(post => {
        post.style.backgroundColor = 'black';
        post.style.color = 'white';
        post.style.borderLeft = 'solid 1px white'

      })
      replies.forEach(post => {
        post.style.backgroundColor = 'black';
        post.style.color = 'white'
      })
      postTitle.forEach(post => {
        post.style.background = 'black';
      })
      paragraphs.forEach(item => {
        item.style.color = 'white'
      })
      titles.forEach(item => {
        item.style.color = 'white'
      })
  
    }
    else {
       
      body.style.backgroundColor = 'white';
      
      header.style.backgroundColor = 'white';
      icon1.style.color = 'black';
      icon2.style.color = 'black';

     
      
      posts.forEach(post => {
        post.style.backgroundColor = 'white';
        post.style.color = 'black'
      })
      comments.forEach(post => {
        post.style.backgroundColor = 'white';
        post.style.color = 'black';
        post.style.borderLeft = 'solid 2px black'

      })
      replies.forEach(post => {
        post.style.backgroundColor = 'white';
        post.style.color = 'black'
      })
      postTitle.forEach(post => {
        post.style.background = 'white';
      })
      paragraphs.forEach(item => {
        item.style.color = 'black'
      })
      titles.forEach(item => {
        item.style.color = 'black'
      })
    }
    
  }

  handleChange();
 
},[truthy, link, comments])
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
      <NavLink onClick={()=>dispatch(homepage())} to='/' className="left brand-logo">
        <h5><b>Egbonddit</b></h5>
        </NavLink>
      <div className="switch whit">
    <label>
      <span className='dark-mode'><i className='ab material-icons'>wb_sunny</i></span>
      <input onChange={()=>{
        truthy ? setTruthy(false) : setTruthy(true)
        }} type="checkbox"/>
      <span className="lever"></span>
      <span className='dark-mode'><i className='ab material-icons'>brightness_3</i></span>
    </label>
  </div>
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
