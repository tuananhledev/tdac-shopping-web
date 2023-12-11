import React from 'react'
import { Link } from 'react-router-dom'
import { BiCategory } from "react-icons/bi";

const CategoryItem = ({ children, to = '/' }) => {
    return (
        <li className='category-item-container'>
            <Link to={to} className='category-items-list'>
                {
                    <div className='image-category'>
                        <BiCategory />
                    </div>
                }
                <span>{children}</span>
            </Link>
        </li>
    )
}

export default CategoryItem