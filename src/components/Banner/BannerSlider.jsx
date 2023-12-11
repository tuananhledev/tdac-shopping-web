import React from 'react'
import Slider from 'react-slick';

const BannerSlider = ({ arrImages }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    arrows: false,
                    infinite: false,
                },
            },
        ],
        autoplay: true,
        autoplaySpeed: 1000,
    };
    return (
        <Slider {...settings} className='image-banner'>
            {arrImages.map((image) => (
                <img src={image} alt="slider" preview={false} width="100%" />
            ))}
        </Slider>
    )
}

export default BannerSlider