import {  createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  value: '',
  status: 'idle',
  posts: [],
  link: '',
  comments: [],
  fullname: '',
  title: [],
  replies: [],
  searchLink: '',
  searches: [],
  searchPage: '',
  blank: 'r/canada',
  icons: [],
  pictures: [],
  subbreddit_info: '',
  afterText: '',
  loading: true
};


export const asyncFunction = createAsyncThunk(
  'counter/fetchIcon',
  async (value) => {
    
    const response = await axios.get(`https://www.reddit.com/${value}/about.json`)
    return response.data
  }
)
export const iconGetter = createAsyncThunk(
  'counter/iconGetter',
  async(value) => {
    if(value!=='[deleted]'){
    const response = await axios.get(`https://www.reddit.com/user/${value}/about.json`)
    return response.data
  }
  else {
    return ''
  }
  }
)
export const firstReplyGetter = createAsyncThunk(
  'counter/firstReplyGetter',
  async(value) => {
    if(value!=='[deleted]'){

    const response = await axios.get(`https://www.reddit.com/user/${value}/about.json`)
    return response.data
    }
    else {
      return ''
    }
  }
)
export const secondReplyGetter = createAsyncThunk(
  'counter/secondReplyGetter',
  async(value) => {
    if(value!=='[deleted]'){

    const response = await axios.get(`https://www.reddit.com/user/${value}/about.json`)
    return response.data
  }
  else {
    return ''
  }
}
)
export const thirdReplyGetter = createAsyncThunk(
  'counter/thirdReplyGetter',
  async(value) => {
    if(value!=='[deleted]'){

    const response = await axios.get(`https://www.reddit.com/user/${value}/about.json`)
    return response.data
  }
  else {
    return ''
  }
}
)
export const fourthReplyGetter = createAsyncThunk(
  'counter/fourthReplyGetter',
  async(value) => {
    if(value!=='[deleted]'){

    const response = await axios.get(`https://www.reddit.com/user/${value}/about.json`)
    return response.data
  }
  else {
    return ''
  }
}
)
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    searchF: (state, action) => {
      state.searches = action.payload;
    },
    valueSetter: (state, action) => {
      state.value = action.payload
    },
    searchNav: (state, action) => {
      state.searchPage = action.payload
    },
    postAdder: (state, action) => {
     state.posts = action.payload;
        },
    subber: (state, action) => {
      state.blank = action.payload
    },
    searchAdder: (state, action) => {
      state.searchLink = action.payload
    },
    nameAdder: (state, action) => {
      state.fullname = action.payload;
    },
    linkAdder: (state, action) => {
      state.link += action.payload;
    },
    commentAdder: (state, action) => {
      try{
     state.comments = action.payload[1].data.children;
     state.title = action.payload[0].data.children;
      }
      catch (e){
        state.link = '';
      }
    },
    resetter: (state) => {
      state.link = '';
    },
    homepage: (state) => {
      
      state.searchPage = ''
      state.searchLink = ''
    },
    afterResetter: (state)=> {
      state.afterText = ''
    },
    afterSetter: (state, action)=> {
      state.afterText = action.payload
    }

  },
