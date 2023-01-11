import { Link } from "react-router-dom";
const Header = (props) => {
    return (
        <div className="navBar">
            <h1>This is the nav</h1>
            <Link to="/">Home</Link>
            <Link to="/word">Word</Link>
            <Link to="/fashion">Fashion</Link>
            <Link to="/book">Book</Link>
        </div>
    )
};

export default Header;