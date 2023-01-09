import { useState, useEffect } from 'react';

const Fashion = (props) => {

		const [ fashion, setFashion ] = useState([]);
      const [ newFashion, setNewFashion ] = useState ({
        image: "",
        name: "",
        description: "",
        link: "",
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
              image: "",
              name: "",
              description: "",
              link: "",
            })

          } catch (err) {
            console.log(err)
          }
      }

        const loaded = () => {
            return fashion?.map((fashion) => {
              return (
                <div key={fashion._id}>
                  <img src={fashion.image} alt={fashion.name}  height={200} width={200}/>
                  <h1>{fashion.name}</h1>
                  <h3>{fashion.description}</h3>
                  <h3>{fashion.link}</h3>
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
            <section className="fashion-list">
            <h2>New Fashion</h2>
            <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor='image'>
                      Image
                      <input 
                          type="text" 
                          id="image"
                          name="image" 
                          placeholder="enter the fashion trend image" 
                          value={newFashion.image}
                          onChange={handleChange}
                      />
                  </label>
                </div>
                <div>
                  <label htmlFor='name'>
                    Name
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
                <div>
                    <label htmlFor='description'>
                        Description
                        <input 
                            type="text" 
                            id="description"
                            name="description" 
                            placeholder="enter the fashion trend description" 
                            value={newFashion.description}
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
                            placeholder="enter the fashion trends link" 
                            value={newFashion.link}
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