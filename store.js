import { configureStore } from '@reduxjs/toolkit'
import videoReducer from './videoSlice'

export default configureStore({
  reducer: {
    video: videoReducer,
  },
})