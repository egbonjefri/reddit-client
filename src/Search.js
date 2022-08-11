import axios from 'axios';
import ReactLoading from 'react-loading'
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { searchF, valueSetter, subber, resetter, searchNav, linkAdder } from './features/counter/counterSlice';
const Loading = ({ type, color }) => (
    <ReactLoading type={'spin'} color={'grey'} />
  );
function htmlDecode(input) {
    let doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent
  }
export default function Search() {
const search = useSelector((state)=>state.counter.searchLink);
const searchArray = useSelector((state)=>state.counter.searches);
const navigate = useNavigate()
const dispatch = useDispatch();
const [loading, setLoading] = useState(true);

useEffect(()=> {
    setLoading(true)
    setTimeout(()=> {
  const loadPost =  async () => {
    const response = await axios.get(`https://www.reddit.com/search.json?q=${search}`, { params: { limit: 100}})
     dispatch(searchF((response.data.data.children)));
     dispatch(resetter())
    }
    setLoading(false);
    loadPost();
  }, 5000)
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

    return (
        <div>
        {loading ? (
            <div className='loading'>
            <Loading />
            </div>) :
         searchArray.map((item)=> {
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
 
              <div key={Number(item.data.created)}>
               
              <div className='post-cta'>
                <div className='posts'>
                <div className='divide'>
                  <i className='arrow material-icons'>arrow_drop_up</i>
                  <p className='ups'>{item.data.ups > 1000 ? <b>{(item.data.ups/1000).toFixed(1)+'k'}</b> : <b>{item.data.ups}</b> }</p>
                  <i className='arrow material-icons'>arrow_drop_down</i>
                  </div>

            <div  className='main'>
                <span className='black-text' >
                <p className='search-p center'>
           <span onClick={()=> {
               navigate('/', {replace:true});
               dispatch(valueSetter(item.data.permalink));
               dispatch(subber(item.data.subreddit_name_prefixed))
           }} className='searches blue-grey-text'>{item.data.subreddit_name_prefixed} </span>
           |
              Posted by <b>{item.data.author}</b>
              <span> |</span>
              <span> {(x===1) ? `${x} hour ago`:(a===1) ? `1 day ago`:(a>1) ? `${a} days ago`: (x===0)?`${minutes} minutes ago`: `${x} hours ago`}</span>
              </p>
              <div onClick={()=>{
                let a = item.data.permalink.substr(1);
                let str = item.data.permalink.normalize('NFD').replace(/\p{Diacritic}/gu, '')
                dispatch(linkAdder(str));
                navigate(str, {replace: true});
                dispatch(searchNav(a));
                    }} >
            <h5>{item.data.title}</h5>
           { (item.data.media !== null && item.data.media.hasOwnProperty('reddit_video')) ? <video controls loop autoPlay>{<source src={`${item.data.secure_media.reddit_video.fallback_url}autoplay=1&muted=1`} />}</video> 
            :
            (typeof item.data.preview ==='object' && item.data.preview.hasOwnProperty('reddit_video_preview')) ? <video autoPlay loop controls>{<source src={`${item.data.preview.reddit_video_preview.fallback_url}`} type='video/mp4' />}</video>
            :
            (typeof item.data.preview ==='object')&& <img src={htmlDecode(item.data.preview.images[0].source.url)} alt={item.data.title} />
           }

            <p className='cmnt-p'><i className='comment material-icons'>comment</i>{item.data.num_comments === 1 ? <span>{item.data.num_comments} Comment</span> :<span>{item.data.num_comments} Comments</span>}</p>
           </div>
           </span>
            </div>
            </div>
            </div>
            </div>
             )
          })
          
      }
            </div>
    )
}