import React from 'react'
import Button from '../common/Button'


const CartEmpty = () => {
   return (
      <div className='cart-empty-container'>
         <div className='cart-empty-image'>
            <img src="https://salt.tikicdn.com/desktop/img/mascot@2x.png" alt="" />
         </div>
         <p className='notfound-product-cart-empty-cart'>Không có sản phẩm nào trong giỏ hàng của bạn.</p>
         <Button className='continue-empty-cart'>Tiếp tục mua sắm</Button>
      </div>
   )
}

export default CartEmpty