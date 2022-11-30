import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = { books: null, isLoading: false };

// fire = techta8al
// this function we return three types of functions:
//  penndind = time of called data
// fulfilled = return data of success
// rejected = return error
// this function because to cosume ani Query (API or GraphQL) and return async function
export const getBooks = createAsyncThunk(
  "book/getBooks",
  //   args : if you send data in parametres of deipatch we store this data in this parameters (args, can be rename any other name)
  async (args, thunkAPI) => {
    try {
      // part 2
      //dispatch({type:'book/getBooks/pending', payload: undefined})
      const res = await fetch("http://localhost:4000/books");
      const data = await res.json();
      return data;
      //dispatch({type:'book/getBooks/fulfilled', payload: data})
    } catch (error) {
      console.log(error);
      //dispatch({type:'book/getBooks/rejected', payload: error})
    }
  }
);

// part1 getbooks: {pending, fulfilled, rejected}
// getbooks -> createAsyncThunk ->create 3 type of actions
// pending createAction('book/getBooks/pending', (payload) =>{return payload})
// fulfilled createAction('book/getBooks/pending', (payload) =>{return payload})
// rejected createAction('book/getBooks/pending', (payload) =>{return payload})

const bookSlice = createSlice({
  name: "book",
  initialState,
  //reducers: pure , no accepted the aside function
  reducers: {},
  // accepted the acide function and asid effect API or GraphQL .....
  extraReducers: {
    [getBooks.pending]: (state, action) => {
      state.isLoading = true;
      //   console.log(action);
    },
    [getBooks.fulfilled]: (state, action) => {
      //   console.log(action);
      state.isLoading = false;
      state.books = action.payload;
    },
    [getBooks.rejected]: (state, action) => {
      //   console.log(action);
      state.isLoading = false;
    },
  },
});

export default bookSlice.reducer;
