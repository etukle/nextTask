import { createSlice } from '@reduxjs/toolkit';
import { setData } from './siteSlice';

const initialState = {
    site: {
        searchBox: '',
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
        setSearchBox: (state, action) => {
            state.site.searchBox = action.payload;
        },
        setSearchTerm: (state, action) => {
            state.site.searchTerm = action.payload;
        }
    }
});

export const { setOffset, setSearchBox, setSearchTerm } = searchSlice.actions;

export default searchSlice.reducer;
