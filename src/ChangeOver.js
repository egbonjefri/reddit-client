

import Subreddit from './Subreddit'
import Homepage from './Homepage'
import Search from './Search'
import {useRoutes} from 'react-router-dom'
import {useSelector} from 'react-redux'
export default function ChangeOver() {
    let link = useSelector((state)=>state.counter.link);

    const element = useRoutes([
        {path: '', element: <Homepage />},
        {path:'/', element: <Homepage />},
        {path: link, element:<Subreddit />},
        {path: `/search/`, element:<Search />}
      ])
      return element
}