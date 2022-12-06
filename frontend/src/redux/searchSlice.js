import { createSlice } from '@reduxjs/toolkit';
import { setData } from './siteSlice';

const initialState = {
    site: {
        searchTerm: '',
        offset: 0
    }
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setOffset: (state, action) => {
            state.site.offset = action.payload;
        },
        setSearchTerm: (state, action) => {
            state.site.searchTerm = action.payload;
        }
    }
});

export const { setOffset, setSearchTerm } = searchSlice.actions;

export default searchSlice.reducer;
