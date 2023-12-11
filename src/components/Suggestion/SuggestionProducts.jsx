import React, { useEffect, useState } from 'react'
import ProductCard from '../../components/ProductCarousel/ProductCard'
import axiosInstance from '../../axios/axiosClient'

const SuggestionProducts = () => {
    const [products, setProducts] = useState([])
    const [productCarousel, setProductCarousel] = useState([])
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPage: 8,
        currentEntry: 10
    })

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

                setPagination(res?.data?.pagination)

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

    const handleLoadMore = async () => {
        try {
            if (pagination.currentPage === pagination.totalPage) return;
            const res = await axiosInstance.get(`/ProductPortfolio/get-all?pageNumber=${pagination.currentPage + 1}&pageSize=10`)
            setPagination({ ...pagination, currentPage: pagination.currentPage + 1 })
            setProducts(prev => [...prev, ...res?.data?.metadata])
        } catch (error) {

        }
    }

    return (
        <div>
            <h3 className='title-suggestion'>Gợi ý cho bạn</h3>
            <div className='suggestion-productcard'>
                {
                    products.map(item => (
                        <ProductCard data={item} key={item?.id} />
                    ))
                }
            </div>
            <div className='button-continue-suggestion'>
                {
                    pagination.currentPage !== pagination.totalPage &&
                    <button className='button-continue' onClick={handleLoadMore} >
                        Xem thêm
                    </button>
                }
            </div>
        </div>
    )
}

export default SuggestionProducts