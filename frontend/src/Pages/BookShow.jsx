import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function BookShow(props) {
    const [book, setBook] = useState(null)
    const [editForm, setEditForm] = useState("")
        const navigate = useNavigate()
    const params = useParams()
    const { id } = params
    const URL = `https://bce-trending.herokuapp.com/book/${id}`

    const handleChange = (e) => setEditForm ({ ...editForm, [e.target.name]: e.target.value})

    const updateBook = async (e) => {
        e.preventDefault()
        try {
            const options = {
                method: "PUT",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(editForm)
            }
            const response = await fetch(URL, options)
            const updatedBook = await response.json()

            setBook(updatedBook)
            setEditForm(updatedBook)
        } catch (err) {
            console.log(err)
            navigate(URL)
        }
    }

    const getBook = async () => {
        try {
            const response = await fetch(URL)
            const foundBook = await response.json()

            setBook(foundBook)
            setEditForm(foundBook)
        } catch (err) {
            console.log(err)
        }
    }

    const removeBook = async () => {
        try {
            const options = {
                method: "DELETE"
            }
            const response = await fetch(URL, options)
            const deletedBook = await response.json()
            navigate('/')
        } catch (err) {
            console.log(err)
            navigate(URL)
        }
    }
    useEffect(() => {
        getBook()
    }, [])

    const loaded = () => (
        <>
        <section>
            <div className="book">
                <h1>Book Show Page</h1>
                <img src={book.image} alt={book.name + " image"} />
                <h2>{book.name}</h2>
                <h3>{book.author}</h3>
                <h3>{book.description}</h3>
                {/* <img src={book.image} alt={book.name + " image"} /> */}
                <div>
                    <button className="delete" onClick={removeBook}>Remove book</button>
                </div>
            </div>
        </section>
        <section>
            <h2>Edit this Book Trend</h2>
            <form onSubmit={updateBook}>
            <input
                        type="text"
                        value={editForm.image}
                        name="image"
                        placeholder="image URL"
                        onChange={handleChange}
                    />
                <input
                    type="text"
                    value={editForm.title}
                    name= "title"
                    placeholder="title"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    value={editForm.author}
                    name= "author"
                    placeholder="author"
                    onChange={handleChange}
                />
                <input
                        type="text"
                        value={editForm.description}
                        name="description"
                        placeholder="description"
                        onChange={handleChange}
                    />
                <input type="submit" value="Update Book" />
            </form>
        </section>
        </>
    )
    const loading = () => (
        <>
            <h1>
                Loading...
            </h1>
        </>
    );
    return (
        <div>{book ? loaded() : loading()}</div>
    )
}


export default BookShow