import { Route, Routes } from "react-router";
import Home from "../Pages/Home"

const Main = (props) => {
    return (
        <main>
            <h1>This is the Main Component</h1>
            <Routes>
                <Route path="/home" element={<Home/>}/>
                
            </Routes>
        </main>
    )
};

    

   
  export default Main;