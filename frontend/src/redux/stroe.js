import { configureStore } from '@reduxjs/toolkit';
import siteReducer from './siteSlice';
import searchReducer from './searchSlice';

export const store = configureStore({
    reducer: {
        siteData: siteReducer,
        searchData: searchReducer
    }
});
