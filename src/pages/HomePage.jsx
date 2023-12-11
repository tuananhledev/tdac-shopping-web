import React, { useEffect, useState } from 'react'
import BannerSlider from '../components/Banner/BannerSlider'
import ProductCarousel from '../components/ProductCarousel/ProductCarousel'
import axiosInstance from '../axios/axiosClient'
import banner1 from '../components/Banner/banner/banner-1.jpg'
import banner2 from '../components/Banner/banner/banner-2.jpg'
import banner3 from '../components/Banner/banner/banner-3.jpg'
import banner4 from '../components/Banner/banner/banner-4.jpg'
import banner5 from '../components/Banner/banner/banner-5.jpg'
import banner6 from '../components/Banner/banner/banner-6.jpg'
import banner7 from '../components/Banner/banner/banner-7.jpg'
import banner8 from '../components/Banner/banner/banner-8.jpg'
import SuggestionProducts from '../components/Suggestion/SuggestionProducts'


const HomePage = () => {
    const [products, setProducts] = useState([])
    const [productCarousel, setProductCarousel] = useState([])

    useEffect(() => {
        const fetchCarousel = async (pageNumber) => {
            try {
                const res = await axiosInstance.get(`/ProductPortfolio/get-all?pageNumber=${pageNumber}&pageSize=10`)
                setProductCarousel(res?.data?.metadata)
            } catch (error) {
                console.log(error);
            }
        }
        const fetchProduct = async () => {
            try {
                const res = await axiosInstance.get('/ProductPortfolio/get-all?pageNumber=1&pageSize=10')

                setProducts(res?.data?.metadata)

                if (productCarousel <= 0) {
                    const random = Math.floor(Math.random() * res?.data?.pagination?.totalPage)
                    fetchCarousel(random === 0 ? 1 : random)
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchProduct()
    }, [productCarousel])
    return (
        <div>
            {/*Banner */}
            <div className='banner-slider-container'>
                <BannerSlider arrImages={[banner1, banner2, banner3, banner4, banner5, banner6, banner7, banner8]} />
            </div>

            {/*List Product Suggest*/}
            <div className='list-product-suggest'>
                <ProductCarousel data={productCarousel} title='Sản phẩm bán chạy' />
            </div>

            {/* Suggestion */}
            <div className='suggestion-container'>
                <SuggestionProducts />
            </div>
        </div>
    )
}

export default HomePage