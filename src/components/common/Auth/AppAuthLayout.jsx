import React from "react";
import { Col, Row, Space } from "antd";
import { Link } from "react-router-dom";

const AppAuthLayout = ({ children, type = "login" }) => {
    return (
        <div className="container layout-auth-container">
            <Row justify="center">
                <Col span={16} lg={16} md={24} xs={24}>
                    <div className="auth-container">
                        <div className="auth-image">
                            <img src="/images/auth.png" alt="" />
                        </div>
                        <div className="auth-content">
                            <div className="auth-content-user">
                                <img src="/images/user.png" alt="" />
                            </div>
                            <Space direction="vertical" size="middle">
                                <h2>{type === "login" ? "Đăng nhập" : "Đăng ký"}</h2>
                                <>{children}</>
                                {type === "login" ? (
                                    <p>
                                        {`Bạn chưa có tài khoản?`} <Link to="/register">Đăng ký</Link>
                                    </p>
                                ) : (
                                    <p>
                                        {`Bạn đã có tài khoản?`} <Link to="/login">Đăng nhập</Link>
                                    </p>
                                )}
                            </Space>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default AppAuthLayout;
