import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProductCarousel from '../components/ProductCarousel/ProductCarousel'
import axiosInstance from '../axios/axiosClient'
import { AppContext } from '../context/AppProvider'
import { message, Rate } from 'antd'
import Comment from '../components/Comment/Comment'
import formatPrice from '../utils/formatPrice'
import Button from '../components/common/Button'
import { FaMinus, FaPlus } from "react-icons/fa";
import { Col, Row } from 'antd';

const ProductDetailPage = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [product, setProduct] = useState({})
    const [productCarousel, setProductCarousel] = useState([])
    const [evaluate, setEvaluate] = useState([])
    const [quantity, setQuantity] = useState(1)

    const { carts, setCarts } = useContext(AppContext)

    const handleChange = (e) => {
        const value = e.target.value;

        // Kiểm tra xem giá trị nhập vào có phải là số nguyên không
        if (/^\d*$/.test(value)) {
            // Nếu là số nguyên, cập nhật state
            setQuantity(value);
        }
    }

    const handleChangeQuantity = (type) => {
        if (type === -1) {
            setQuantity(quantity - 1)
        }
        else if (type === 1) {
            setQuantity(quantity + 1)
        }
    }

    const handleAddToCart = () => {
        if (product?.quantity === 0) {
            message.warning('Sản phẩm đã hết hàng');
            return;
        }

        const isExistIndex = carts.findIndex(item => item.id === product.id);
        if (isExistIndex !== -1) {
            // Sản phẩm đã tồn tại trong giỏ hàng
            const updatedCarts = [...carts];

            // console.log(updatedCarts[isExistIndex].count, product.quantity);
            if (updatedCarts[isExistIndex].count === product.quantity) {
                message.warning('Bạn đã thêm đủ số lượng trong giỏ hàng')
                return;
            }

            updatedCarts[isExistIndex].count += parseInt(quantity);
            localStorage.setItem('carts', JSON.stringify(updatedCarts));
            setCarts(updatedCarts);
            message.success('Cập nhật giỏ hàng thành công');
        } else {
            // Sản phẩm chưa tồn tại trong giỏ hàng
            const newData = [...carts, { ...product, count: quantity }];
            localStorage.setItem('carts', JSON.stringify(newData));
            setCarts(newData);
            message.success('Thêm thành công');
        }
    }

    const handleBuyNow = () => {
        handleAddToCart();
        navigate('/cart')
    }


    useEffect(() => {
        const fetchCarousel = async (categoryId) => {
            try {
                const res = await axiosInstance.get(`/ProductPortfolio/suggest?categoryId=${categoryId}`)
                setProductCarousel(res?.data?.metadata)
            } catch (error) {
                console.log(error);
            }
        }
        const fetchProduct = async () => {
            const res = await axiosInstance.get(`ProductPortfolio/${id}`);
            fetchCarousel(res?.data?.metadata?.categoryId)
            setProduct(res?.data?.metadata);
        }

        fetchProduct();

    }, [id])

    useEffect(() => {
        const fetchEvaluate = async () => {
            const res = await axiosInstance.get(`/Evaluate/ProductPortfolio/${id}`);
            setEvaluate(res?.data?.metadata)
        }
        fetchEvaluate()
    }, [id])


    console.log(product);
    return (
        <div className='content-container'>
            <section className='container product-detail-container'>
                {/**xs: đt, md: tablet */}
                <Row>
                    {/*Col Image */}
                    <Col xs={24} sm={6} md={24} lg={6} xl={6} className='test-left'>
                        {/* Image  */}
                        <div className='image-product-detail-group'>
                            <div className='image-product-detail'>
                                <img
                                    src={product?.image}
                                    alt=""
                                />
                            </div>
                        </div>
                    </Col>

                    <Col xs={24} sm={1} md={24} lg={1} xl={1}>

                    </Col>

                    {/*Col Content */}
                    <Col xs={24} sm={10} md={24} lg={10} xl={10} className='test-between'>
                        {/* Detail  */}
                        <div className='content-product-detail'>
                            <div className='contentproductdetail'>
                                <div className='content-header-product-detail'>
                                    <div className='banner-header-product-detail'>
                                        <div className='image-baner-header-product-detail'>
                                            <img
                                                src="https://salt.tikicdn.com/ts/upload/d7/56/04/b93b8c666e13f49971483596ef14800f.png"
                                                alt="tikipro"
                                            />
                                        </div>
                                        <span className='suppliername-product-detail'>Thương hiệu: {product?.supplierName}</span>
                                    </div>

                                    <h1 className='name-product-detail'>
                                        {product?.name}
                                    </h1>

                                    <div className='voterate-product-detail'>
                                        {
                                            product?.star <= 0 ?
                                                <span>Chưa có đánh giá</span> :
                                                <>
                                                    <span className=''>{Number.parseFloat(product?.star).toFixed(1)}</span>
                                                    <Rate disabled allowHalf value={product?.star} className='voterate-star-product-detail' />
                                                </>
                                        }
                                        <div className='product-in-stock-product-detail' />
                                        <span className='product-in-stock'>
                                            {/* Đã bán 269 */}
                                            Còn {product?.quantity} sản phẩm
                                        </span>
                                    </div>
                                </div>

                                <div className="price-discount-product-detail">
                                    <div className="price-product-detail">
                                        {formatPrice(product?.price)}
                                    </div>
                                    <div className="discount-product-detail">-5%</div>
                                </div>
                            </div>

                            <div className='description-product-detail'>
                                <h3 className='title-description-product-detail'>Mô tả sản phẩm</h3>
                                <p className='description-productdetail'>
                                    {product?.description}
                                </p>
                            </div>
                        </div>
                    </Col>

                    <Col xs={24} sm={1} md={24} lg={1} xl={1}>

                    </Col>

                    {/*Col Buy */}
                    <Col xs={24} sm={6} md={24} lg={6} xl={6} className='test-right'>
                        <div className='right-container-product-detail'>
                            <div className='right-product-detail'>
                                <div>
                                    <h3 className='text-count-product-detail'>Số lượng</h3>

                                    <div className='buttons-product-detail'>
                                        <button
                                            disabled={quantity <= 1}
                                            onClick={() => handleChangeQuantity(-1)}
                                            className='button-product-detail-minus'
                                        >
                                            <FaMinus />
                                        </button>

                                        <input
                                            value={product?.quantity === 0 ? 0 : quantity}
                                            onChange={handleChange}
                                            type="text"
                                            className='input-count-product-detail'
                                        />

                                        <button
                                            disabled={quantity >= product?.quantity}
                                            onClick={() => handleChangeQuantity(1)}
                                            className='button-product-detail-plus'
                                        >
                                            <FaPlus />
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <h3 className='provisional-title-product-detail'>Tạm tính</h3>
                                    <div className='provisional-product-detail'>{formatPrice(product?.price)}</div>
                                </div>

                                <div className='button-add-now-add-cart'>
                                    <Button onClick={handleBuyNow} className="button-buynow-detail-product-detail">Mua ngay</Button>
                                    <Button onClick={handleAddToCart} className="button-addcart-detail-product-detail">Thêm vào giỏ hàng</Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col xs={24} sm={17} md={24} lg={7} xl={17}>
                        {/* Comment */}
                        <div className='comment-container-product-detail'>
                            <h3 className='title-comment-product-detail'>Bình luận</h3>
                            <Comment data={evaluate} />
                        </div>
                    </Col>
                </Row>

                {/* Selling products */}
                <div className='list-product-suggest'>
                    {productCarousel.length >= 8 && <ProductCarousel slidesToShow={7} data={productCarousel} title='Sản phẩm bán chạy' />}
                </div>
            </section>
        </div>

    )
}

export default ProductDetailPage