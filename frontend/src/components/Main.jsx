import { Route, Routes } from "react-router";
import Home from "../Pages/Home"
import Word from "../Pages/Word";
import Book from "../Pages/Book";
import Fashion from "../Pages/Fashion";

const Main = (props) => {
    return (
        <main>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/word" element={<Word/>}/>
                <Route path="/book" element={<Book/>}/>
                <Route path="/fashion" element={<Fashion/>}/>
            </Routes>
        </main>
    )
};

    

   
  export default Main;