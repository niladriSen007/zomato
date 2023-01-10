import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items:[],
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state,action) => {
      state.items = [...state.items,action.payload]
    },
    removeFromBasket: (state,action) => {
      const index = state.items.findIndex(item=>item.id === action.payload.id)
      let newBasket = [...state.items];
      if(index>=0)
      {
        newBasket.splice(index,1);
      }
      else
      {
        console.warn(`${action.payload.id} doesn't exist in your basket` )
      }
      state.items = newBasket;
    },
 
  },
})

export const selectBasketWithId = (state,id) => state.basket.items.filter(item=>item.id === id) 


export const totalPrice = state => state.basket.items?.reduce((acc,val)=>acc+=val.price,0)

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket } = basketSlice.actions


export default basketSlice.reducer