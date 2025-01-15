import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import bookService from './bookService';

const initialState ={
    orders:[],
    isSuccess: false,
    isError:false,
    isLoading:false,
    message:''
}

export const createBook = createAsyncThunk('book/createBook',async(book,thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.token;
        return await bookService.createBook(book,token)
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const getBook = createAsyncThunk('book/getBooks',async(_,thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.token;
        return await bookService.getBooks(token)
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const deleteBook = createAsyncThunk('book/deleteBook',async(bookId,thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.token;
        return await bookService.deleteBook(bookId,token)
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})


export const bookSlice = createSlice({
    name:'book',
    initialState,
    reducers:{
        reset:(state)=>initialState
    },

    extraReducers:(builder)=>{
        builder
        .addCase(createBook.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(createBook.fulfilled, (state,action)=>{
            state.isSuccess = true
            state.isLoading = false
            state.orders.push(action.payload)
        })
        .addCase(createBook.rejected,(state,action)=>{
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.payload
        })

        .addCase(getBook.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getBook.fulfilled, (state,action)=>{
            state.isSuccess = true
            state.isLoading = false
            state.orders = action.payload
        })
        .addCase(getBook.rejected,(state,action)=>{
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.payload
        })

        .addCase(deleteBook.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(deleteBook.fulfilled, (state,action)=>{
            state.isSuccess = true
            state.isLoading = false
            state.orders = state.orders.filter((order)=>order._id !== action.payload.id)
        })
        .addCase(deleteBook.rejected,(state,action)=>{
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.payload
        })
    }
})

export const {reset} = bookSlice.actions
export default bookSlice.reducer;