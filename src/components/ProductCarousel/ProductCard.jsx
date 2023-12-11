import React from 'react'
import { Link } from 'react-router-dom'
import formatPrice from '../../utils/formatPrice'
import { MdStar } from "react-icons/md";

const ProductCard = ({ data }) => {
    return (
        <div className='product-card-container'>
            <Link to={`/products/${data?.id}`}>
                <div className='productcard-image'>
                    <img src={data?.image} alt="" />
                </div>
            </Link>

            <div className="p-3 position-relative d-flex flex-column">
                <div className='logo-banner-productcard'>
                    <img
                        src="https://salt.tikicdn.com/ts/tka/69/cf/22/1be823299ae34c7ddcd922e73abd4909.png"
                        alt=""
                    />
                </div>
                <Link to={`/products/${data?.id}`} className="title-productcard text-truncate-3 mb-">
                    {data?.name}
                </Link>


                <div className="d-flex align-items-center font-weight-bold">
                    <div className='star-price-productcard'>
                        <div className='star-productcard'>
                            <MdStar />
                            <MdStar />
                            <MdStar />
                            <MdStar />
                            <MdStar />
                        </div>
                        <span className="mr-2 price-productcard">
                            {formatPrice(data?.price)}
                        </span>
                    </div>
                </div>
                <hr className="my-2" />
                <div className='banner-ship-productcard'>
                    <div className='banner-ship-image'>
                        <img
                            src="https://salt.tikicdn.com/ts/tka/7f/d3/02/47399a13bffceb9cb81179252bfc5fc1.png"
                            alt="tikipro"
                        />
                    </div>
                    <span>Hẹn giờ giao lắp</span>
                </div>
            </div>


        </div>
    )
}

export default ProductCard