import React from 'react'
import { Link } from "react-router-dom";

const DropDownMenu = () => {
    return (
        <div className='flex flex-col dropDownMenu'>
            <ul className='flex flex-col gap-4'>
                <li>Slang</li>
                <li>Fashion</li>
                <li>Books</li>
            </ul>

        </div>
    )
}

export default DropDownMenu