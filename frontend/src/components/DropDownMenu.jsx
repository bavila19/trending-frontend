import React from 'react'
import { Link } from "react-router-dom";

const DropDownMenu = () => {
    return (
        <div className='flex flex-col dropDownMenu'>
            <ul className='flex flex-col gap-4'>
                <li><Link to="/CreateSlang">Slang</Link></li>
                <li><Link to="/CreateFashion">Fashion</Link></li>
                <li><Link to="/CreateBook">Books</Link></li>
            </ul>

        </div>
    )
}

export default DropDownMenu