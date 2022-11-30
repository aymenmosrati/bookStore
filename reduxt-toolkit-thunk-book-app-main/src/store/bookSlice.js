import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = { books: null };

// fire = techta8al 
// this function we return three types of functions:
//  penndind = time of called data
// fulfilled = return data of success 
// rejected = return error
// this function because to cosume ani Query (API or GraphQL) and return async function 
export const getBooks = createAsyncThunk('book/getBooks', async (args, thunkAPI) => {
    try {
        const res = await fetch('http://localhost:4000/books');
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
})


const bookSlice = createSlice({
    name: "book",
    initialState,
    //reducers: pure , no accepted the aside function 
    reducers: {},
    // accepted the acide function and asid effect API or GraphQL .....
    extraReducers:{
        [getBooks.pending]:(state,action)=>{
            console.log(action);
        },
        [getBooks.fulfilled]:(state,action)=>{
            console.log(action);
        },
        [getBooks.rejected]:(state,action)=>{
            console.log(action);
        },
    }
})

export default bookSlice.reducer;