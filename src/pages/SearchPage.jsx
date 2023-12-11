import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCarousel/ProductCard'
import { Select } from 'antd'
import axiosInstance from '../axios/axiosClient'
import { useSearchParams } from 'react-router-dom'
import Loading from './Loading'

const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [products, setProducts] = useState([])
    const [sort, setSort] = useState('asc')
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSearch = async () => {
            try {
                setLoading(true)
                const res = await axiosInstance.get('/ProductPortfolio/search', {
                    params: {
                        query: searchParams.get('query'),
                        supplierName: searchParams.get('supplierName'),
                        categoryName: searchParams.get('categoryName'),
                    }
                })
                setProducts(res?.data?.metadata)
                setLoading(false)
            } catch (error) {
                console.log(error);
                setLoading(false)
            }
        }

        fetchSearch()
    }, [searchParams])

    return (
        <div className='searchpage-container'>
            {loading ? <Loading /> : (<>
                <div className='arrange-searchpage'>
                    <div className='arrange'>
                        <span className='title-arrange'>Sắp xếp</span>
                        <Select
                            defaultValue={sort}
                            style={{
                                width: 140,
                            }}
                            onChange={(value) => setSort(value)}
                            options={[
                                {
                                    value: 'asc',
                                    label: 'Giá tăng',
                                },
                                {
                                    value: 'desc',
                                    label: 'Giá giảm',
                                },
                            ]}
                        />
                    </div>
                </div>
                <div className='content-search'>
                    {
                        products?.length > 0 ?
                            (
                                <div className='suggestion-productcard'>
                                    {
                                        products.sort((a, b) => sort === 'asc' ? a.price - b.price : b.price - a.price).map(item => (
                                            <ProductCard data={item} key={item?.id} />
                                        ))
                                    }
                                </div>
                            ) : (
                                <div className='notfound-searchpage'>
                                    <div className='logo-searchpage-notfound'>
                                        <img src="https://salt.tikicdn.com/desktop/img/mascot@2x.png" alt="" />
                                    </div>
                                    <p className='title-notfound'>Không tìm thấy sản phẩm</p>
                                </div>
                            )
                    }
                    {products.length > 0 && (<div className='mt-3 text-end'>
                    </div>)}
                </div>
            </>)}
        </div>
    )
}

export default SearchPage