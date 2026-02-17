import { configureStore } from "@reduxjs/toolkit";

import productsReducer from './slices/productsSlice';
import messageReducer from './slices/messageSlice';
import adminProductsReducer from './slices/adminProductsSlice';

export const store = configureStore({
    reducer: {
        products: productsReducer,
        message: messageReducer,
        adminProducts: adminProductsReducer,
    }
});


