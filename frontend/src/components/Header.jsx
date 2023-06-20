import { Link } from "react-router-dom";
import DropDownMenu from "./DropDownMenu";
import React, { useState } from 'react'
const Header = (props) => {

  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div>
      <div className="centering">
        <div id="trend">
          <h1>#Trending</h1>
        </div>
      </div>
      <div className="navBar">
        <Link to="/">Home</Link>
        <br />
        <br></br>
        <Link to="/Word">Dank Slang</Link>
        <br></br>
        <Link to="/fashion">That's so fetch</Link>
        <br></br>
        <Link to="/book">Book-Toc</Link>
        <br></br>
        <Link onClick={() => setOpenMenu((prev => !prev))}>Post</Link>

        {
          openMenu && <DropDownMenu />
        }
        
      </div>
    </div>
  );
};

export default Header;
