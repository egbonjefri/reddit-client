import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {commentAdder} from './features/counter/counterSlice';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import { htmlDecode } from './Homepage';
export default function Subreddit() {
  let regex = /^https/
    const comments = useSelector((state)=>state.counter.comments);
    const name = useSelector((state)=>state.counter.fullname);
    const searchPage = useSelector((state)=>state.counter.searchPage)
    const title = useSelector((state)=>state.counter.title);
    const value = useSelector((state)=>state.counter.value);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

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
                (z === 0 && c === 0) ? x = y - hours : (c===0 && z === 1) || z === -30 ? x = (24-hours) + y : (c===0) ? a = nowDate-dayDate : a = (31-dayDate)+nowDate; 
                return (
                    <div className='back' key={item.data.created+item.data.score+item.data.author.length+random}>
                        <div className='center post-title'>
                        <p>Posted by <b>{item.data.author}</b>
                        <span> |</span>
                        <span> {(x===1) ? `${x} hour ago`:(a===1) ? `1 day ago`:(a>1) ? `${a} days ago`: (x===0&&minutes===1) ? '1 minute ago' : (x===0)?`${minutes} minutes ago`: `${x} hours ago`}</span>
                        </p>
                        <h5>{item.data.title}</h5>
                        <a target='_blank' rel="noreferrer" href={item.data.url} className='link'>{item.data.url}</a>
                        { (item.data.media !== null && item.data.media.hasOwnProperty('reddit_video')) ? <video className='mobile-only' controls autoPlay>{<source src={`${item.data.secure_media.reddit_video.fallback_url}autoplay=1&muted=1`} />}</video> 
            :
            (typeof item.data.preview ==='object' && item.data.preview.hasOwnProperty('reddit_video_preview')) ? <video className='mobile-only' autoPlay controls>{<source src={`${item.data.preview.reddit_video_preview.fallback_url}`} type='video/mp4' />}</video>
            :
            (typeof item.data.preview ==='object') ? <img className='mobile-only' src={htmlDecode(item.data.preview.images[0].source.url)} alt={item.data.title} />
                  :
            (regex.test(item.data.thumbnail)) && <img className='mobile-only' alt={item.data.title} src={item.data.thumbnail} />
     } 
           {item.data.hasOwnProperty('selftext') && <div className='selftext'><span><ReactMarkdown rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm]} children={htmlDecode(item.data.selftext)}></ReactMarkdown></span></div>}
                        </div>
                       {comments.map((item2)=>{
                let timeStamp2 = item2.data.created;
                let random2 = Math.floor(Math.random() * 100000);
                let date2 = new Date(timeStamp2* 1000);
                let hours2 = date2.getHours();
                let dayDate2 = date2.getDate();
                let dateMonth2 = date2.getMonth();
                let c2 = nowMonth - dateMonth2;
                let z2 = nowDate - dayDate2;
                let minutes2 = now.getMinutes() - date2.getMinutes();
                let x2;
                let a2; 
                (z2 === 0 && c2 === 0) ? x2 = y - hours2 : (c2===0 && z2 === 1) || z2 === -30 ? x2 = (24-hours2) + y : (c2===0) ? a2 = nowDate-dayDate2 : a2 = (31-dayDate2)+nowDate; 
                           return (
                               <div key={random2}>
                                   <div className='post-comment'>
                                   {item2.kind==='t1' &&<p className='blue-grey-text'><em>{item2.data.author}</em>
                                    <span><em> | {(x2===1) ? `${x2} hour ago`:(a2===1) ? `1 day ago`:(a2>1) ? `${a2} days ago`: (x2===0&&minutes2===1) ? '1 minute ago' : (x2===0)?`${minutes2} minutes ago`: `${x2} hours ago`}</em></span>
                                    </p>}
                                    {item2.data.hasOwnProperty('media_metadata') ? <img className='thumb' alt={item2.data.media_metadata[Object.keys(item2.data.media_metadata)[0]].e} src={item2.data.media_metadata[Object.keys(item2.data.media_metadata)[0]].p[0].u} />: <ReactMarkdown rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm]} children={htmlDecode(item2.data.body)}></ReactMarkdown>}

         
                                {(item2.data.replies === undefined) ? '' : (typeof item2.data.replies !=='object') ? '' : <div>{item2.data.replies.data.children.map((item3)=>{
                                                    let timeStamp3 = item3.data.created;
                                                    let random3 = Math.floor(Math.random() * 100000);
                                                    let date3 = new Date(timeStamp3* 1000);
                                                    let hours3 = date3.getHours();
                                                    let dayDate3 = date3.getDate();
                                                    let dateMonth3 = date3.getMonth();
                                                    let c3 = nowMonth - dateMonth3;
                                                    let z3 = nowDate - dayDate3;
                                                    let minutes3 = now.getMinutes() - date3.getMinutes();
                                                    let x3;
                                                    let a3;
                                                    (z3 === 0 && c3 === 0) ? x3 = y - hours3 : (c3===0 && z3 === 1) || z3 === -30 ? x3 = (24-hours3) + y : (c3===0) ? a3 = nowDate-dayDate3 : a3 = (31-dayDate3)+nowDate; 
                                                    return(
                                        <div key={random3} className='post-replies'>
                                             {item3.kind==='t1' &&<p className='blue-grey-text'><em>{item3.data.author}</em>
                                            <span><em> | {(x3===1) ? `${x3} hour ago`:(a3===1) ? `1 day ago`:(a3>1) ? `${a3} days ago`: (x3===0&&minutes3===1) ? '1 minute ago' : (x3===0)?`${minutes3} minutes ago`: `${x3} hours ago`}</em></span>
                                            </p>}
                                            {item3.data.hasOwnProperty('media_metadata') ? <img className='thumb' alt={item3.data.media_metadata[Object.keys(item3.data.media_metadata)[0]].e} src={item3.data.media_metadata[Object.keys(item3.data.media_metadata)[0]].p[0].u} />: <ReactMarkdown rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm]} children={htmlDecode(item3.data.body)}></ReactMarkdown>}

                                            {(item3.data.replies === undefined) ? '' : (typeof item3.data.replies !=='object') ? '' : <div>{item3.data.replies.data.children.map((item4)=>{
                                                                                                    let timeStamp4 = item4.data.created;
                                                                                                    let date4 = new Date(timeStamp4* 1000);
                                                                                                    let random4 = Math.floor(Math.random() * 100000);
                                                                                                    let hours4 = date4.getHours();
                                                                                                    let dayDate4 = date4.getDate();
                                                                                                    let dateMonth4 = date4.getMonth();
                                                                                                    let c4 = nowMonth - dateMonth4;
                                                                                                    let z4 = nowDate - dayDate4;
                                                                                                    let minutes4 = now.getMinutes() - date4.getMinutes();
                                                                                                    let x4;
                                                                                                    let a4;                
                                                                                                    (z4 === 0 && c4 === 0) ? x4 = y - hours4 : (c4===0 && z4 === 1) || z4 === -30 ? x4 = (24-hours4) + y : (c4===0) ? a4 = nowDate-dayDate4 : a4 = (31-dayDate4)+nowDate; 
                                                                                                    return(
                                        <div key={random4} className='post-replies replies-post'>
                                           {item4.kind==='t1' && <p className='blue-grey-text'>
                                                <em>{item4.data.author}</em>
                                                <span><em> | {(x4===1) ? `${x4} hour ago`:(a4===1) ? `1 day ago`:(a4>1) ? `${a4} days ago`: (x4===0&&minutes4===1) ? '1 minute ago' :  (x4===0)?`${minutes4} minutes ago`: `${x4} hours ago`}</em></span>
                                                </p>}
                                            {item4.data.hasOwnProperty('media_metadata') ? <img className='thumb' alt={item4.data.media_metadata[Object.keys(item4.data.media_metadata)[0]].e} src={item4.data.media_metadata[Object.keys(item4.data.media_metadata)[0]].p[0].u} />: <ReactMarkdown rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm]} children={htmlDecode(item4.data.body)}></ReactMarkdown>}
                                            {(item4.data.replies === undefined) ? '' : (typeof item4.data.replies !=='object') ? '' : <div>{item4.data.replies.data.children.map((item5)=>{
                                                                                                                                                    let timeStamp5 = item5.data.created;
                                                                                                                                                    let random5 = Math.floor(Math.random() * 100000);
                                                                                                                                                    let date5 = new Date(timeStamp5* 1000);
                                                                                                                                                    let hours5 = date5.getHours();
                                                                                                                                                    let dayDate5 = date5.getDate();
                                                                                                                                                    let z5 = nowDate - dayDate5;
                                                                                                                                                    let dateMonth5 = date5.getMonth();
                                                                                                                                                    let c5 = nowMonth - dateMonth5;
                                                                                                                                                    let minutes5 = now.getMinutes() - date5.getMinutes();
                                                                                                                                                    let x5;
                                                                                                                                                    let a5;                
                                                                                                                                                    (z5 === 0 && c5 === 0) ? x5 = y - hours5 : (c5===0 && z5 === 1) || z5 === -30 ? x5 = (24-hours5) + y : (c5===0) ? a5 = nowDate-dayDate5 : a5 = (31-dayDate5)+nowDate;                                                                                                                                                     return(
                                        <div key={random5} className='post-post'>
                                            {item5.kind==='t1' && <p className='blue-grey-text'>
                                                <em>{item5.data.author}</em>
                                                <span><em> | {(x5===1) ? `${x5} hour ago`:(a5===1) ? `1 day ago`:(a5>1) ? `${a5} days ago`: (x5===0&&minutes5===1) ? '1 minute ago' :  (x5===0)?`${minutes5} minutes ago`: `${x5} hours ago`}</em></span>
                                                </p>}
                                                {item5.data.hasOwnProperty('media_metadata') ? <img className='thumb' alt={item5.data.media_metadata[Object.keys(item5.data.media_metadata)[0]].e} src={item5.data.media_metadata[Object.keys(item5.data.media_metadata)[0]].p[0].u} />: <ReactMarkdown rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm]} children={htmlDecode(item5.data.body)}></ReactMarkdown>}
                                                {(item5.data.replies === undefined) ? '' : (typeof item5.data.replies !=='object') ? '' : <div>{item5.data.replies.data.children.map((item6)=>{
                                                                                                                                                    let timeStamp6 = item6.data.created;
                                                                                                                                                    let random6 = Math.floor(Math.random() * 100000);
                                                                                                                                                    let date6 = new Date(timeStamp6* 1000);
                                                                                                                                                    let hours6 = date6.getHours();
                                                                                                                                                    let dayDate6 = date6.getDate();
                                                                                                                                                    let z6 = nowDate - dayDate6;
                                                                                                                                                    let dateMonth6 = date6.getMonth();
                                                                                                                                                    let c6 = nowMonth - dateMonth6;
                                                                                                                                                    let minutes6 = now.getMinutes() - date6.getMinutes();
                                                                                                                                                    let x6;
                                                                                                                                                    let a6;                
                                                                                                                                                    (z6 === 0 && c6 === 0) ? x6 = y - hours6 : (c6===0 && z6 === 1) || z6 === -30 ? x6 = (24-hours6) + y : (c6===0) ? a6 = nowDate-dayDate6 : a6 = (31-dayDate6)+nowDate;                                                                                                                                                     return(
                                        <div key={random6} className='post-post'>
                                            {item6.kind==='t1' && <p className='blue-grey-text'>
                                                <em>{item6.data.author}</em>
                                                <span><em> | {(x6===1) ? `${x6} hour ago`:(a6===1) ? `1 day ago`:(a6>1) ? `${a6} days ago`: (x6===0&&minutes6===1) ? '1 minute ago' :  (x6===0)?`${minutes6} minutes ago`: `${x6} hours ago`}</em></span>
                                                </p>}
                                                {item6.data.hasOwnProperty('media_metadata') ? <img className='thumb' alt={item6.data.media_metadata[Object.keys(item6.data.media_metadata)[0]].e} src={item6.data.media_metadata[Object.keys(item6.data.media_metadata)[0]].p[0].u} />: <ReactMarkdown rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm]} children={htmlDecode(item6.data.body)}></ReactMarkdown>}
                                            
                                            </div>
                                            
                                    )
                                })}</div>}
                                            </div>
                                            
                                    )
                                })}</div>}
                                            </div>
                                            
                                    )
                                })}</div>}
                                  {typeof item3.data.replies ==='object' && <button onClick={(event)=>{
                                              const replyArray = document.querySelectorAll('.reply-button')
                                              replyArray.forEach((newItem)=>{
                                                if(event.target.parentNode === newItem){
                                                  newItem.style.display = 'none';
                                                  let list = newItem.parentNode.children;
                                                  
                                                  for (let newItem2 of list) {
                                                    let list2 = newItem2.children;
                                                    for(let newItem3 of list2) {
                                                      newItem3.style.display = 'block'
                                                    }
                                                  }
                                                 
                                                  
                                                }
                                              })
                                              
                                             
                                            }} className='reply-button mobile-only'>{item3.data.replies.data.children.length === 1 ? <span>Show 1 More Reply</span> : <span>Show {item3.data.replies.data.children.length} More Replies</span>}</button>}
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