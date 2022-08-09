

import Subreddit from './Subreddit'
import Homepage from './Homepage'
import Search from './Search'
import {useRoutes} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {useEffect} from 'react'
export default function ChangeOver() {
    let link = useSelector((state)=>state.counter.link);

    useEffect(() => {
      window.localStorage.setItem('linker', link);
    }, [link]);
    
    const element = useRoutes([
        {path: '', element: <Homepage />},
        {path:'/', element: <Homepage />},
        {path: link, element: <Subreddit />},
        {path: window.localStorage.getItem('linker'), element:<Subreddit />},
        {path: `/search/`, element:<Search />}
      ])
      return element
}