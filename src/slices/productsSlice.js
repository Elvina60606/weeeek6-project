import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const { VITE_URL, VITE_PATH } = import.meta.env;

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: []
    },
    reducers: {
        setProducts( state, actions){
            state.products = actions.payload
        },
    }   
});

export const getAsyncProducts = createAsyncThunk(
    'products/getAsyncProducts',
    async( data, paramas )=> {
        try {
            const response = await axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/products/all`)
            paramas.dispatch(setProducts(response.data.products))
        } catch (error) {
            console.log('getAsyncProducts:',error)
        }
    }
)


export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;