import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: false,
    error: false,
    success: false,
    skills: [],
    errorMessage: undefined,
}

export const skills = createAsyncThunk(
    "skills", async (data) => {
        try {
            const response = await axios.get("https://dummyjson.com/products");
            
            if (response.status >= 200 && response.status < 300) {
                // data?.users?.map((item, index) => {
                //     if(item.id === data.id) {
                //         data?.users[index].skill = data.skill
                //     }
                // })
                return response.data = data;
            }
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    });

const skillsSlice = createSlice({
    name: 'skillsAdded',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(skills.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = false;
        });
        builder.addCase(skills.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.skills = action.payload;
        });
        builder.addCase(skills.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.error = true;
            state.errorMessage = action.error.message;
        });
    },
    reducers: {
        clearSkillsSlice: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
            return state;
        },
    }
});
export default skillsSlice.reducer;
export const { clearSkillsSlice } = skillsSlice.actions;