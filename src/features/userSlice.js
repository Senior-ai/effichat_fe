import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const AUTH_ENDPOINT=`${process.env.REACT_APP_API_ENDPOINT}/auth`
const initialState = {
    status: '',
    error: '',
    user: {
        id: "",
        name: "",
        email: "",
        picture: "",
        status: "",
        token: ""
    }
};

export const registerUser = createAsyncThunk('auth/register', async(values, {reject}) => {
    try {
    const {data} = await axios.post(`${AUTH_ENDPOINT}/register`, {...values});
    return data;
  } catch (error) {
    return reject(error.response.data.error.message);
  }
});

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.status = 'logout';
            state.error = '';
            state.user = {
                id: "",
                name: "",
                email: "",
                picture: "",
                status: "",
                token: ""
            };
        }
    },
    extraReducers(builder) {
        builder.addCase(registerUser.pending,(state, action) => {
            state.status='loading';
        })
        .addCase(registerUser.fulfilled,(state, action) => {
            state.status='succeeded';
            state.user=
         })
    }
})

export const {logout}=userSlice.actions;

export default userSlice.reducer;