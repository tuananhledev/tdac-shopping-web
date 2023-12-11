import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { BsFillCartFill } from 'react-icons/bs';

const Button = ({ children, primary = false, onClick = () => { }, className }) => {
    return (
        <button
            onClick={onClick}
            className={cx('button', { 'primary': primary, 'secondary': !primary }, className)}
        >
            {children}
        </button>
    );
};

export default Button;

export const ButtonLink = ({ children, to, leftIcon = null, active = false, onClick = () => { } }) => {
    let Comp = 'div';
    const props = {
        onClick,
    };
    if (to) {
        Comp = Link;
        props.to = to;
    }

    return (
        <Comp
            {...props}
            onClick={onClick}
            className={cx('button-link', { 'active': active })}
        >
            {leftIcon}
            <span >{children}</span>
        </Comp>
    );
};

export const ButtonCart = ({ count }) => {
    return (
        <Link to={'/cart'} className="button-cart"  >
            <BsFillCartFill className='cart-icon' />
            <span className='cart-count'>
                {count}
            </span>
        </Link>
    );
};
