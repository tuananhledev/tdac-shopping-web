import { Button, Table, Modal } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import CommentModal from '../components/Comment/CommentModal';
import { Link } from 'react-router-dom';
import axiosInstance from '../axios/axiosClient';
import { AppContext } from '../context/AppProvider';
import processOrders from '../utils/processOrders';
import formatPrice from '../utils/formatPrice';
import formatDate from '../utils/formatDate';

const PurchasePage = () => {
    const { auth } = useContext(AppContext)
    //const [showModal, setShowModal] = useState(false);
    const [orders, setOrders] = useState([])
    const [selectItem, setSelectItem] = useState(null)
    //Popup
    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        // Xử lý khi nhấn Cancel
        setVisible(false);
    };
    //End Popup

    const fetchOrder = async (userId) => {
        try {
            const res = await axiosInstance.get(`/User/get-all/Order?userId=${userId}`)
            const uniqueOrderList = processOrders(res?.data?.metadata?.orders)

            setOrders(uniqueOrderList)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchOrder(auth?.id)
    }, [auth?.id])


    const parentColumns = [
        {
            title: 'Mã hoá đơn',
            dataIndex: 'id',
            render: (item) => (
                <div>
                    <span className='font-medium'>Mã hoá đơn:</span> {item}
                </div>
            )
        },
        {
            title: 'Ngày hoá đơn',
            dataIndex: 'createDate',
            render: (item) => (
                <div>
                    <span className='font-medium'>Ngày mua:</span> {formatDate(item)}
                </div>
            )
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalAmount',
            render: (item) => (
                <div>
                    <span className='font-medium'>Tổng tiền:</span> {formatPrice(item)}
                </div>
            )
        },
        {
            title: 'Trạng thái',
            dataIndex: 'orderStatus',
            render: (item) => (
                <div>
                    <span className='font-medium'>Trạng thái:</span> {item}
                </div>
            )
        },
    ]

    const handleShowComment = (record) => {
        setVisible(true);
        setSelectItem(record)
    }

    const handleCloseModal = () => {
        setSelectItem(null)
        setVisible(false);
    }

    const expandedRowRender = (record) => {
        const columns = [
            {
                title: 'Tên sản phẩm',
                dataIndex: 'product',
                render: (_, record) => (
                    <div className='purchasepage-name-product-and-image'>
                        <div className='purchasepage-image-product'>
                            <img
                                src={record?.productImage}
                                alt=''
                            />
                        </div>
                        <Link to={`/products/${record?.productId}`} className='name-product-purchasepage'>
                            {record?.productName}
                        </Link>
                    </div>
                ),
                width: '40%'
            },
            {
                title: 'Đơn giá',
                dataIndex: 'price',
                render: (text) => formatPrice(text)
            },
            {
                title: 'Số lượng',
                dataIndex: 'quantity',
            },
            {
                title: 'Thành tiền',
                render: (_, record) => formatPrice(record?.quantity * record?.price)
            },
            {
                title: 'Action',
                dataIndex: 'action',
                width: '10%',
                render: (_, subRecord) => {
                    return (
                        <Button disabled={record?.orderStatus === 'Chờ xác nhận'} onClick={() => handleShowComment(subRecord)} type="primary" danger>Đánh giá</Button>
                    )
                }
            }
        ];

        return (
            <Table
                columns={columns}
                rowKey="productId"
                dataSource={record.orderItems}
                pagination={false}
                size="small"
            />
        );
    };

    return (
        <>
            <h2 className='order-purchased-title'>Đơn đã mua</h2>
            <div>
                <div className='order-purchased-table'>
                    <Table
                        pagination={false}
                        showHeader={false}
                        columns={parentColumns}
                        rowKey="id"
                        dataSource={orders}
                        scroll={{ x: 800 }}
                        expandable={{
                            expandedRowRender,
                            expandedRowKeys: orders.map(item => item?.id),
                        }}
                        size="small"
                    />
                </div>
            </div>


            <Modal
                visible={visible}
                onCancel={handleCancel}
                footer={null}
                isOpen={showModal} onClose={handleCloseModal}
                width={600}
            >
                <CommentModal onClose={handleCloseModal} data={selectItem} />
            </Modal>
        </>
    )
}

export default PurchasePage