import React, { Fragment, useEffect, useState } from "react";
import "./book.css";
import BookInfo from "./BookInfo";
import BooksList from "./BooksList";
import { useDispatch, useSelector } from "react-redux";
import { getBooks, deleteBook, getBook } from "../../store/bookSlice";

const PostContainer = () => {
  const [selectedBook, setselectedBook] = useState({}); //null
  const { isLoading, books, error } = useSelector((state) => state.books);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const getBookId = (id) => {
    // console.log(id);
    // filter  it's same find but return all parameters in object
    // but find returned just object of the information
    const selectedBook = books.find((item) => item.id === id);
    // console.log(selectedBook);

    // don't mutate state
    setselectedBook((prev) => {
      return { ...prev, ...selectedBook };
    });
  };

  return (
    <Fragment>
      <hr className="my-5" />
      <div className="row">
        <div className="col">
          <BooksList
            isLoading={isLoading}
            books={books}
            error={error}
            isLoggedIn={isLoggedIn}
            deleteBook={deleteBook}
            dispatch={dispatch}
            getBookId={getBookId}
          />
        </div>
        <div className="col side-line">
          <BookInfo info={selectedBook} />
        </div>
      </div>
    </Fragment>
  );
};

export default PostContainer;
