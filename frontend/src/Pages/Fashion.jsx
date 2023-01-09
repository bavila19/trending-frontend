import { useState, useEffect } from 'react';

const Fashion = (props) => {

		const [ fashion, setFashion ] = useState([]);
      const [ newFashion, setNewFashion ] = useState ({
        name: "",
      });
        const BASE_URL = "https://bce-trending.herokuapp.com/fashion";
        const getFashion= async ()=>{
            try{
                const response = await fetch(BASE_URL)
                const allFashion = await response.json()
                setFashion(allFashion)
            }catch(err){
                console.log(err)
            }
        }
        
        const handleChange = (e) => {
          const userInput = {...newFashion}
          userInput[e.target.name] = e.target.value
          setNewFashion(userInput)
        }

        const handleSubmit = async (e) => {
          e.preventDefault()
          const currentState = { ...newFashion }
          try {
            const requestOptions = {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(currentState)             
            }
            const response = await fetch(BASE_URL, requestOptions)
            const createdFashion = await response.json()
            console.log(createdFashion)
            setFashion([...fashion, createdFashion])
            setNewFashion({
              name:"",
            })

          } catch (err) {
            console.log(err)
          }
      }

        const loaded = () => {
            return fashion?.map((fashion) => {
              return (
                <div key={fashion._id}>
                  <h1>{fashion.name}</h1>
                  {/* <img src={Word.image} />
                  <h3>{word.title}</h3> */}
                </div>
              );
            });
          };
        
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
        
        useEffect(()=>{getFashion()},[])
        console.log(`there is ${fashion.length} fashion available to render`)
        return (
            <section className="fashion-list">{fashion && fashion.length ? loaded() : loading()}
            <h2>New Fashion</h2>
            <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor='name'>
                    Fashion
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="enter a fashion"
                      value={newFashion.name}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <br />
                <input type="submit" value="Create a new Word" />
            </form>
            </section>
          );
}

export default Fashion