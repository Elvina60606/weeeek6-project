import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const { VITE_URL, VITE_PATH } = import.meta.env;

export const adminProductsSlice = createSlice({
    name: 'adminProducts',
    initialState: {
        adminProducts: [],
    },
    reducers: {
        setAdminProducts( state, actions ){
            state.adminProducts = actions.payload
        }
    }
});

export const getAdminAsyncProducts = createAsyncThunk(
    'adminProducts/getAdminAsyncProducts',
    async( data, paramas ) => {
        try {
            const res = await axios.get(`${VITE_URL}/api/${VITE_PATH}/admin/products`)
            paramas.dispatch(setAdminProducts(res.data.products))
        } catch (error) {
            console.log('getAdminAsyncProducts:',error)
        }
    }
)

export const { setAdminProducts } = adminProductsSlice.actions;

export default adminProductsSlice.reducer;
