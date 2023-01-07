import { useState, useEffect } from 'react';

const Book = (props) => {

		const [ book, setBook ] = useState([]);
        const BASE_URL = "https://bce-trending.herokuapp.com/book";
        const getBook= async ()=>{
            try{
                const response = await fetch(BASE_URL)
                const allBook = await response.json()
                setBook(allBook)
            }catch(err){
                console.log(err)
            }
        }

        const loaded = () => {
            return book?.map((book) => {
              return (
                <div key={book._id}>
                  <h1>{book.title}</h1>
                  {/* <img src={Word.image} />
                  <h3>{word.title}</h3> */}
                </div>
              );
            });
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
        
        
        useEffect(()=>{getBook()},[])
        console.log(`there is ${book.length} books available to render`)
        return (
            <section className="book-list">{book && book.length ? loaded() : loading()}</section>
          );
}

export default Book