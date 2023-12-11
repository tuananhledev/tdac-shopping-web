import React from 'react';
import Category from '../components/Category/Category';
import { Outlet } from 'react-router-dom';
import { Col, Row } from 'antd';

const HomeLayout = () => {
    return (
        <div className='content-container'>
            <Row className='container home-layout-container'>
                {/**xs: đt, md: tablet */}
                <Col xs={24} sm={7} md={10} lg={7} xl={7}>
                    <Category />
                </Col>
                <Col xs={24} sm={17} md={14} lg={17} xl={17}>
                    <Outlet />
                </Col>
            </Row>
        </div>

    );
}

export default HomeLayout;
