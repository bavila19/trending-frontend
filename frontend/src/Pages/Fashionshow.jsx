import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function FashionShow(props) {
    const [trendf, setTrendf] = useState(null)
    const [editForm, setEditForm] = useState("")
    const navigate = useNavigate()
    const params = useParams()
    const { id } = params
    const URL = `https://trending-backend.herokuapp.com/fashion/${id}`

    const handleChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value })

    const updateTrendf = async (e) => {
        e.preventDefault()
        try {
            const options = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editForm)
            }
            const response = await fetch(URL, options)
            const updatedTrendf = await response.json()

            setTrendf(updatedTrendf)
            setEditForm(updatedTrendf)
        } catch (err) {
            console.log(err)
            navigate(URL)
        }
    }

    const getTrendf = async () => {
        try {
            const response = await fetch(URL)
            const foundTrendf = await response.json()

            setTrendf(foundTrendf)
            setEditForm(foundTrendf)
        } catch (err) {
            console.log(err)
        }
    }

    const removeTrendf = async () => {
        try {
            const options = {
                method: "DELETE"
            }
            const response = await fetch(URL, options)
            const deletedTrendf = await response.json()
            navigate('/')
        } catch (err) {
            console.log(err)
            navigate(URL)
        }
    }
    useEffect(() => {
        getTrendf()
    }, [])

    const loaded = () => (
        <>
            <section>
                <div className="fashion">
                    <h1>Fashion Show Page</h1>
                    <h2>{trendf.name}</h2>
                    <img src={trendf.image} alt={trendf.name + " image"} />
                    <h3>{trendf.description}</h3>
                    <div>
                        <button className="delete" onClick={removeTrendf}>Remove Fashion</button>
                    </div>
                </div>
            </section>
            <section>
                <h2>Edit this fashion Trend</h2>
                <form onSubmit={updateTrendf}>
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
                    <input type="submit" value="Update Fashion" />
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
        <div>{trendf ? loaded() : loading()}</div>
    )
}


export default FashionShow