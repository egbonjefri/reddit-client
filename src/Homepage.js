import React, { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import ReactLoading from 'react-loading'
import { useSelector, useDispatch } from 'react-redux';
import {
   searchNav, nameAdder, resetter, postAdder,linkAdder
} from './features/counter/counterSlice';
import './materialize.css'
const Loading = ({ type, color }) => (
  <ReactLoading type={'cylon'} color={'grey'} />
);

function htmlDecode(input) {
  let doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent
}
function Homepage() {
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const blank = useSelector((state)=>state.counter.blank);
  const value = useSelector((state)=>state.counter.value);
  const [next, setNext] = useState(false);
  const [truthy, setTruthy] = useState(false)
  const postArray = useSelector((state)=>state.counter.posts);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  useEffect(()=> {
    setLoading(true)
    setTimeout(()=> {
      
  const loadPost =  async () => {

     if (value === '') {
      if (truthy) {
        const response = await axios.get(`https://www.reddit.com/r/canada.json`, { params: { after:text , limit: 100} })
        dispatch(postAdder((response.data.data.children)));
        dispatch(resetter());
        setTruthy(false)
      }
      else {
        const response = await axios.get(`https://www.reddit.com/r/canada.json`, { params: { limit: 100}})
        dispatch(postAdder((response.data.data.children)));
        setText(response.data.data.after)
        dispatch(resetter())
    }
  }
    else {
      const response = await axios.get(`https://www.reddit.com/${blank}.json`, { params: { limit: 100}})
      dispatch(postAdder((response.data.data.children)));
      dispatch(resetter());
    }
  }
    loadPost();
    setLoading(false)
  }, 2000);
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, next])



useEffect(()=> {
  const element = document.getElementById('myBtn');
  window.addEventListener('scroll', ()=>{

    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2) {
      setNext(true);
      setTruthy(true)
    }
    if(window.scrollY > 300) {
      element.style.display = 'block';
    }
  
    else {
      element.style.display = 'none';
    }
  }, true)
},[])

function handleScroll () {
  setNext(false)
  window.scroll({
    top: -2500, 
    left: 0, 
    behavior: 'smooth' 
  });

}
  return (
    <div>
  <button onClick={()=>handleScroll()} id='myBtn' className='button-top'>Back to Top</button>
      {loading ? (
              <div className='loading'>
              <Loading />
              </div>) :
              postArray.map((item)=> {
                let unix_timeStamp = item.data.created;
                let date = new Date(unix_timeStamp * 1000);
                let now = new Date();
                let hours = date.getHours();
                let y = now.getHours();
                let dayDate = date.getDate();
                let nowDate = now.getDate();
                let nowMonth = now.getMonth();
                let dateMonth = date.getMonth();
                let c = nowMonth - dateMonth;
                let z = nowDate - dayDate;
                let minutes = now.getMinutes() - date.getMinutes();
                let x;
                let a;                
                (z === 0 && c === 0) ? x = y - hours : (c===0 && z === 1) || z === -30 ? x = (24-hours) + y : (c===0) ? a = nowDate-dayDate : a = (31-dayDate)+nowDate; 
                return(
                    
                  <div className='post-cta' key={Number(item.data.created)}>
                    <div className='posts'>
                    <div className='divide'>
                      <i className='arrow material-icons'>arrow_drop_up</i>
                      <p className='ups'>{item.data.ups > 1000 ? <b>{(item.data.ups/1000).toFixed(1)+'k'}</b> : <b>{item.data.ups}</b> }</p>
                      <i className='arrow material-icons'>arrow_drop_down</i>
                      </div>
                <div onClick={()=>{
                      let str = item.data.permalink.normalize('NFD').replace(/\p{Diacritic}/gu, '')
                      let newStr = item.data.permalink.substr(1);

                      dispatch(nameAdder(item.data.id));
                       dispatch(linkAdder(str));
                       dispatch(searchNav(newStr));
                       navigate(str);
                        }}  className='main'>
                    <span className='black-text' >
           <p className='center'>
             <span className='blue-grey-text'>{item.data.subreddit_name_prefixed} | </span>
                  Posted by <b> {item.data.author}</b>
                  <span > |</span>
                  <span> {(x===1) ? `${x} hour ago`:(a===1) ? `1 day ago`:(a>1) ? `${a} days ago`: (x===0)?`${minutes} minutes ago`: `${x} hours ago`}</span>
                  </p>
                <h5>{item.data.title}</h5>
                { (item.data.media !== null && item.data.media.hasOwnProperty('reddit_video')) ? <video controls autoPlay>{<source src={`${item.data.secure_media.reddit_video.fallback_url}autoplay=1&muted=1`} />}</video> 
            :
            (typeof item.data.preview ==='object' && item.data.preview.hasOwnProperty('reddit_video_preview')) ? <video autoPlay controls>{<source src={`${item.data.preview.reddit_video_preview.fallback_url}`} type='video/mp4' />}</video>
            :
            (typeof item.data.preview ==='object')&& <img src={htmlDecode(item.data.preview.images[0].source.url)} alt={item.data.title} />
           }                
            <p className='cmnt-p'><i className='comment material-icons'>comment</i>{item.data.num_comments === 1 ? <span>{item.data.num_comments} Comment</span> :<span>{item.data.num_comments} Comments</span>}</p>
               </span>
                </div>
                </div>
                </div>
                 )
              })
              
          }

    </div>
  );
}

export default Homepage;
