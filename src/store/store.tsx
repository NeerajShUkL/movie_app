import { configureStore } from '@reduxjs/toolkit'
import MovieReducer from '../pages/movieSlice'

export * from '../pages/movieSlice';


export const store = configureStore({
  reducer: {
    movies: MovieReducer,
    
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch