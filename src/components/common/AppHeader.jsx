import React, { useContext, useState } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { AppContext } from '../../context/AppProvider';
import { AiFillHome } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { Layout, Menu, Dropdown, Input } from 'antd';
import { GiHamburgerMenu } from 'react-icons/gi';
import { ButtonCart } from './Button'

const { Header } = Layout;

const AppHeader = ({ onToggleSidebar }) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const { auth, logout, carts } = useContext(AppContext);
    const [toggleMenu, setToggleMenu] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        searchQuery && navigate(`/search?query=${searchQuery}`);
    };

    const accountMenu = (
        <Menu>
            {auth ? (
                <>
                    <Menu.Item key="1" onClick={() => { navigate('/user/purchase'); }}>
                        Đơn hàng của tôi
                    </Menu.Item>
                    <Menu.Item key="2" onClick={() => { logout(); navigate('/'); }}>
                        Đăng xuất
                    </Menu.Item>
                </>
            ) : (
                <Menu.Item key="3">
                    <Link to="/login" onClick={() => setToggleMenu(false)}>
                        Đăng nhập
                    </Link>
                </Menu.Item>
            )}
        </Menu>
    );

    return (
        <Header className="header-container">
            <div className="container header-layout">
                {/*Logo Header */}
                <Link to="/" className="logo-header">
                    <img src="/images/logo.png" alt="" />
                </Link>
                {/*SearchBar */}
                <div className="searchbar-header">
                    <form onSubmit={handleSubmit}>
                        <Input.Search
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            type="text"
                            placeholder="Tìm kiếm sản phẩm"
                            className="search-bar"
                        />
                    </form>
                </div>
                {/*Button Home and User */}
                <div className="button-header">
                    <NavLink to="/" className="nav-item">
                        <AiFillHome />
                        Trang chủ
                    </NavLink>
                    <Dropdown overlay={accountMenu} placement="bottomRight" arrow>
                        <NavLink className="nav-item" onClick={() => setToggleMenu(false)}>
                            <FaUserCircle />
                            {auth ? auth.name : 'Tài khoản'}
                        </NavLink>
                    </Dropdown>
                </div>
                {/*CartShopping*/}
                <div className="cart-header">
                    <ButtonCart count={carts?.length || 0} />
                </div>



                {/*IconReponsiveHeader*/}
                <div className="icon-menu-header">
                    <button className="btn" onClick={onToggleSidebar}>
                        <GiHamburgerMenu />
                    </button>
                </div>
            </div>
        </Header>
    );
};

export default AppHeader;
