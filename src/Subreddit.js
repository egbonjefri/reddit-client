import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {commentAdder} from './features/counter/counterSlice';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Markdown from 'marked-react'


export default function Subreddit() {

    const comments = useSelector((state)=>state.counter.comments);
    const name = useSelector((state)=>state.counter.fullname);
    const searchPage = useSelector((state)=>state.counter.searchPage)
    const title = useSelector((state)=>state.counter.title);
    const value = useSelector((state)=>state.counter.value);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    function htmlDecode(input) {
      let doc = new DOMParser().parseFromString(input, "text/html");
      return doc.documentElement.textContent
    }

    useEffect(()=> {
     
        setTimeout(()=> {
      const loadPost =  async () => {
          if (searchPage !== '') {
            const response = await axios.get(`https://www.reddit.com/${searchPage}.json`);
            dispatch(commentAdder((response.data)));
          }
          else if (value !== '') {
            const response = await axios.get(`https://www.reddit.com${value}.json`);
            dispatch(commentAdder((response.data)));   
          }
          else {
        const response = await axios.get(`https://www.reddit.com/r/canada/comments/${name}.json`);
        dispatch(commentAdder((response.data)));
          }
        }
        window.scroll({
          top: -2500, 
          left: 0, 
          behavior: 'smooth' 
        });
        setLoading(false);
        loadPost();
      }, 5000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

    return (
        <div>
        {loading ? (
                    <div className="post">
                    <div className="left-col">
                        <div className="avatar">
            <Skeleton
                count={3}
                height="100%"
              containerClassName="avatar-skeleton"
                        />
    
                        </div>
                        <div className="new">
            <Skeleton
                count={3}
                height="100%"
              containerClassName="avatar-skeleton"
                        />
    
                        </div>
                        <div className="other">
            <Skeleton
                count={3}
                height="100%"
              containerClassName="avatar-skeleton"
                        />
    
                        </div>
                        <div className="new-other">
            <Skeleton
                count={3}
                height="100%"
              containerClassName="avatar-skeleton"
                        />
    
                        </div>
                        </div>
            </div>) :
            title.map((item)=> {
                let unix_timeStamp = item.data.created;
                let random = Math.floor(Math.random() * 10000);
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
                z === 0 && c === 0 ? x = y - hours : (c===0 && z === 1) || z === -30 ? x = (24-hours) + y : a = (31-dayDate)+nowDate; 
                return (
                    <div className='back' key={item.data.created+item.data.score+item.data.author.length+random}>
                        <div className='center post-title'>
                        <p>Posted by <b>{item.data.author}</b>
                        <span> |</span>
                        <span> {(x===1) ? `${x} hour ago`:(a===1) ? `1 day ago`:(a>1) ? `${a} days ago`: (x===0)?`${minutes} minutes ago`: `${x} hours ago`}</span>
                        </p>
                        <h5>{item.data.title}</h5>
                        <a target='_blank' rel="noreferrer" href={item.data.url} className='link'>{item.data.url}</a>
                        { (item.data.media !== null && item.data.media.hasOwnProperty('reddit_video')) ? <video className='mobile-only' controls autoPlay>{<source src={`${item.data.secure_media.reddit_video.fallback_url}autoplay=1&muted=1`} />}</video> 
            :
            (typeof item.data.preview ==='object' && item.data.preview.hasOwnProperty('reddit_video_preview')) ? <video className='mobile-only' autoPlay controls>{<source src={`${item.data.preview.reddit_video_preview.fallback_url}`} type='video/mp4' />}</video>
            :
            (typeof item.data.preview ==='object')&& <img className='mobile-only' src={htmlDecode(item.data.preview.images[0].source.url)} alt={item.data.title} />
           } 
                        </div>
                       {comments.map((item2)=>{
                let timeStamp2 = item2.data.created;
                let random2 = Math.floor(Math.random() * 10000);
                let date2 = new Date(timeStamp2* 1000);
                let hours2 = date2.getHours();
                let dayDate2 = date2.getDate();
                let dateMonth2 = date2.getMonth();
                let c2 = nowMonth - dateMonth2;
                let z2 = nowDate - dayDate2;
                let minutes2 = now.getMinutes() - date2.getMinutes();
                let x2;
                let a2; 
                z2 === 0 && c2 === 0 ? x2 = y - hours2 : (c2===0 && z2 === 1) || z2 === -30 ? x2 = (24-hours2) + y : a2 = (31-dayDate2)+nowDate; 
                           return (
                               <div key={item2.data.created+item2.data.score+random2}>
                                   <div className='post-comment'>
                                   {item2.kind==='t1' &&<p className='blue-grey-text'><em>{item2.data.author}</em>
                                    <span><em> | {(x2===1) ? `${x2} hour ago`:(a2===1) ? `1 day ago`:(a2>1) ? `${a2} days ago`: (x2===0)?`${minutes2} minutes ago`: `${x2} hours ago`}</em></span>
                                    </p>}
                                    <Markdown>{item2.data.body}</Markdown>
         
                                {(item2.data.replies === undefined) ? '' : (typeof item2.data.replies !=='object') ? '' : <div>{item2.data.replies.data.children.map((item3)=>{
                                                    let timeStamp3 = item3.data.created;
                                                    let random3 = Math.floor(Math.random() * 10000);
                                                    let date3 = new Date(timeStamp3* 1000);
                                                    let hours3 = date3.getHours();
                                                    let dayDate3 = date3.getDate();
                                                    let dateMonth3 = date3.getMonth();
                                                    let c3 = nowMonth - dateMonth3;
                                                    let z3 = nowDate - dayDate3;
                                                    let minutes3 = now.getMinutes() - date3.getMinutes();
                                                    let x3;
                                                    let a3;                
                                                    z3 === 0 && c3 === 0 ? x3 = y - hours3 : (c3===0 && z3 === 1) || z3 === -30 ? x3 = (24-hours3) + y : a3 = (31-dayDate3)+nowDate; 
                                    return(
                                        <div key={item3.data.created+item3.data.score+random3} className='post-replies'>
                                             {item3.kind==='t1' &&<p className='blue-grey-text'><em>{item3.data.author}</em>
                                            <span><em> | {(x3===1) ? `${x3} hour ago`:(a3===1) ? `1 day ago`:(a3>1) ? `${a3} days ago`: (x3===0)?`${minutes3} minutes ago`: `${x3} hours ago`}</em></span>
                                            </p>}
                                            <Markdown>{item3.data.body}</Markdown>
                                            {(item3.data.replies === undefined) ? '' : (typeof item3.data.replies !=='object') ? '' : <div>{item3.data.replies.data.children.map((item4)=>{
                                                                                                    let timeStamp4 = item4.data.created;
                                                                                                    let date4 = new Date(timeStamp4* 1000);
                                                                                                    let random4 = Math.floor(Math.random() * 10000);
                                                                                                    let hours4 = date4.getHours();
                                                                                                    let dayDate4 = date4.getDate();
                                                                                                    let dateMonth4 = date4.getMonth();
                                                                                                    let c4 = nowMonth - dateMonth4;
                                                                                                    let z4 = nowDate - dayDate4;
                                                                                                    let minutes4 = now.getMinutes() - date4.getMinutes();
                                                                                                    let x4;
                                                                                                    let a4;                
                                                                                                    z4 === 0 && c4 === 0 ? x4 = y - hours4 : (c4===0 && z4 === 1) || z4 === -30 ? x4 = (24-hours4) + y : a4 = (31-dayDate4)+nowDate; 
                                    return(
                                        <div key={item4.data.created+item4.data.score+random4} className='post-replies replies-post'>
                                           {item4.kind==='t1' && <p className='blue-grey-text'>
                                                <em>{item4.data.author}</em>
                                                <span><em> | {(x4===1) ? `${x4} hour ago`:(a4===1) ? `1 day ago`:(a4>1) ? `${a4} days ago`: (x4===0)?`${minutes4} minutes ago`: `${x4} hours ago`}</em></span>
                                                </p>}
                                            <Markdown>{item4.data.body}</Markdown>
                                            {(item4.data.replies === undefined) ? '' : (typeof item4.data.replies !=='object') ? '' : <div>{item4.data.replies.data.children.map((item5)=>{
                                                                                                                                                    let timeStamp5 = item5.data.created;
                                                                                                                                                    let random5 = Math.floor(Math.random() * 10000);
                                                                                                                                                    let date5 = new Date(timeStamp5* 1000);
                                                                                                                                                    let hours5 = date5.getHours();
                                                                                                                                                    let dayDate5 = date5.getDate();
                                                                                                                                                    let z5 = nowDate - dayDate5;
                                                                                                                                                    let dateMonth5 = date5.getMonth();
                                                                                                                                                    let c5 = nowMonth - dateMonth5;
                                                                                                                                                    let minutes5 = now.getMinutes() - date5.getMinutes();
                                                                                                                                                    let x5;
                                                                                                                                                    let a5;                
                                                                                                                                                    z5 === 0 && c5 === 0? x5 = y - hours5 : (c5===0 && z5 === 1) || z5 === -30 ? x5 = (24-hours5) + y : a5 = (31-dayDate5)+nowDate; 
                                    return(
                                        <div key={item5.data.created+item5.data.score+random5} className='post-replies post-post replies-post'>
                                            {item5.kind==='t1' && <p className='blue-grey-text'>
                                                <em>{item5.data.author}</em>
                                                <span><em> | {(x5===1) ? `${x5} hour ago`:(a5===1) ? `1 day ago`:(a5>1) ? `${a5} days ago`: (x5===0)?`${minutes5} minutes ago`: `${x5} hours ago`}</em></span>
                                                </p>}
                                            <Markdown>{item5.data.body}</Markdown>
                                            
                                            </div>
                                            
                                    )
                                })}</div>}
                                            </div>
                                            
                                    )
                                })}</div>}
                                            </div>
                                            
                                    )
                                })}</div>}
                                   </div>
                                   </div>
                           )
                       })}
                        </div>
                )
            })

}
</div>
    )
}