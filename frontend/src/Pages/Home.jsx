import { useEffect, useState } from 'react';
import {json} from "react-router"

function Home ( props ) {
    const [word, setWord] = useState(null)
    
    async function fetchID(){
        try{
            const response = await fetch (`https://trending-backend.herokuapp.com/word`)
            const wordData = await response.json()
            const random = Math.floor(Math.random() * wordData.length)
            console.log(wordData[random])
            setWord(wordData[random])
    }catch(err){
        console.log(err)
    }
    }


    useEffect(()=>{
        fetchID()
    },[])
      return (
        <div>
            { word ? <>
                <div className='card'>
                  <h1>{word.name}</h1>
                  <img className='pic' src={word.image} alt={word.name} height={200} width={200} />
                  <h3>{word.description}</h3>
                </div>
            </> : null }
        </div>
            ) 
}

export default Home

// import { useEffect, useState } from 'react';
// import {json} from "react-router"
// function Home ( props ) {
//     const [word, setWord] = useState(null)
//     async function fetchID(){
//         try{
//             const id = word[Math.floor(Math.random() * word.length)]
//             const response = await fetch (`https://trending-backend.herokuapp.com/word/${id}`)
//             const wordData = await response.json()
//             console.log(wordData)
//             setWord(wordData)
//     }catch(err){
//         console.log(err)
//     }
//     }
//     useEffect(()=>{
//         fetchID()
//     },[])
//       return (
//         <div>
//             { word ? <>
//                 <div className='card'>
//                  <h1>{word.name}</h1>
//                   <img className='pic' src={word.image} alt={word.name} height={200} width={200} />
//                   <h3>{word.description}</h3>
//                  </div>
//              </> : null }
//          </div>
//             ) 
//  }

// export default Home