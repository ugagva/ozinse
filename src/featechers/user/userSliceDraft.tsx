import axios from "axios";

import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {BASE_URL} from "../../utils/constants.tsx";




//**** создание пользователя
export const createUser = createAsyncThunk(
    "users/createUser",
    async (payload, thunkAPI) => {
        try {
            const response = await axios.post(`${BASE_URL}/v1/users`, payload);
            return response.data;

        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error);
        }
    }
)


// ***** авторизация пользователя
export const loginUser = createAsyncThunk(
    "users/loginUser",
    async (payload, thunkAPI) => {
        try {
            const response = await axios.post(`${BASE_URL}/v1/auth/sign-in`, payload);

            const login =await axios.get(`${BASE_URL}/users/profile`, {
                    headers: {
                        Authorization: `Bearer ${response.data.access_token}`
                    }
                }
            )
            return login.data

        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error);
        }
    }
)
                            //***** изменение пользователя
export const updateUser = createAsyncThunk(
    "users/updateUser",
    async (payload, thunkAPI) => {
        try {
            const response = await axios.put(`${BASE_URL}/v1/users/{id}`, payload);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    })


// @ts-ignore
const addCurrentUser = (state: { currentUser:object; }, {payload}:ActionTypes) => { state.currentUser = payload}

const userSlice = createSlice ({
    name: "user",

    initialState:{
        currentUser:null,
        isLoading: false,
        formType: 'sighUp',
        showForm: false,
    },

    reducers: {
        toggleForm:(state, {payload})=> {
            state.showForm = payload
        },
        toggleFormSign:(state, {payload})=> {
            state.formType = payload
        },

    },


extraReducers: (builder ) => {
    builder.addCase(createUser.fulfilled, addCurrentUser)
    builder.addCase(loginUser.fulfilled, addCurrentUser)
    builder.addCase(updateUser.fulfilled, addCurrentUser)
}
})

export const {
    toggleForm,
    toggleFormSign,

} = userSlice.actions;

export default userSlice.reducer;