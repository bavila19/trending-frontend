import { useState, useEffect } from 'react';

const Word = (props) => {

		const [ word, setWord ] = useState([]);
        const [newWord, setNewWord] = useState({
          name: "",
          description: "",
          link: "",
        });
        const BASE_URL = "https://bce-trending.herokuapp.com/word";
        const getWord= async ()=>{
            try{
                const response = await fetch(BASE_URL)
                const allWord = await response.json()
                setWord(allWord)
            }catch(err){
                console.log(err)
            }
        }

        const handleChange = (e) => {
          const userInput = {...newWord}
          userInput[e.target.name] = e.target.value
          setNewWord(userInput)
      }

    //post here 
      const handleSubmit = async (e) => {
        // 0. prevent default (event object method)
        e.preventDefault()
        // 1. capturing our local state
        const currentState = { ...newWord }
        // check any fields for property data types / truthy value (function call - stretch)
        try {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(currentState)
            }
            // 2. specify request method , headers, Content-Type
            // 3. make fetch to BE - sending data (requestOptions)

            // 3a fetch sends the data to API - (mongo)
            const response = await fetch(BASE_URL, requestOptions)
            // 4. check our response - 
            // 5. parse the data from the response into JS (from JSON) 
            const createdWord = await response.json()
            console.log(createdWord)
            // update local state with response (json from be)
            setWord([...word, createdWord])
            // reset newForm state so that our form empties out
            setNewWord({
              name: "",
              description: "",
              link: "",
            })

        } catch (err) {
            console.log(err)
        }
    }
        const loaded = () => {
            return word?.map((word) => {
              return (
                <div key={word._id}>
                  <h1>{word.name}</h1>
                  <h3>{word.description}</h3>
                  <h3>{word.link}</h3>
                </div>
              );
            });
          };
        
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
        
        
        useEffect(()=>{getWord()},[])
        console.log(`this is word ${word.length}, but I'm nineteen and don't know how to read`)
        return (
            <section className="word-list">
              <h2>New word </h2>
              <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='name'>
                            Word
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="enter a Word"
                                value={newWord.name}
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
                            placeholder="enter the word trend description" 
                            value={newWord.description}
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
                            placeholder="enter the word trend link" 
                            value={newWord.link}
                            onChange={handleChange}
                        />
                    </label>
                    </div>
                        <br />
                        <input type="submit" value="Create a new Word" />
                </form>
                {word && word.length ? loaded() : loading()}
            </section>
          );
}

export default Word