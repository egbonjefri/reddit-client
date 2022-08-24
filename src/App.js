
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState} from 'react'
import {NavLink, useSearchParams, useNavigate} from 'react-router-dom';
import ChangeOver from './ChangeOver'
import {
 valueSetter, afterResetter, resetter, subber, searchAdder,homepage
} from './features/counter/counterSlice';
import worldNews from './icons/worldNews.png'
import woahDude from './icons/woahDude.png'
import winnipeg from './icons/winnipeg.png'
import space from './icons/space.png'
import science from './icons/science.png'
import nature from './icons/nature.png'
import mildlyInteresting from './icons/mildlyInteresting.png'
import funny from './icons/funny.png'
import awwducational from './icons/awwducational.png'
import animals from './icons/animals.png'
import javascript from './icons/javascript.png'










let array1 = [{name: 'r/worldnews', id: 0, src: worldNews},
 {name: 'r/Winnipeg', id: 1 , src: winnipeg}, 
 {name: 'r/mildlyinteresting', id: 2, src: mildlyInteresting}, 
 {name: 'r/NatureIsFuckingLit', id: 3, src: nature},
{name: 'r/science', id: 4, src: science}, 
{name: 'r/AnimalsBeingJerks', id: 5, src: animals}, 
{name: 'r/Awwducational', id: 6, src: awwducational},
 {name: 'r/funny', id: 7, src: funny}, 
{name: 'r/space', id: 8, src: space},
{name: 'r/woahdude', id: 9, src: woahDude},
 {name: 'r/javascript', id: 10, src: javascript}];





export function untoggle () {


  const toggle = document.getElementsByClassName('toggle')[0];
  const menu = document.getElementsByClassName('menu')[0];
  const cover = document.getElementsByClassName('cover')[0];
  toggle.classList.remove('btn-active');
   menu.classList.remove('menu-active');
   menu.classList.remove('animate');
  cover.classList.remove('covering');

}  
function App() {
  let link = useSelector((state)=>state.counter.link);
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
    untoggle();
    navigate(`/search/?q=${change}`);
    e.preventDefault();
    dispatch(searchAdder(change))
      }
    function handleSearch(e) {
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
function toggleBtn () {
  const toggle = document.getElementsByClassName('toggle')[0];
  const menu = document.getElementsByClassName('menu')[0];
  const cover = document.getElementsByClassName('cover')[0];
  toggle.classList.toggle('btn-active');
  menu.classList.toggle('menu-active');
  menu.classList.add('animate');
  cover.classList.add('covering');
}

useEffect(()=> {
  
  if(link === '') {
    navigate('/')
    dispatch(resetter())
  }
        // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])
 useEffect(()=> {
  untoggle()
  function handleChange() {
    
    const posts = document.querySelectorAll('.posts');
    const comments = document.querySelectorAll('.post-replies');
    const replies = document.querySelectorAll('.post-comment');
    const postPost = document.querySelectorAll('.post-post');

    const replyBtn = document.querySelectorAll('.reply-button')
    const paragraphs = document.querySelectorAll('p');
    const titles = document.querySelectorAll('h5');
    const header = document.getElementsByClassName('nav-wrapper')[0];
    const icon1 = document.getElementsByClassName('ab')[0];
    const icon2 = document.getElementsByClassName('ab')[1];

    const body = document.body;
    const postTitle = document.querySelectorAll('.post-title')
  
  
    if (truthy) {
      
      body.style.backgroundColor = 'rgb(26,26,27)';
      
      header.style.backgroundColor = 'rgb(26,26,27)';
      icon1.style.color = 'white';
      icon2.style.color = 'white';

     
      
      posts.forEach(post => {
        post.style.backgroundColor = 'rgb(26,26,27,0.8)';
        post.style.color = 'white';
        post.style.boxShadow = '1px 1px 5px #858383'
      })
      comments.forEach(post => {
        post.style.backgroundColor = 'rgb(26,26,27,0.8)';
        post.style.color = 'white';
        post.style.borderLeft = 'solid 1px white'

      })
      replyBtn.forEach((item)=>{
        item.style.backgroundColor = 'rgb(26,26,27,0.8)'
      })
      replies.forEach(post => {
        post.style.backgroundColor = 'rgb(26,26,27)';
        post.style.color = 'white'
      })
      postPost.forEach(post => {
        post.style.borderLeft = 'solid 1px white'
      })
      postTitle.forEach(post => {
        post.style.background = 'rgb(26,26,27)';
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

      replyBtn.forEach((item)=>{
        item.style.backgroundColor = 'white'
      })
      
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
      postPost.forEach(post => {
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
  <div className='toggle' onClick={() => toggleBtn()}>
                        <div className='one'></div>
                        <div className='two'></div>
                        <div className='three'></div>
                        </div>
                    <div className='menu'>
                    <form noValidate onSubmit={handleSubmit}>
      <div className="mobile-search input-field inline right">
           <i className='material-icons'>search</i> <input onChange={(e)=>handleSearch(e)} placeholder='Search Reddit' type="email"/>
          </div>
          </form>
          
                        <div onClick={()=>untoggle()}  className='menu-list black darken-2'>
                        <div className="mobile-switch whit">
    <label>
      <span className='dark-mode'><i className='ab material-icons'>wb_sunny</i></span>
      <input onChange={()=>{
        truthy ? setTruthy(false) : setTruthy(true)
        }} type="checkbox"/>
      <span className="lever"></span>
      <span className='dark-mode'><i className='ab material-icons'>brightness_3</i></span>
    </label>
  </div>
                          <h4 className='heading blue-grey-text'>Subreddits</h4>
                          <div className='menu-items'>
                           {array1.map((item)=>{
                             return (
                               <div onClick={()=> {
                                 navigate('/', {replace:true});
                                 dispatch(valueSetter(item.name));
                                 dispatch(afterResetter())
                                 dispatch(subber(item.name))
                               }} key={item.id}>
                                 <span className='mobile-menu-items'><img className='mobile-icons' alt={item.name} src={item.src}/>
                                 {item.name}
                                 </span>
                                 </div>
                             )
                           })}
                            </div>
                        </div>
                        </div>
      <form noValidate onSubmit={handleSubmit}>
      <div className="search input-field inline right">
           <i className='material-icons'>search</i> <input onChange={(e)=>handleSearch(e)} placeholder='Search Reddit' type="email"/>
          </div>
          </form>
    </div>
  </nav>
      <ChangeOver />
           <div onClick={()=>untoggle()} className='cover'></div>

    </div>
  );
}

export default App;
