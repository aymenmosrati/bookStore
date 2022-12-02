import React from "react";

const BooksList = ({
  isLoading,
  books,
  isLoggedIn,
  dispatch,
  deleteBook,
  getBookId,
}) => {
  // ?. == books (if books != null)
  const booksList =
    books.length > 0
      ? books.map((items) => (
          <li
            className="list-group-item d-flex  justify-content-between align-items-center"
            key={items.id}
          >
            <div>{items.title}</div>
            <div className="btn-group" role="group">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => getBookId(items.id)}
              >
                Read
              </button>
              <button
                type="button"
                className="btn btn-danger"
                disabled={!isLoggedIn}
                onClick={() =>
                  dispatch(deleteBook(items))
                    // .then((data) => {
                    //   // do additional work
                    //   console.log(data);
                    // })

                    // .unwrap: bech tna7i akel les parameters el zayed lekol wtjiblek ken l object
                    // .then and .catch : t3awe4 el try and catch wel (fulfiled w rejected)
                    .unwrap()
                    .then((originalPromiseResult) => {
                      // console.log(originalPromiseResult);
                      // handle result here
                      // ha4a behi kif t7eb ta3mel test 3al result ta3 el request wala t7eb ta3mel alert wala aya 7aja
                    })
                    .catch((rejectedValueOrSerializedError) => {
                      // console.log(rejectedValueOrSerializedError);
                      // handle error here
                    })
                }
              >
                Delete
              </button>
            </div>
          </li>
        ))
      : "There is no books available!";
  return (
    <div>
      <h2>Books List</h2>
      {isLoading ? "loading..." : <ul className="list-group">{booksList}</ul>}
    </div>
  );
};

export default BooksList;
