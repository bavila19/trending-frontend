import { Route, Routes } from "react-router";
import Home from "../Pages/Home"
import WordShow from "../Pages/WordShow"
import Word from "../Pages/Word";
import Book from "../Pages/Book";
import BookShow from "../Pages/BookShow"
import Fashion from "../Pages/Fashion";
import FashionShow from "../Pages/FashionShow"

const Main = (props) => {
    return (
        <main>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/word" element={<Word />} />
                <Route path="/word/:id" element={<WordShow />} />
                <Route path="/book" element={<Book />} />
                <Route path="/book/:id" element={<BookShow />} />
                <Route path="/fashion" element={<Fashion />} />
                <Route path="/fashion/:id" element={<FashionShow />} />
            </Routes>
        </main>
    )
};




export default Main;