import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppProvider';
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

const Quantity = ({ record }) => {
    const { carts, setCarts } = useContext(AppContext)

    const [quantityRow, setQuantityRow] = useState(record?.count || 1)
    const handleChange = (e) => {
        const value = e.target.value;

        // Kiểm tra xem giá trị nhập vào có phải là số nguyên không
        if (/^\d*$/.test(value)) {
            // Nếu là số nguyên, cập nhật state
            setQuantityRow(value);
            const newCarts = carts.map(item => {
                if (record.id === item.id) {
                    return { ...item, count: value };
                }
                return item;
            });

            setCarts(newCarts)
            localStorage.setItem('carts', JSON.stringify(newCarts))
        }
    }

    const handleChangeInput = (type) => {
        if (type === -1) {
            const newCart = carts.map(item => {
                if (record.id === item.id) {
                    return { ...item, count: +quantityRow - 1 };
                }
                return item;
            });

            setCarts(newCart)
            localStorage.setItem('carts', JSON.stringify(newCart))

            quantityRow > 1 && setQuantityRow(+quantityRow - 1)
        }
        else if (type === 1) {
            const newCart = carts.map(item => {
                if (record.id === item.id) {
                    return { ...item, count: +quantityRow + 1 };
                }
                return item;
            });

            setCarts(newCart)
            localStorage.setItem('carts', JSON.stringify(newCart))

            quantityRow < record.quantity && setQuantityRow(+quantityRow + 1)
        }
    }

    return (
        <div className='cartpage-center'>
            <button
                disabled={quantityRow <= 1}
                onClick={() => handleChangeInput(-1)}
                className='icon-cartpage'
            >
                <FaMinus />
            </button>

            <input
                value={quantityRow}
                onChange={handleChange}
                type="text"
                className='input-cartpage-quantity'
            />
            <button
                disabled={quantityRow >= record.quantity}
                onClick={() => handleChangeInput(1)}
                className='icon-cartpage'
            >
                <FaPlus />
            </button>
        </div>
    )
}
export default Quantity