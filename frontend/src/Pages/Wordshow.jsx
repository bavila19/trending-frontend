import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function WordShow(props) {
    const [Word, setWord] = useState(null)
    const [editForm, setEditForm] = useState("")
    
		const navigate = useNavigate()

        const params = useParams()
    const { id } = params

    const URL = `https://bce-trending.herokuapp.com/word/${id}`
    const handleChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value })


    const updateWord = async (e) => {
        e.preventDefault()
        try {
            const options = {
                method: "PUT",
                headers: {"content-type": "applications/json" },
                body: JSON.stringify(editForm)

            }
            const response = await fetch(URL, options)
            const updatedWord = await response.json()

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
                <h2>{Word.name}</h2>
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
        <div>{Word ? loaded() : loading()}</div>
    )
}    

export default WordShow