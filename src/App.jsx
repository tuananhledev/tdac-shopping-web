import React, { useState } from 'react'

import { Route, Routes } from 'react-router-dom';
import { Layout } from 'antd'
import AppHeader from './components/common/AppHeader'
import AppFooter from './components/common/AppFooter'
import SidebarMobile from './components/sidebarmenu/SidebarMobile'
import HomeLayout from './layout/HomeLayout'
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import NotFoundPage from './pages/NotFoundPage';
import Login from './components/common/Auth/Login'
import Register from './components/common/Auth/Register';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import ProfileLayout from './layout/ProfileLayout'
import PurchasePage from './pages/PurchasePage'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './styles/index.css';




const App = () => {
    const [isShow, setIsShow] = useState(false);
    return (
        <Layout className='layout'>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <AppHeader onToggleSidebar={() => setIsShow(!isShow)} />
            <SidebarMobile isShow={isShow} onToggleSidebar={() => setIsShow(!isShow)} />
            <Routes>
                <Route path='/' element={<HomeLayout />} >
                    <Route path='/' element={<HomePage />} />
                    <Route path='/search' element={<SearchPage />} />
                </Route>
                <Route path='/products/:id' element={<ProductDetailPage />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/cart' element={<CartPage />} />
                <Route path='/' element={<ProfileLayout />}>
                    <Route path='/user/purchase' element={<PurchasePage />} />
                </Route>
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
            <AppFooter />
        </Layout>
    )
}
export default App