import React from 'react'
import { Layout } from 'antd'
import { BiLogoFacebook, BiLogoLinkedin } from 'react-icons/bi';
import { TfiYoutube } from 'react-icons/tfi';
import { Link } from 'react-router-dom';
import { IoLocation } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
const { Footer } = Layout;

const AppFooter = () => {
    return (
        <Footer className='footer-container'>
            <div className="container">
                <div className="row">
                    <div className='col-md-4 mb-3'>
                        <p className='logo-footer'>
                            <img src='/images/logo.png' alt='' />
                        </p>
                        <p>
                            Chúng tôi cung cấp các sản phẩm chất lượng uy tín và giao hàng nhanh chóng.
                        </p>
                        <div className='social-footer'>
                            <span className="social-title">
                                Theo dõi chúng tôi tại:
                            </span>
                            <div>
                                <BiLogoFacebook className="social-icon" />
                                <BiLogoLinkedin className="social-icon" />
                                <TfiYoutube className="social-icon" />
                            </div>
                        </div>
                    </div>
                    <div className='col-md-2 mb-3'>
                        <span className="link-title">VỀ TDAC</span>
                        <div className="link-list">
                            <Link to="/">Giới thiệu về TDAC</Link>
                            <Link to="/">Tuyển dụng</Link>
                            <Link to="/">Điều khoản</Link>
                        </div>
                    </div>
                    <div className='col-md-3 mb-3'>
                        <div className="mb-3">
                            <span className="link-title">CHÍNH SÁCH</span>
                            <div className="link-list">
                                <Link to="/">Chính Sách Bảo Hành</Link>
                                <Link to="/">Chính Sách Thanh Toán</Link>
                                <Link to="/">Chính Sách Giao Hàng</Link>
                            </div>
                        </div>
                        <div>
                            <span className="link-title">Chăm sóc khách hàng</span>
                            <div className="link-list">
                                <Link to="/">Trung Tâm Trợ Giúp</Link>
                                <Link to="/">Trả Hàng & Hoàn Tiền</Link>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3 mb-3'>
                        <span className="link-title">Liên hệ với chúng tôi</span>
                        <div className="link-list contact">
                            <Link to="/" className="contact-link">
                                <IoLocation className="contact-icon" />
                                140 Lê Trọng Tấn, Tân Phú, TP. HCM
                            </Link>
                            <Link to="/" className="contact-link">
                                <MdEmail className="contact-icon" />
                                tdacshopping@gmail.com
                            </Link>
                            <Link to="/" className="contact-link">
                                <FaPhone className="contact-icon" />
                                090909090
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Footer>
    )
}

export default AppFooter