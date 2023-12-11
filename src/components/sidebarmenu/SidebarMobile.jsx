
import React, { useEffect, useState, useContext } from 'react';
import { CgClose } from 'react-icons/cg';
import SidebarLink from './SidebarLink';
import Search from 'antd/es/input/Search';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppProvider';
import { AiFillHome } from 'react-icons/ai'
import { FaUserCircle } from 'react-icons/fa'
import { message } from 'antd'
import axiosInstance from '../../axios/axiosClient';


const SidebarMobile = ({ isShow, onToggleSidebar }) => {
   const navigate = useNavigate();
   const [categories, setCategories] = useState([]);
   const [searchQuery, setSearchQuery] = useState('');
   const { auth, logout } = useContext(AppContext)

   useEffect(() => {
      const fetchCategories = async () => {
         try {
            const res = await axiosInstance.get('/Category/get-all');
            setCategories(res?.data?.metadata);
         } catch (error) {
            console.log(error);
         }
      };
      fetchCategories();
   }, []);

   const handleSubmit = e => {
      e.preventDefault();
      searchQuery && navigate(`/search?query=${searchQuery}`)
   }


   return (
      <div
         onClick={onToggleSidebar}
         className={`sidebar-mobile d-block d-md-none ${isShow && 'sidebar-mobile-active'
            }`}
         style={{ overflow: 'hidden' }}
      >
         <div
            className="sidebar-content"
            style={{ overflow: 'auto' }}
            onClick={(e) => e.stopPropagation()}
         >
            <div className="sidebar-top">
               <Link to="/" className="sidebar-logo">
                  <img src="images/logo.png" alt="" />
               </Link>
               <div className="justify-content-center align-items-center" style={{ marginTop: '-24px' }}>
                  <div className="cart mt-3" counter={0}>
                     <AiOutlineShoppingCart />
                  </div>
               </div>
               <button
                  onClick={onToggleSidebar}
                  className="btn justify-content-center align-items-center"
                  style={{ width: '40px', height: '40px', padding: 0 }}
               >
                  <CgClose style={{ fontSize: 26 }} />
               </button>
            </div>

            <form onSubmit={handleSubmit}>
               <Search
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  type="text"
                  placeholder='Tìm kiếm sản phẩm'
               />
            </form>


            <ul className="sidebar-nav">
               <SidebarLink>Trang chủ</SidebarLink>
               <SidebarLink>
                  {auth ? (
                     <>
                        <SidebarLink
                           subChild={[
                              <SidebarLink to="/user/profile">Thông tin tài khoản</SidebarLink>,
                              <SidebarLink to="/user/purchase">Đơn hàng của tôi</SidebarLink>,
                              <SidebarLink onClick={() => {
                                 logout()
                                 navigate('/')
                              }}>Đăng xuất</SidebarLink>,
                           ]}
                        >
                           <AiFillHome />{auth ? auth.name : 'Tài khoản'}
                        </SidebarLink>
                     </>
                  ) : (
                     <>
                        <SidebarLink to="/login">
                           <FaUserCircle />Tài khoản
                        </SidebarLink>
                     </>
                  )}
               </SidebarLink>

               <SidebarLink
                  subChild={[
                     categories.map(item => (
                        <SidebarLink to={`/search?categoryName=${item?.id}`}
                           key={item?.id}>
                           {item?.name}
                        </SidebarLink>))
                  ]}
               >
                  DANH MỤC SẢN PHẨM
               </SidebarLink>
            </ul>

         </div>
      </div>
   );
};

export default SidebarMobile;
