import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import ReactLoading from 'react-loading'
import {commentAdder} from './features/counter/counterSlice';

const Loading = ({ type, color }) => (
    <ReactLoading type={'cylon'} color={'black'} />
  );



export default function Subreddit() {
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
        setLoading(false);
        loadPost();
      }, 5000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

    return (
        <div>
        {loading ? (
            <div className='loading'>
            <Loading />
            </div>) :
            title.map((item)=> {
                let unix_timeStamp = item.data.created;
                let date = new Date(unix_timeStamp * 1000);
                let now = new Date();
                let hours = date.getHours();
                let y = now.getHours();
                let dayDate = date.getDate();
                let nowDate = now.getDate();
                let z = nowDate - dayDate;
                let minutes = date.getMinutes();
                let x;
                let a;                
                z === 0 ? x = y - hours : z === 1 || z === -30 ? x = (24-hours) + y : a = (31-dayDate)+nowDate; 
                return (
                    <div className='back' key={item.data.created+item.data.score+item.data.author.length}>
                        <div className='center post-title'>
                        <p>Posted by <b>{item.data.author}</b>
                        <span> |</span>
                        <span> {(x===1) ? `${x} hour ago`:(a===1) ? `1 day ago`:(a>1) ? `${a} days ago`: (x===0)?`${minutes} minutes ago`: `${x} hours ago`}</span>
                        </p>
                        <h4>{item.data.title}</h4>
                        <a target='_blank' rel="noreferrer" href={item.data.url} className='link'>{item.data.url}</a>
                        </div>
                       {comments.map((item2)=>{
                let timeStamp2 = item2.data.created;
                let date2 = new Date(timeStamp2* 1000);
                let hours2 = date2.getHours();
                let dayDate2 = date2.getDate();
                let z2 = nowDate - dayDate2;
                let minutes2 = date2.getMinutes();
                let x2;
                let a2;                
                z2 === 0 ? x2 = y - hours2 : z2 === 1 || z2 === -30 ? x2 = (24-hours2) + y : a2 = (31-dayDate2)+nowDate; 
                           return (
                               <div key={item2.data.created+item2.data.score}>
                                   <div className='post-comment'>
                                   {item2.kind==='t1' &&<p className='blue-grey-text'><em>{item2.data.author}</em>
                                    <span><em> | {(x2===1) ? `${x2} hour ago`:(a2===1) ? `1 day ago`:(a2>1) ? `${a2} days ago`: (x2===0)?`${minutes2} minutes ago`: `${x2} hours ago`}</em></span>
                                    </p>}
                                   <p>{item2.data.body}</p>
         
                                {(item2.data.replies === undefined) ? '' : (typeof item2.data.replies !=='object') ? '' : <div>{item2.data.replies.data.children.map((item3)=>{
                                                    let timeStamp3 = item3.data.created;
                                                    let date3 = new Date(timeStamp3* 1000);
                                                    let hours3 = date3.getHours();
                                                    let dayDate3 = date3.getDate();
                                                    let z3 = nowDate - dayDate3;
                                                    let minutes3 = date3.getMinutes();
                                                    let x3;
                                                    let a3;                
                                                    z3 === 0 ? x3 = y - hours3 : z3 === 1 || z3 === -30 ? x3 = (24-hours3) + y : a3 = (31-dayDate3)+nowDate; 
                                    return(
                                        <div key={item3.data.created+item3.data.score} className='post-replies'>
                                             {item3.kind==='t1' &&<p className='blue-grey-text'><em>{item3.data.author}</em>
                                            <span><em> | {(x3===1) ? `${x3} hour ago`:(a3===1) ? `1 day ago`:(a3>1) ? `${a3} days ago`: (x3===0)?`${minutes3} minutes ago`: `${x3} hours ago`}</em></span>
                                            </p>}
                                            {item3.data.body}
                                            {(item3.data.replies === undefined) ? '' : (typeof item3.data.replies !=='object') ? '' : <div>{item3.data.replies.data.children.map((item4)=>{
                                                                                                    let timeStamp4 = item4.data.created;
                                                                                                    let date4 = new Date(timeStamp4* 1000);
                                                                                                    let hours4 = date4.getHours();
                                                                                                    let dayDate4 = date4.getDate();
                                                                                                    let z4 = nowDate - dayDate4;
                                                                                                    let minutes4 = date4.getMinutes();
                                                                                                    let x4;
                                                                                                    let a4;                
                                                                                                    z4 === 0 ? x4 = y - hours4 : z4 === 1 || z4 === -30 ? x4 = (24-hours4) + y : a4 = (31-dayDate4)+nowDate; 
                                    return(
                                        <div key={item4.data.created+item4.data.score} className='post-replies replies-post'>
                                           {item4.kind==='t1' && <p className='blue-grey-text'>
                                                <em>{item4.data.author}</em>
                                                <span><em> | {(x4===1) ? `${x4} hour ago`:(a4===1) ? `1 day ago`:(a4>1) ? `${a4} days ago`: (x4===0)?`${minutes4} minutes ago`: `${x4} hours ago`}</em></span>
                                                </p>}
                                            {item4.data.body}
                                            {(item4.data.replies === undefined) ? '' : (typeof item4.data.replies !=='object') ? '' : <div>{item4.data.replies.data.children.map((item5)=>{
                                                                                                                                                    let timeStamp5 = item5.data.created;
                                                                                                                                                    let date5 = new Date(timeStamp5* 1000);
                                                                                                                                                    let hours5 = date5.getHours();
                                                                                                                                                    let dayDate5 = date5.getDate();
                                                                                                                                                    let z5 = nowDate - dayDate5;
                                                                                                                                                    let minutes5 = date5.getMinutes();
                                                                                                                                                    let x5;
                                                                                                                                                    let a5;                
                                                                                                                                                    z5 === 0 ? x5 = y - hours5 : z5 === 1 || z5 === -30 ? x5 = (24-hours5) + y : a5 = (31-dayDate5)+nowDate; 
                                    return(
                                        <div key={item5.data.created+item5.data.score} className='post-replies post-post replies-post'>
                                            {item5.kind==='t1' && <p className='blue-grey-text'>
                                                <em>{item5.data.author}</em>
                                                <span><em> | {(x5===1) ? `${x5} hour ago`:(a5===1) ? `1 day ago`:(a5>1) ? `${a5} days ago`: (x5===0)?`${minutes5} minutes ago`: `${x5} hours ago`}</em></span>
                                                </p>}
                                            {item5.data.body}
                                            
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