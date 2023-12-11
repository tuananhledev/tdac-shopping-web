import React, { useContext, useState } from 'react'
import { Table, message, Button, Modal } from 'antd'
import CartEmpty from '../components/Cart/CartEmpty';
import Invoice from '../components/Cart/Invoice';
import { Link } from 'react-router-dom';
import formatPrice, { totalPrice } from '../utils/formatPrice';
import { AppContext } from '../context/AppProvider';
import { FaRegTrashAlt } from "react-icons/fa";
import Quantity from '../components/BuyProduct/Quantity';

const CartPage = () => {
    const [isEmpty] = useState(false)
    // const [showModal, setShowModal] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

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


    const { carts, setCarts, auth } = useContext(AppContext)

    const columns = [
        {
            title: 'Tên sản phẩm',
            render: (_, record) => (
                <div className='nameproduct-cartpage-container'>
                    <div className='imageproduct-cartpage'>
                        <img
                            src={record?.image}
                            alt=''
                        />
                    </div>
                    <Link to={`/products/${record?.id}`} className='nameproduct-cartpage'>
                        {record?.name}
                    </Link>
                </div>
            ),
            width: '40%',
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            render: (text) => formatPrice(text),
        },
        {
            title: 'Số lượng',
            dataIndex: 'count',
            render: (text, record) => {
                return (
                    <Quantity record={record} />
                )
            },
        },
        {
            title: 'Thành tiền',
            render: (_, record) => formatPrice(record.price * record.count),
        },
        {
            title: () => {
                return (
                    <Button classname="icon-trach">
                        <FaRegTrashAlt />
                    </Button>
                )
            },
            dataIndex: 'trash',
            render: (_, record) => {
                return (
                    <Button onClick={() => {
                        const newCarts = carts.filter(item => item.id !== record.id)
                        setCarts(newCarts)
                        localStorage.setItem('carts', JSON.stringify(newCarts))
                    }} classname="icon-trach">
                        <FaRegTrashAlt />
                    </Button>
                )
            },
        }
    ];

    const onSelectChange = (newSelectedRowKeys, selectedRow) => {
        setSelectedRows(selectedRow)
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const handleCloseModal = () => {
        setVisible(false);
        setSelectedRows([])
    }

    return (
        <div className="cart-page-container">
            <div className="container">
                <section className='cart-page-right-container'>
                    <h2 className='title-cart-cartpage'>Giỏ hàng</h2>
                    {isEmpty ? <CartEmpty /> : (
                        <div className='table-data-cartpage-container'>
                            <div className='table-data-cartpage'>
                                <div className='tabledata-cartpage-table'>
                                    <Table
                                        rowKey='id'
                                        pagination={false}
                                        columns={columns}
                                        dataSource={carts}
                                        rowSelection={rowSelection}
                                    />
                                </div>
                            </div>

                            <div className='right-cartpage-container'>
                                <div className='right-cartpage'>
                                    <div className='layout-right-cartpage'>
                                        <div className='children-layout-cartpage'>
                                            <span>Tổng tiền</span>
                                            <div className='col-children'>
                                                <span className='totalPrice-right-cartpage'>{formatPrice(totalPrice(selectedRows))}</span>
                                                <span className='title-vat-right-cartpage'>(Đã bao gồm VAT nếu có)</span>
                                            </div>
                                        </div>
                                    </div>

                                    <Button
                                        type='primary'
                                        className='button-buy-cartpage-right'
                                        danger
                                        disabled={selectedRowKeys.length <= 0}
                                        onClick={() => {
                                            if (auth === null) {
                                                message.warning('Vui lòng đăng nhập');
                                                return;
                                            }
                                            if (selectedRowKeys.length > 0)
                                                showModal();
                                        }}
                                    >
                                        Mua hàng
                                    </Button>

                                    <Modal
                                        visible={visible}
                                        onCancel={handleCancel}
                                        footer={null}
                                        isOpen={showModal} onClose={handleCloseModal}
                                        width={840}
                                    >
                                        <Invoice onClose={handleCloseModal} data={selectedRows} />
                                    </Modal>
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </div>
    )
}
export default CartPage