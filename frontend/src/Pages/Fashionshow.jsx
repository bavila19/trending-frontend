import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function FashionShow(props) {
    const [fashion, setFashion] = useState(null)
    const [editForm, setEditForm] = useState("")
        const navigate = useNavigate()
    const params = useParams()
    const { id } = params
    const URL = `https://bce-trending.herokuapp.com/fashion/${id}`

    const handleChange = (e) => setEditForm ({ ...editForm, [e.target.name]: e.target.value})

    const updateFashion = async (e) => {
        e.preventDefault()
        try {
            const options = {
                method: "PUT",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(editForm)
            }
            const response = await fetch(URL, options)
            const updatedFashion = await response.json()

            setFashion(updatedFashion)
            setEditForm(updatedFashion)
        } catch (err) {
            console.log(err)
            navigate(URL)
        }
    }

    const getFashion = async () => {
        try {
            const response = await fetch(URL)
            const foundFashion = await response.json()

            setFashion(foundFashion)
            setEditForm(foundFashion)
        } catch (err) {
            console.log(err)
        }
    }

    const removeFashion = async () => {
        try {
            const options = {
                method: "DELETE"
            }
            const response = await fetch(URL, options)
            const deletedFashion = await response.json()
            navigate('/')
        } catch (err) {
            console.log(err)
            navigate(URL)
        }
    }
    useEffect(() => {
        getFashion()
    }, [])

    const loaded = () => (
        <>
        <section>
            <div className="person">
                <h1>Fashion Show Page</h1>
                <img src={fashion.image} alt={fashion.name + " image"} />
                <h2>{fashion.name}</h2>
                <img src={fashion.image} alt={fashion.name + " image"} />
                <h2>{fashion.description}</h2>
                <div>
                    <button className="delete" onClick={removeFashion}>Remove Fashion</button>
                </div>
            </div>
        </section>
        <section>
            <h2>Edit this Fashion Trend</h2>
            <form onSubmit={updateFashion}>
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
        <div>{fashion ? loaded() : loading()}</div>
    )
}


export default FashionShow