
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk("api/fetchData", async () => {
    const response = await axios.get("http://localhost:5000/users")
    return response.data
})

export const addData = createAsyncThunk("api/addData", async (newData) => {
    const response = await axios.post("http://localhost:5000/users", newData)
    return response.data
})

export const deleteData = createAsyncThunk("api/deleteData", async (id) => {
    const response = await axios.delete(`http://localhost:5000/users/${id}`)
    return id
})

export const updateData = createAsyncThunk("api/updateData", async ({ editIndex, formdata }) => {
    const response = await axios.put(`http://localhost:5000/users/${editIndex}`, formdata)
    return response.data
})

export const api = createSlice({
    name: "api",
    initialState: { record: [], loading: false },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.fulfilled, (state, action) => {
                state.record = action.payload
            })
            .addCase(addData.fulfilled, (state, action) => {
                state.record.push(action.payload)
            })
            .addCase(deleteData.fulfilled, (state, action) => {
                state.record = state.record.filter(item => item.id !== action.payload)
            })
            .addCase(updateData.fulfilled, (state, action) => {
                let data = state.record.find((item) => item.id === action.payload.id);
                if (data) {
                    data.name = action.payload.name;
                    data.age = action.payload.age;
                    data.city = action.payload.city;
                    data.subject = action.payload.subject;
                    data.gender = action.payload.gender;
                }
            })
    }
})

export default api.reducer;
