import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Book = (props) => {
  const [book, setBook] = useState([]);
  const [newBook, setNewBook] = useState({
    image: "",
    name: "",
    author: "",
    description: "",
  });
  const BASE_URL = "https://trending-backend.herokuapp.com/book";
  const getBook = async () => {
    try {
      const response = await fetch(BASE_URL);
      const allBook = await response.json();
      setBook(allBook);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const userInput = { ...newBook };
    userInput[e.target.name] = e.target.value;
    setNewBook(userInput);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentState = { ...newBook };
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentState),
      };
      const response = await fetch(BASE_URL, requestOptions);

      const createdTrendb = await response.json();

      setBook([...book, createdTrendb]);

      setNewBook({
        image: "",
        name: "",
        author: "",
        description: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const loaded = () => {
    return (
      <>
        <section className="trendw-list">
          {book?.map((trendb) => {
            return (
              <div className="card" key={trendb._id}>
                <div className="trendContainer">
                  <img
                    className="pic"
                    src={trendb.image}
                    alt={trendb.name}
                    width={250}
                  />
                  <h1>{trendb.name}</h1>
                  <h3>Author: {trendb.author}</h3>
                  <h3>Description: {trendb.description}</h3>
                  <Link key={trendb._id} to={`/book/${trendb._id}`}>
                    Edit
                  </Link>
                </div>

              </div>
            );
          })}
        </section>
      </>
    );
  };

  const loading = () => (
    <section className="book-list">
      <h1>
        Loading...
        <span>
          <img
            className="spinner"
            src="https://freesvg.org/img/1544764567.png"
          />{" "}
        </span>
      </h1>
    </section>
  );

  useEffect(() => {
    getBook();
  }, []);
  
  return (
    <section className="new-list">
      <h2>New Book-toc</h2>
      <p>See what book everyone is raving about on tiktok</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="image">
            Image
            <input
              type="text"
              id="image"
              name="image"
              placeholder="enter the books image"
              value={newBook.image}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="bookTitle">
            Book
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter A Book"
              value={newBook.name}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="author">
            Author
            <input
              type="text"
              id="author"
              name="author"
              placeholder="Enter author"
              value={newBook.author}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="description">
            Description
            <input
              type="text"
              id="description"
              name="description"
              placeholder="Book description here"
              value={newBook.description}
              onChange={handleChange}
            />
          </label>
        </div>

        <br />
        <input type="submit" value="Create a new book" />
      </form>
      {book && book.length ? loaded() : loading()}
    </section>
  );
};

export default Book;
