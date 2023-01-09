import { useState, useEffect } from 'react';

const Book = (props) => {
		const [ book, setBook ] = useState([]);
    const [newBook, setNewBook] = useState({
      title:"",
    });
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

        const handleChange = (e) =>{
          const userInput = {...newBook}
          userInput[e.target.title] = e.target.value
          setNewBook(userInput)
        }

        const handleSubmit = async (e) =>{
          e.preventDefault()
          const currentState = {...newBook}
          try{
            const requestOptions ={
              method: "POST",
              headers:{
                "Content-Type": "application/json"
              },
              body: JSON.stringify(currentState)
            }
            const response = await fetch(BASE_URL, requestOptions)
            // 4. check our response - 
            // 5. parse the data from the response into JS (from JSON) 
            const createdBook= await response.json()
            console.log(createdBook)
            // update local state with response (json from be)
            setBook([...book, createdBook])
            // reset newForm state so that our form empties out
            setNewBook({
                title: "",
            })
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
            <section className="book-list">{book && book.length ? loaded() : loading()}
              <h2>New Book</h2>
              <form onSubmit = {handleSubmit}>
                <div>
                  <label htmlFor= "book">
                    Book
                    <input
                      type="text"
                      id="name"
                      title="title"
                      placeholder="Enter A Book"
                      value={newBook.title}
                      onChange={handleChange}
                    />

                  </label>
                </div>
                <br />
                <input
                  type="submit"
                  value= "Create a new book"/>

              </form>
            </section>
          );
}

export default Book