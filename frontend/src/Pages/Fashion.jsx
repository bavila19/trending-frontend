import { useState, useEffect } from 'react';

const Fashion = (props) => {

		const [ fashion, setFashion ] = useState([]);
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
            <section className="fashion-list">{fashion && fashion.length ? loaded() : loading()}</section>
          );
}

export default Fashion