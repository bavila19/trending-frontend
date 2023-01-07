import { useState, useEffect } from 'react';

const Word = (props) => {

		const [ word, setWord ] = useState([]);
        // const [newForm, setNewForm] = useState({
        //     name: "",
        // });
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

        const loaded = () => {
            return word?.map((word) => {
              return (
                <div key={word._id}>
                  <h1>{word.name}</h1>
                  {/* <img src={Word.image} />
                  <h3>{word.title}</h3> */}
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
            <section className="word-list">{word && word.length ? loaded() : loading()}</section>
          );
}

export default Word