import React, { useContext, useState } from "react";
import { Button, Form, Input } from "antd";
import { toast } from "react-toastify";
import axiosInstance from "../../../axios/axiosClient";
import { AppContext } from '../../../context/AppProvider';
import { useNavigate } from "react-router-dom";
import AppAuthLayout from "./AppAuthLayout";

const Login = () => {
    const { setAuth } = useContext(AppContext)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const handleSubmit = async ({ username, password }) => {
        console.log(username, password);
        try {
            setLoading(true)
            const res = await axiosInstance.put('/User/login', {
                username, password
            })
            console.log(res);
            setAuth(res?.data?.metadata)
            localStorage.setItem('user', JSON.stringify(res?.data?.metadata))
            navigate('/');
            toast.success('Đăng nhập thành công');
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
            toast.error('Tài khoản hoặc mật khẩu không đúng')
        }
    }

    return (
        <AppAuthLayout >
            <Form className="auth-form" layout='vertical' onFinish={handleSubmit}>
                <Form.Item
                    name='username'
                    label="Tên đăng nhập"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên đăng nhập!',
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name='password'
                    label="Mật khẩu"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item shouldUpdate>
                    <Button className="form-submit" htmlType="submit" block loading={loading}>
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </AppAuthLayout>
    );
};

export default Login;
