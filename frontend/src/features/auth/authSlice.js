import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user?user:null,
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: ""
}

export const signUp = createAsyncThunk('auth/signup',async(user,thunkAPI)=>{
    try{
        return await authService.signUp(user);
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const signIn = createAsyncThunk('auth/signin',async(user,thunkAPI)=>{
    try{
        return await authService.signIn(user);
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const logout = createAsyncThunk('auth/logout', async()=>{
    await authService.logout();
})

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        reset:(state)=>{
            state.user = null
            state.isError = false
            state.isLoading = false
            state.isSuccess = false
            state.message = ""
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(signUp.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message = action.payload
            state.user = null
        })
        .addCase(signUp.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.user = action.payload
        })
        .addCase(signUp.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(signIn.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(signIn.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(signIn.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message = action.payload
            state.user = null
        })
        .addCase(logout.fulfilled,(state)=>{
            state.user = null
        })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer;