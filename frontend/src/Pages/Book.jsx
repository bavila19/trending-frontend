import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'


const Book = (props) => {
		const [ book, setBook ] = useState([]);
    const [newBook, setNewBook] = useState({
      image:"",
      title:"",
      author:"",
      description: "",
      link: "",
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
          userInput[e.target.name] = e.target.value
          console.log(userInput)
          console.log(newBook.title)
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
              image:"",
              title:"",
              author:"",
              description: "",
              link: "",
            })
          }catch(err){
            console.log(err)
          }
        }

        const loaded = () => {
            return book?.map((book) => {
              return (
                <Link key={book.id} to={`/book/${book._id}`}>
                <div className='book'>
                  <img src={book.image} alt={book.name}  height={200} width={200}/>
                  <h1>{book.title}</h1>
                  <h1>{book.author}</h1>
                  <h3>{book.description}</h3>
                  <h3>{book.link}</h3>
                  
                </div>
                </Link>
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
            <section className="book-list">
              <h2>New Book</h2>
              <form onSubmit = {handleSubmit}>
                <div>
                  <label htmlFor='image'>
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
                  <label htmlFor= "title">
                    Book
                    <input
                      type="text"
                      id="title"
                      title="title"
                      placeholder="Enter A Book"
                      value={newBook.title}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div>
                    <label htmlFor='author'>
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
                    <label htmlFor='description'>
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
                  <div>
                    <label htmlFor='link'>
                        Link
                        <input 
                            type="text" 
                            id="link"
                            name="link" 
                            placeholder="Enter link for book" 
                            value={newBook.link}
                            onChange={handleChange}
                        />
                    </label>
                    </div>
                <br />
                <input
                  type="submit"
                  value= "Create a new book"/>

              </form>
              {book && book.length ? loaded() : loading()}
            </section>
          );
        }
        
export default Book