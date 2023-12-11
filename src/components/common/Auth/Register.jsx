import React, { useState } from "react";
import AppAuthLayout from "../Auth/AppAuthLayout";
import { Button, Form, Input } from "antd";
import { toast } from "react-toastify";
import axiosInstance from "../../../axios/axiosClient";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async ({ name, email, username, password }) => {
        try {
            setLoading(true)
            await axiosInstance.post('/User/register', {
                name, email, username, password
            })
            toast.success('Đăng ký thành công!')
            setLoading(false)
            navigate("/login", { replace: true });
        } catch (error) {
            toast.error('Đã có lỗi!')
            setLoading(false)
            console.log({ error });
        }
    }

    return (
        <AppAuthLayout type="register">
            <Form className="auth-form" layout='vertical' onFinish={handleSubmit}>
                <Form.Item
                    name='name'
                    label="Họ tên"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập họ tên!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name='email'
                    label="Email"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập email!',
                        },
                        {
                            type: 'email',
                            message: 'Vui lòng nhập đúng email!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
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
                <Form.Item
                    name='confirm'
                    label="Nhâp lại mật khẩu"
                    dependencies={['password']}
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập lại mật khẩu!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Nhập lại mật khẩu không đúng!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button className="form-submit" htmlType="submit" block loading={loading}>
                        Đăng ký
                    </Button>
                </Form.Item>
            </Form>
        </AppAuthLayout>
    );
};

export default Register;
