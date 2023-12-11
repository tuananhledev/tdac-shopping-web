import React, { useContext, useState } from 'react';
import { Form, Input, Button, message, Radio, Space } from 'antd';
import { AppContext } from '../../context/AppProvider';
import formatPrice, { totalPrice } from '../../utils/formatPrice';
import axiosInstance from '../../axios/axiosClient';
import { useNavigate } from 'react-router-dom';

const Invoice = ({ data = [], onClose }) => {
   const navigate = useNavigate();
   const { auth, carts, setCarts } = useContext(AppContext);
   const [loading, setLoading] = useState(false);

   const currentDate = new Date();

   const getProductData = (data = []) => {
      return data?.map((item) => item.id);
   };

   const handleSubmit = async ({ payment, address, phone }) => {
      try {
         const productIds = getProductData(data);
         setLoading(true);

         const totalAmount = (totalPrice(data) * 1.1).toFixed(0);

         const requestData = {
            userId: auth?.id,
            employeeId: '1',
            customerName: auth?.name,
            address: address,
            phone: phone,
            totalAmount: totalAmount,
            createDate: new Date(),
            orderType: 'Online',
            orderStatus: payment ? 'Đã xác nhận' : 'Chờ xác nhận',
            orderItems: data.map((item) => ({
               productId: item?.id,
               orderId: '',
               price: item?.price,
               quantity: item?.count,
            })),
            payment: {
               orderId: 'string',
               totalAmount: totalAmount,
               content: payment ? `Online - Momo - ${totalAmount}` : 'string',
               paymentMethod: payment ? 'Online' : 'string',
               status: payment ? 'Đã thanh toán' : 'Chưa thanh toán',
               createDate: new Date(),
            },
         };

         if (payment === true) {
            const res = await axiosInstance.post('/Payment/momo', {
               amount: totalAmount,
               redirectUrl: 'http://localhost:3000/user/purchase',
            });

            await axiosInstance.post('/Order/create', requestData);

            window.open(
               res?.data?.metadata?.payUrl,
               '_self',
               'noopener,noreferrer',
            );
         } else {
            await axiosInstance.post('/Order/create', requestData);
         }

         if (carts.length === data.length) {
            setCarts([]);
            localStorage.setItem('carts', JSON.stringify([]));
         } else {
            const newCart = carts.filter(
               (item) => !item.id.includes(productIds),
            );
            setCarts(newCart);
            localStorage.setItem('carts', JSON.stringify(newCart));
         }
         setLoading(false);
         message.success('Đặt hàng thành công');
         navigate("/");
         onClose();
      } catch (error) {
         console.log(error);
         setLoading(false);
         message.error('Đã có lỗi');
      }
   };

   return (
      <div className="invoice-container">
         <div className="invoice-container-children">
            <Form
               layout="vertical"
               className="invoice-form-container"
               onFinish={handleSubmit}
            >
               <div className="formitem-100-w">
                  <h2 className="title-detail-cart-invoice">
                     Chi tiết đơn hàng
                  </h2>
                  <div className="form-item-invoice-container">
                     <Form.Item
                        name="payment"
                        label="Phương thức thanh toán"
                        rules={[
                           {
                              required: true,
                              message: 'Vui lòng chọn phương thức thanh toán!',
                           },
                        ]}
                     >
                        <Radio.Group>
                           <Space direction="vertical">
                              <Radio value={false}>
                                 Thanh toán khi nhận hàng
                              </Radio>
                              <Radio value={true}>Thanh toán momo</Radio>
                           </Space>
                        </Radio.Group>
                     </Form.Item>

                     <Form.Item
                        name="address"
                        label="Địa chỉ"
                        rules={[
                           {
                              required: true,
                              message: 'Vui lòng nhập địa chỉ!',
                           },
                        ]}
                        hasFeedback
                     >
                        <Input className="formitem-100-w" />
                     </Form.Item>
                     <Form.Item
                        name="phone"
                        label="Số điện thoại"
                        rules={[
                           {
                              required: true,
                              message: 'Vui lòng nhập số điện thoại!',
                           },
                        ]}
                        hasFeedback
                     >
                        <Input className="formitem-100-w" />
                     </Form.Item>
                  </div>

                  {/* TABLE */}
                  <h3 className="title-listproduct-invoice">Danh sách sản phẩm</h3>
                  <div className="table-invoice-listproduct">
                     <table className="table-list-product">
                        <thead>
                           <tr>
                              <th className="titletable-listproduct-invoice">Tên sản phẩm</th>
                              <th className="titletable-listproduct-invoice">
                                 Đơn giá
                              </th>
                              <th className="titletable-listproduct-invoice quantity-list-product">
                                 Số lượng
                              </th>
                              <th className="titletable-listproduct-invoice">
                                 Thành tiền
                              </th>
                           </tr>
                        </thead>
                        <tbody className="textbody-listproduct">
                           {data.map((item) => (
                              <tr key={item?.id}>
                                 <td className="itemproduct-invoice">
                                    {item?.name}
                                 </td>
                                 <td className="itemproduct-invoice-2">
                                    {formatPrice(item?.price)}
                                 </td>
                                 <td className="itemproduct-invoice-2 quantity-list-product">
                                    {item?.count}
                                 </td>
                                 <td className="itemproduct-invoice-2">
                                    {formatPrice(item?.price * item?.count)}
                                 </td>
                              </tr>
                           ))}
                           <tr>
                              <td className="totalprice-title-invoice">
                                 Tổng tiền
                              </td>
                              <td className="totalprice-empty"></td>
                              <td className="totalprice-empty"></td>
                              <td className="totalprice-invoice-cart">
                                 {formatPrice(totalPrice(data) * 1.1)}
                              </td>
                           </tr>
                        </tbody>
                     </table>
                  </div>

                  {/* TABLE */}
                  <div className="dateorderbuyproduct">
                     <div className="dateorderbuy-invoice">
                        <h3 className="title-date-order">Ngày đặt hàng</h3>
                        <div>
                           Ngày {currentDate.getDate()} tháng{' '}
                           {currentDate.getMonth() + 1} năm{' '}
                           {currentDate.getFullYear()}
                        </div>
                     </div>
                  </div>
               </div>

               <div className="button-orderproduct">
                  <Button
                     loading={loading}
                     htmlType="submit"
                     type="primary"
                     danger
                     className="button-order-product-invoice"
                  >
                     Đặt hàng
                  </Button>
               </div>
            </Form>
         </div>
      </div>
   );
};

export default Invoice;
