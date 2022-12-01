import React from "react";

const BooksList = ({ isLoading, books }) => {

  // ?. == books (if books != null) 
  const booksList = books.length > 0 ? books.map((items) =>
    <li className="list-group-item d-flex  justify-content-between align-items-center"
      key={items.id} >
      <div>{items.title}</div>
      <div className="btn-group" role="group">
        <button type="button" className="btn btn-primary">
          Read
        </button>
        <button type="button" className="btn btn-danger">
          Delete
        </button>
      </div>
    </li>
  ): "There is no books available!";
  return (
    <div>
      <h2>Books List</h2>
      {isLoading ? (
        "loading..."
      ) : (
        <ul className="list-group">{booksList}</ul>
      )}
    </div>
  );
};

export default BooksList;
