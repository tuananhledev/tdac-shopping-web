import React from 'react'
import Slider from 'react-slick';
import ProductCard from './ProductCard';

const ProductCarousel = ({ data = [], title = '', slidesToShow = 5 }) => {
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: slidesToShow,
        speed: 500,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    arrows: false,
                    infinite: false,
                },
            },
        ],
        autoplay: true,
        autoplaySpeed: 1000,
    };
    return (
        <div className='productcarousel-slider p-4'>
            <h3 className="card-title">{title}</h3>
            <Slider {...settings}>
                {
                    data.map(item => (
                        <ProductCard data={item} key={item?.id} />
                    ))}
            </Slider>
        </div>

    )
}

export default ProductCarousel