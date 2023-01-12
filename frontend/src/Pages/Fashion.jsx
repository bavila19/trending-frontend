import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

const Fashion = (props) => {

  const [fashion, setFashion] = useState([]);
  const [newFashion, setNewFashion] = useState({
    name: "",
    image: "",
    description: "",
  });
  const BASE_URL = "https://trending-backend.herokuapp.com/fashion";
  const getFashion = async () => {
    try {
      const response = await fetch(BASE_URL)
      const allFashion = await response.json()
      setFashion(allFashion)
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (e) => {
    const userInput = { ...newFashion }
    userInput[e.target.name] = e.target.value
    console.log(e.target.name)
    console.log(e.target.value)
    setNewFashion(userInput)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const currentState = { ...newFashion }
    console.log(currentState, "data sent to API")
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(currentState)
      }
      const response = await fetch(BASE_URL, requestOptions)
      const createdTrendf = await response.json()
      console.log(createdTrendf)
      setFashion([...fashion, createdTrendf])
      setNewFashion({
        name: "",
        image: "",
        description: "",
      })

    } catch (err) {
      console.log(err)
    }
  }

  const loaded = () => {
    return (<>
      <section className="trendf-list">
        {fashion?.map((trendf) => {
          return (
              <div className='fashion-card'>
                <h1>{trendf.name}</h1>
                <img src={trendf.image} alt={trendf.name} height={200} width={200} />
                <h3>{trendf.description}</h3>
                <Link key={trendf._id} to={`/fashion/${trendf._id}`}>Edit</Link>
              </div>
          )
        })
        }
      </section>
    </>
    )
  }

  const loading = () => (
    <section className="fashion-list">
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

  useEffect(() => { getFashion() }, [])
  console.log(`there is ${fashion.length} fashion available to render`)
  return (
    <section className="fashion-list">
      <h2>New Fashion</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>
            Name
            <input
              type="text"
              id="name"
              name="name"
              placeholder="enter a fashion trend name"
              value={newFashion.name}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor='image'>
            Image
            <input
              type="text"
              id="image"
              name="image"
              placeholder="enter a fashion trend image"
              value={newFashion.image}
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
              placeholder="enter the fashions description"
              value={newFashion.description}
              onChange={handleChange}
            />
          </label>

        </div>
        <br />
        <input type="submit" value="Create a new Word" />
      </form>
      {fashion && fashion.length ? loaded() : loading()}
    </section>
  );
}

export default Fashion