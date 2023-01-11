import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function WordShow(props) {
    const [word, setWord] = useState(null)
    const [editForm, setEditForm] = useState("")

    const navigate = useNavigate()

    const params = useParams()
    const { id } = params

    const URL = `https://trending-backend.herokuapp.com/word/${id}`
    const handleChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value })


    const updateWord = async (e) => {
        e.preventDefault()
        console.log(editForm)
        try {
            const options = {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(editForm)

            }
            const response = await fetch(URL, options)
            console.log(response)
            const updatedWord = await response.json()
            console.log(updatedWord)

            setWord(updatedWord)
            setEditForm(updatedWord)

        } catch (err) {
            console.log(err)
            navigate(URL)
        }
    }

    const getWord = async () => {
        try {
            const response = await fetch(URL)
            const foundWord = await response.json()

            setWord(foundWord)
            setEditForm(foundWord)

        } catch (err) {
            console.log(err)
        }

    }

    const removeWord = async () => {
        try {
            const options = {
                method: "DELETE"
            }
            const response = await fetch(URL, options)
            const deletedWord = await response.json()

            navigate('/')

        } catch (err) {
            console.log(err)
            navigate(URL)
        }
    }
    useEffect(() => {
        getWord()
    }, [])

    const loaded = () => (
        <>
            <section>
                <div className="Word">
                    <h1>Word Show Page</h1>
                    <h2>{word.name}</h2>
                    <img src={word.image} alt={word.name + " image"} />
                    <h2>{word.description}</h2>
                    <div>
                        <button className="delete" onClick={removeWord}>Remove Word</button>
                    </div>
                </div>
            </section>
            <section>
                <h2>Edit this Word Trend</h2>
                <form onSubmit={updateWord}>
                    <input
                        type="text"
                        value={editForm.name}
                        name="name"
                        placeholder="name"
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        value={editForm.description}
                        name="description"
                        placeholder="description"
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        value={editForm.image}
                        name="image"
                        placeholder="image URL"
                        onChange={handleChange}
                    />
                    <input type="submit" value="Update Word" />
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
        <div>{word ? loaded() : loading()}</div>
    )
}

export default WordShow