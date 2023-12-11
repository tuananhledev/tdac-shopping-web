import React, { useContext, useState } from 'react'
import { Divider, Form, Rate, Input, Button, message } from 'antd'
import formatPrice from '../../utils/formatPrice';
import axiosInstance from '../../axios/axiosClient';
import { AppContext } from '../../context/AppProvider';

const desc = ['Rất tệ', 'Tệ', 'Bình thường', 'Tốt', 'Tuyệt vời'];

const CommentModal = ({ data, onClose = () => { } }) => {
   const { auth } = useContext(AppContext);
   const [value, setValue] = useState(3);
   const [loading, setLoading] = useState(false)

   const handleSubmit = async ({ content }) => {
      try {
         setLoading(true)
         await axiosInstance.post('/Evaluate/create', {
            productPortfolioId: data?.productId,
            userId: auth?.id,
            content: content,
            star: value
         })
         message.success('Đánh giá sản phẩm thành công');
         setLoading(false)
         onClose();
      } catch (error) {
         message.error('Đã có lỗi')
         setLoading(false)
      }
   }

   return (
      <div className='commentmodal-container'>
         <div className='commentmodal-children'>
            <div className='comment-modal-content'>
               <h2 className='title-rating'>Đánh giá sản phẩm</h2>
               <div className='item-product-mt'>
                  <div className='infor-product-modal'>
                     <div className='image-product-commentmodal'>
                        <img
                           src={data?.productImage}
                           alt=''
                        />
                     </div>
                     <div className='name-price-product-commentmodal'>
                        <p className='name-commentmodal-product'>{data?.productName}</p>
                        <h4 className='price-commentmodal-product'>Giá: {formatPrice(data?.price)}</h4>
                     </div>
                  </div>
                  <Divider className='divider-commentmodal' />
                  <Form layout='vertical' onFinish={handleSubmit}>
                     <Form.Item label="Chất lượng sản phẩm" className='formitem-quanlity' required>
                        <div className='rating-star-commentmodal'>
                           <Rate allowClear={false} tooltips={desc} onChange={setValue} value={value} />
                           {value ? <span className="title-rating-commentmodal">{desc[value - 1]}</span> : ''}
                        </div>
                     </Form.Item>
                     <Form.Item
                        label='Bình luận'
                        name='content'
                        rules={[{
                           required: true,
                           message: 'Vui lòng nhập nội dung đánh giá!'
                        }]}
                     >
                        <Input.TextArea rows={4} placeholder="maxLength is 6" />
                     </Form.Item>
                     <Form.Item className='button-end-commentmodal'>
                        <Button loading={loading} htmlType='submit' type="primary" danger>Hoàn thành</Button>
                     </Form.Item>
                  </Form>
               </div>
            </div>
         </div>
      </div >
   )
}

export default CommentModal