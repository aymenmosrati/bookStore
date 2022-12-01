import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = { books: [], isLoading: false, error: null };

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
    const { rejectWithValue } = thunkAPI;
    try {
      // part 2
      //dispatch({type:'book/getBooks/pending', payload: undefined})
      const res = await fetch("http://localhost:4000/books");
      const data = await res.json();
      return data;
      //dispatch({type:'book/getBooks/fulfilled', payload: data})
    } catch (error) {
      return rejectWithValue(error.message);
      //dispatch({type:'book/getBooks/rejected', payload: error})
    }
  }
);

// part1 getbooks: {pending, fulfilled, rejected}
// getbooks -> createAsyncThunk ->create 3 type of actions
// pending createAction('book/getBooks/pending', (payload) =>{return payload})
// fulfilled createAction('book/getBooks/pending', (payload) =>{return payload})
// rejected createAction('book/getBooks/pending', (payload) =>{return payload})

export const insertBook = createAsyncThunk(
  "book/insertBook",
  async (bookData, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    // {id:1}= objet
    // {"id": "1"}= json
    try {
      // console.log(getState());
      // add username in object(json) in server and add name
      bookData.userName = getState().auth.name;
      const res = await fetch("http://localhost:4000/books", {
        method: "POST",
        body: JSON.stringify(bookData),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBook = createAsyncThunk(
  "book/deleteBook",
  async (item, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      const res = await fetch(`http://localhost:4000/books/${item.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });
      return item;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState,
  //reducers: pure , no accepted the aside function
  reducers: {},
  // accepted the acide function and asid effect API or GraphQL .....
  extraReducers: {
    // get books
    [getBooks.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
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
      state.error = action.payload;
    },

    // insert books
    [insertBook.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
      //   console.log(action);
    },
    [insertBook.fulfilled]: (state, action) => {
      //   console.log(action);
      state.isLoading = false;
      state.books.push(action.payload);
    },
    [insertBook.rejected]: (state, action) => {
      //   console.log(action);
      state.isLoading = false;
      state.error = action.payload;
    },

    // delete books
    [deleteBook.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
      //   console.log(action);
    },
    [deleteBook.fulfilled]: (state, action) => {
      // console.log(action.payload);
      state.isLoading = false;
      state.books = state.books.filter(
        (element) => element.id !== action.payload.id
      );
    },
    [deleteBook.rejected]: (state, action) => {
      //   console.log(action);
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default bookSlice.reducer;
