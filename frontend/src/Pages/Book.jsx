import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'

const Book = (props) => {
		const [ book, setBook ] = useState([]);
    const [newBook, setNewBook] = useState({
      image:"",
      name:"",
      author:"",
      description: "",
      // link: "",
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
            const createdTrendb= await response.json()
            console.log(createdTrendb)
            // update local state with response (json from be)
            setBook([...book, createdTrendb])
            // reset newForm state so that our form empties out
            setNewBook({
              image:"",
              name:"",
              author:"",
              description: "",
              // link: "",
            })
          }catch(err){
            console.log(err)
          }
        }

        const loaded = () => {
          return (<>
              
            <section className="trendb-list">
                {book?.map((trendb) => {
                    return (
                        <Link key={trendb._id} to={`/book/${trendb._id}`}>
                        <div className='trendb-card'>
                            {/* React optimization / difference */}
                            <img src={trendb.image} alt={trendb.name}  height={200} width={200}/>
                            <h1>{trendb.name}</h1>
                            <h3>{trendb.author}</h3>
                            <h3>{trendb.description}</h3>
                            {/* <h3>{trend.link}</h3> */}
                        </div>
                        </Link>
                    )
                })
                }
            </section>
            </>
          )
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
                  <label htmlFor= "bookTitle">
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
                  {/* <div>
                    <label htmlFor='link'>
                        Link
                        <input 
                            type="text" 
                            id="link"
                            title="link" 
                            placeholder="Enter link for book" 
                            value={newBook.link}
                            onChange={handleChange}
                        />
                    </label>
                    </div> */}
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