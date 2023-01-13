import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function WordShowPage(props) {
    const [trendw, setTrendw] = useState(null)
    const [editForm, setEditForm] = useState("")
    const navigate = useNavigate()
    const params = useParams()
    const { id } = params
    const URL = `https://trending-backend.herokuapp.com/word/${id}`

    const handleChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value })

    const updateTrendw = async (e) => {
        e.preventDefault()
        try {
            const options = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editForm)
            }
            const response = await fetch(URL, options)
            const updatedTrendw = await response.json()

            setTrendw(updatedTrendw)
            setEditForm(updatedTrendw)
        } catch (err) {
            console.log(err)
            navigate(URL)
        }
    }
//phantom comment here
    const getTrendw = async () => {
        try {
            const response = await fetch(URL)
            const foundTrendw = await response.json()

            setTrendw(foundTrendw)
            setEditForm(foundTrendw)
        } catch (err) {
            console.log(err)
        }
    }

    const removeTrendw = async () => {
        try {
            const options = {
                method: "DELETE"
            }
            const response = await fetch(URL, options)
            const deletedTrendw = await response.json()
            navigate('/word')
        } catch (err) {
            console.log(err)
            navigate(URL)
        }
    }
    useEffect(() => {
        getTrendw()
    }, [])

    const loaded = () => (
        <>
            <section>
                <div className="word">
                    <h1>Word Show Page</h1>
                    <h2>{trendw.name}</h2>
                    <img src={trendw.image} />
                    <h3>{trendw.description}</h3>
                    <div>
                        <button className="delete" onClick={removeTrendw}>Remove Word</button>
                    </div>
                </div>
            </section>
            <section>
                <h2>Edit this Word Trend</h2>
                <form onSubmit={updateTrendw}>
                    <input
                        type="text"
                        value={editForm.name}
                        name="name"
                        placeholder="name"
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        value={editForm.image}
                        name="image"
                        placeholder="image URL"
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        value={editForm.description}
                        name="description"
                        placeholder="description"
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
        <div>{trendw ? loaded() : loading()}</div>
    )
}


export default WordShowPage