extraReducers: (builder) => {
  builder
  .addCase(asyncFunction.fulfilled, (state,action)=>{
    state.subbreddit_info = action.payload
    if (state.searchLink === ''){
      // eslint-disable-next-line
    state.posts.map((item)=> {
      if(action.payload.data.icon_size !== null){
      item.data['icon_img'] = action.payload.data.icon_img
      }
    })}
    else {
      // eslint-disable-next-line
     state.searches.map((item)=> {
       if(action.payload.data.icon_size !==null) {
         if (action.payload.data.display_name_prefixed === item.data.subreddit_name_prefixed){
          item.data['icon_img'] = action.payload.data.icon_img
         }
       }
     })
      
    }
  })
.addCase(iconGetter.fulfilled, (state,action)=>{
    // eslint-disable-next-line
  state.comments.map((item)=> {
    if(typeof action.payload.data==='object'){
      if(action.payload.data.snoovatar_size !== null && item.data.author === action.payload.data.name){
    item.data['snoovatar_img'] = action.payload.data.snoovatar_img
    }
  }
  })
  state.loading = false
})
.addCase(firstReplyGetter.fulfilled, (state,action)=>{
  // eslint-disable-next-line
  state.comments.map((item)=> {
    if(item.data.replies !== undefined && typeof item.data.replies === 'object'){
        // eslint-disable-next-line
      item.data.replies.data.children.map((item2)=>{
        if(typeof action.payload.data==='object'){
          if(action.payload.data.snoovatar_size !== null && item2.data.author === action.payload.data.name){
        item2.data['snoovatar_img'] = action.payload.data.snoovatar_img
        }
      }
      })
    }
    
  })
})
.addCase(secondReplyGetter.fulfilled, (state,action)=>{
    // eslint-disable-next-line
  state.comments.map((item)=> {
    if(item.data.replies !== undefined && typeof item.data.replies === 'object'){
        // eslint-disable-next-line
      item.data.replies.data.children.map((item2)=>{
        if(item2.data.replies !== undefined && typeof item2.data.replies === 'object'){
           // eslint-disable-next-line 
          item2.data.replies.data.children.map((item3)=>{
            if(typeof action.payload.data==='object'){
              if(action.payload.data.snoovatar_size !== null && item3.data.author === action.payload.data.name){
            item3.data['snoovatar_img'] = action.payload.data.snoovatar_img
            }
          }
          })
        }
})
    }
  })
})
.addCase(thirdReplyGetter.fulfilled, (state,action)=>{
    // eslint-disable-next-line
  state.comments.map((item)=> {
    if(item.data.replies !== undefined && typeof item.data.replies === 'object'){
        // eslint-disable-next-line
      item.data.replies.data.children.map((item2)=>{
          // eslint-disable-next-line
        if(item2.data.replies !== undefined && typeof item2.data.replies === 'object'){
            // eslint-disable-next-line
          item2.data.replies.data.children.map((item3)=>{
            if(item3.data.replies !== undefined && typeof item3.data.replies === 'object'){
              // eslint-disable-next-line
              item3.data.replies.data.children.map((item4)=>{
                if(typeof action.payload.data==='object'){
                  if(action.payload.data.snoovatar_size !== null && item4.data.author === action.payload.data.name){
                item4.data['snoovatar_img'] = action.payload.data.snoovatar_img
                }
              }
              })
            }
          })
        }
})
    }
  })
})
.addCase(fourthReplyGetter.fulfilled, (state,action)=>{
    // eslint-disable-next-line
  state.comments.map((item)=> {
    if(item.data.replies !== undefined && typeof item.data.replies === 'object'){
        // eslint-disable-next-line
      item.data.replies.data.children.map((item2)=>{
        if(item2.data.replies !== undefined && typeof item2.data.replies === 'object'){
           // eslint-disable-next-line
          item2.data.replies.data.children.map((item3)=>{
            if(item3.data.replies !== undefined && typeof item3.data.replies === 'object'){
               // eslint-disable-next-line
              item3.data.replies.data.children.map((item4)=>{
                if(item4.data.replies !== undefined && typeof item4.data.replies === 'object'){
                   // eslint-disable-next-line
                  item4.data.replies.data.children.map((item5)=>{
                    if(typeof action.payload.data==='object'){
                      if(action.payload.data.snoovatar_size !== null && item5.data.author === action.payload.data.name){
                    item5.data['snoovatar_img'] = action.payload.data.snoovatar_img
                    }
                  }
                  })
                }
              })
            }
          })
        }
})
    }
  })
 
})
.addCase(iconGetter.pending, (state)=>{
  state.loading = true;
})
}

});

export const { afterResetter, afterSetter,resetter, valueSetter, homepage, subber, searchNav, searchF, searchAdder, nameAdder, linkAdder, commentAdder,postAdder } = counterSlice.actions;

export const selectCount = (state) => state.counter.value;


export default counterSlice.reducer;
