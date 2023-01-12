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
            console.log(wordData[randomW])
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
            console.log(fashionData[randomF])
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
            console.log(bookData[randomB])
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
        <div>
            { word ? <>
                <div className='card'>
                  <h1>{word.name}</h1>
                  <img className='pic' src={word.image} alt={word.name} width={550} />
                  <h3>{word.description}</h3>
                </div>
            </> : null }
        { fashion ? <>
            <div className='card'>
              <h1>{fashion.name}</h1>
              <img className='pic' src={fashion.image} alt={fashion.name} width={550} />
              <h3>{fashion.description}</h3>
            </div>
        </> : null }
         { book ? <>
                <div className='card'>
                  <h1>{book.name}</h1>
                  <img className='pic' src={book.image} alt={book.name} width={250} />
                  <h3>{book.description}</h3>
                </div>
            </> : null }
        </div>
            ) 

}
export default Home