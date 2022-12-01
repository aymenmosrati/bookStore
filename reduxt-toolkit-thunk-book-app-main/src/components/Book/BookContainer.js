import React, { Fragment, useEffect } from "react";
import BookInfo from "./BookInfo";
import BooksList from "./BooksList";
import { useDispatch, useSelector } from "react-redux";

import "./book.css";
import { getBooks } from "../../store/bookSlice";

const PostContainer = () => {
  const { isLoading, books, error } = useSelector((state) => state.books);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks({ id: 1 }));
  }, [dispatch]);

  return (
    <Fragment>
      <hr className="my-5" />
      <div className="row">
        <div className="col">
          <BooksList isLoading={isLoading} books={books} error={error} />
        </div>
        <div className="col side-line">
          <BookInfo />
        </div>
      </div>
    </Fragment>
  );
};

export default PostContainer;
