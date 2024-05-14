import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import logo from '../../logo.svg';

const initialState = {
    loading: false,
    error: false,
    success: false,
    applicantsList: [],
    errorMessage: undefined,
}

const avatars = [
    {
        id:1,
        imgSrc: logo,
        skills:""
    },
    {
        id:2,
        imgSrc: logo,
        skills:""
    },
    {
        id:3,
        imgSrc: logo,
        skills:""
    },
]

export const getApplicants = createAsyncThunk(
    "getApplicants", async () => {
        try {
            const response = await axios.get("https://dummyjson.com/carts");
        
            if (response.status >= 200 && response.status < 300) {
                return response.data = avatars;
            }
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    });

const applicantsSlice = createSlice({
    name: 'applicantsList',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getApplicants.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = false;
        });
        builder.addCase(getApplicants.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.applicants = action.payload;
        });
        builder.addCase(getApplicants.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.error = true;
            state.errorMessage = action.error.message;
        });
    },
    reducers: {
        clearApplicantsSlice: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
            return state;
        },
    }
});
export default applicantsSlice.reducer;
export const { clearApplicantsSlice } = applicantsSlice.actions;