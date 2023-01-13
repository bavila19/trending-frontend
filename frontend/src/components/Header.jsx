import { Link } from "react-router-dom";
const Header = (props) => {
    return (
        <div>
             <div className="centering">
           <div id="trend">
            <h1>#Trending</h1> 
           </div>
            
            </div>
            <div className="navBar">
            <Link to="/">Home</Link>
            <br/>
            <br></br>
            <Link to="/word">Dank Slang</Link>
            <br></br>
            <Link to="/fashion">That's So Fetch</Link>
            <br></br>
            <Link to="/book">Book-Toc</Link>
            </div>
            
            </div>

    )
};

export default Header;