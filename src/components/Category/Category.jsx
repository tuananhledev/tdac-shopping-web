import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios/axiosClient';
import CategoryItem from './CategoryItem';


const Category = () => {
    const [categories, setCategories] = useState([]);
    const [isHidden, setIsHidden] = useState(false);

    const handleResize = () => {
        if (window.innerWidth < 768) {
            setIsHidden(true);
        } else {
            setIsHidden(false);
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axiosInstance.get('/Category/get-all');
                setCategories(res?.data?.metadata);
            } catch (error) {
                console.log(error);
            }
        };
        window.addEventListener('resize', handleResize);
        fetchCategories();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={`category-container ${isHidden ? 'hidden' : ''}`}>
            <h3 className="title-category">Danh mục</h3>
            <ul>
                {categories.map(item => (
                    <CategoryItem
                        to={`/search?categoryName=${item?.id}`}
                        key={item?.id}
                    >
                        {item?.name}
                    </CategoryItem>
                ))}
            </ul>
        </div>
    );
};

export default Category;
