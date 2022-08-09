import {  createSlice } from '@reduxjs/toolkit';

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
  blank: '',
  
};


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
        console.log(e)
      }
      },
    resetter: (state) => {
      state.link = '';
    },
    homepage: (state) => {
      state.value = ''
      state.searchPage = ''
    }

  },

});

export const { resetter, valueSetter, homepage, subber, searchNav, searchF, searchAdder, nameAdder, linkAdder, commentAdder,postAdder } = counterSlice.actions;

export const selectCount = (state) => state.counter.value;


export default counterSlice.reducer;
