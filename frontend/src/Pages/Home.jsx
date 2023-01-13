import { useEffect, useState } from 'react';
import {json} from "react-router"

function Home ( props ) {
    const [word, setWord] = useState(null)
    const [fashion, setFashion] = useState(null)
    const [book, setBook] = useState(null)
    async function fetchRandomW(){
        try{
            const response = await fetch (`https://trending-backend.herokuapp.com/word`)
            const wordData = await response.json()
            const randomW = Math.floor(Math.random() * wordData.length)
            setWord(wordData[randomW])
    }catch(err){
        console.log(err)
    }
    }

    async function fetchRandomF(){
        try{
            const response = await fetch (`https://trending-backend.herokuapp.com/fashion`)
            const fashionData = await response.json()
            const randomF = Math.floor(Math.random() * fashionData.length)
            setFashion(fashionData[randomF])
    }catch(err){
        console.log(err)
    }
    }

    async function fetchRandomB(){
        try{
            const response = await fetch (`https://trending-backend.herokuapp.com/book`)
            const bookData = await response.json()
            const randomB = Math.floor(Math.random() * bookData.length)
            setBook(bookData[randomB])
    }catch(err){
        console.log(err)
    }
    }

    useEffect(()=>{
        fetchRandomW();
        fetchRandomF();
        fetchRandomB();
    },[])
      return (
        <div className="trendw-list">
            <h1>Random Trends of the day</h1>
            { word ? <>
                <div className='card'>
                  <h1>{word.name}</h1>
                  <img className='pic' src={word.image} width={550} />
                  <h3>{word.description}</h3>
                </div>
            </> : null }
        { fashion ? <>
            <div className='card'>
              <h1>{fashion.name}</h1>
              <img className='pic' src={fashion.image} width={550} />
              <h3>{fashion.description}</h3>
            </div>
        </> : null }
         { book ? <>
                <div className='card'>
                  <h1>{book.name}</h1>
                  <img className='pic' src={book.image} width={250} />
                  <h3>{book.description}</h3>
                </div>
            </> : null }
        </div>
            ) 

}
export default Home