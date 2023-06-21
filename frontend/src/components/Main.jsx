import { Route, Routes } from "react-router";
import Home from "../Pages/Home";
import WordShowPage from "../Pages/WordShowPage";
import Word from "../Pages/Word";
import Book from "../Pages/Book";
import BookShow from "../Pages/BookShow";
import Fashion from "../Pages/Fashion";
import FashionShowPage from "../Pages/FashionShowPage";

const Main = (props) => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/word" element={<Word />} />
        <Route path="/word/:id" element={<WordShowPage />} />
        <Route path="/book" element={<Book />} />
        <Route path="/book/:id" element={<BookShow />} />
        <Route path="/fashion" element={<Fashion />} />
        <Route path="/fashion/:id" element={<FashionShowPage />} />
      </Routes>
    </main>
  );
};


export default Main;
