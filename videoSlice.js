import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  favList: [],
  watchLaterList: [],
  videoList: [],
}

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    addToFavList: (state, action) => {
      state.favList.push(action.payload);
    },
    removeFromFavList: (state, action)=>{
      return {...state, favList: favList.filter(favItem => favItem.id !== action.payload.id)}
    },
    addToWatchList: (state, action) => {
      state.watchLaterList.push(action.payload);
    },
    removeFromWatchList: (state,action)=>{
      return {...state, watchLaterList: watchLaterList.filter(watchLaterListItem => watchLaterListItem.id !== action.payload.id)}
    },
    addToVideoList: (state, action) => {
      state.videoList.push(...action.payload);
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToFavList, removeFromFavList, addToWatchList, removeFromWatchList, addToVideoList} = videoSlice.actions

export default videoSlice.reducer