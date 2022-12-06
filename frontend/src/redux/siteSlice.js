import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '../helpers/network';
import { useSelector } from 'react-redux';

const initialState = {
    site: {
        status: 'idle', // idle, loading, success, failed
        data: [],
        error: null
    }
};

export const fetchResults = createAsyncThunk('site/fetchResults', async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const term = state.searchData.site.searchTerm;
    const offset = state.searchData.site.offset;

    const response = await fetchData(term, offset);
    return response;
});

export const siteSlice = createSlice({
    name: 'site',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.site.data = action.payload;
        }
    },
    extraReducers: {
        [fetchResults.pending]: (state, action) => {
            state.site.status = 'loading';
        },
        [fetchResults.fulfilled]: (state, action) => {
            state.site.status = 'success';
            let tempArr = [...state.site.data];
            tempArr.push(...action.payload);
            state.site.data = tempArr;
        },
        [fetchResults.rejected]: (state, action) => {
            state.site.status = 'failed';
            state.site.error = action.error.message;
        }
    }
});

export const { setData } = siteSlice.actions;

export default siteSlice.reducer;
