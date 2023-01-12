import { Link } from "react-router-dom";
const Header = (props) => {
    return (
        <div>
             <div class="centering">
           <div id="trend">
            <h1>#Trending</h1> 
           </div>
            
            </div>
            <div className="navBar">
            <Link to="/">Home</Link>
            <br/>
            <br></br>
            <Link to="/word">Word</Link>
            <br></br>
            <Link to="/fashion">Fashion</Link>
            <br></br>
            <Link to="/book">Book</Link>
            </div>
            
            </div>

    )
};

export default Header;