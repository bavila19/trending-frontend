import { useState, useEffect } from 'react';

const Fashion = (props) => {

		const [ fashion, setFashion ] = useState([]);
      const [ newFashion, setNewFashion ] = useState ({
        name: "",
        image: "",
        description: "",
      });
        const BASE_URL = "http://localhost:4000/fashion";
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
            const createdTrend = await response.json()
            console.log(createdTrend)
            setFashion([...fashion, createdTrend])
            setNewFashion({
              name: "",
              image: "",
              description: "",
            })

          } catch (err) {
            console.log(err)
          }
      }

        // const loaded = () => {
        //     return fashion?.map((fashion) => {
        //       return (
        //         <div key={fashion._id}>
        //           <img src={fashion.image} alt={fashion.name}  height={200} width={200}/>
        //           <h1>{fashion.name}</h1>
        //           <h3>{fashion.description}</h3>
        //           <h3>{fashion.link}</h3>
        //         </div>
        //       );
        //     });
        //   };

        const loaded = () => {
          return (<>
              
              <section className="trend-list">
                  {fashion?.map((trend) => {
                      return (
                          <div key={trend._id} to={`/fashion/${trend._id}`}>
                          <div className='fashion-card'>
                              {/* React optimization / difference */}
                              <h1>{trend.name}</h1>
                              <img src={trend.image} alt={trend.name}  height={200} width={200}/>
                              <h3>{trend.description}</h3>
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
                        Title
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