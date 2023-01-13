import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

const Word = (props) => {

  const [word, setWord] = useState([]);
  const [newWord, setNewWord] = useState({
    name: "",
    image: "",
    description: "",
  });
  const BASE_URL = "https://trending-backend.herokuapp.com/word";
  const getWord = async () => {
    try {
      const response = await fetch(BASE_URL)
      const allWord = await response.json()
      setWord(allWord)
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (e) => {
    const userInput = { ...newWord }
    userInput[e.target.name] = e.target.value
    setNewWord(userInput)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const currentState = { ...newWord }
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(currentState)
      }
      const response = await fetch(BASE_URL, requestOptions)
      const createdTrendw = await response.json()
      console.log(createdTrendw)
      setWord([...word, createdTrendw])
      setNewWord({
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
      <section className="trendw-list">
        {word?.map((trendw) => {
          return (
              <div className='card' key={trendw._id}>
                <div className='trendContainer'>
                  <h1>{trendw.name}</h1>
                <img className='pic' src={trendw.image}  width={550} />
                <h3>{trendw.description}</h3>
                <Link key={trendw._id} to={`/word/${trendw._id}`}>Edit</Link>
                </div>
              </div>
          )
        })
        }
      </section>
    </>
    )
  }

  const loading = () => (
    <section className="word-list">
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

  useEffect(() => { getWord() }, [])
  console.log(`there is ${word.length} fashion available to render`)
  return (
    <section className="word-list">
      <div className='new-list'>
      <h2>New Slang</h2>
      <p>Avoid feeling old and be woke with todays generation!</p>
        <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>
            Name
            <input
              type="text"
              id="name"
              name="name"
              placeholder="enter a word trend name"
              value={newWord.name}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor='image' >
            Image
            <input
              type="text"
              id="image"
              name="image"
              placeholder="enter a meme or word image"
              value={newWord.image}
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
              placeholder="enter the words description"
              value={newWord.description}
              onChange={handleChange}
            />
          </label>
        </div>
        <br />
        <input type="submit" value="Create a new Word" />
      </form>
      </div>
      
      {word && word.length ? loaded() : loading()}
    </section>
  );
}

export default Word