import { configureStore } from '@reduxjs/toolkit'
import basketReducer from './features/basketSlice'
import resturantReducer from './features/resturantSlice'

const store = configureStore({
  reducer: {
    basket:basketReducer,
    resturant:resturantReducer,
  },
})

export default store