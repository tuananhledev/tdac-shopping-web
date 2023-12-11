import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import CategoryItem from '../components/Category/CategoryItem'
import { AppContext } from '../context/AppProvider'

const ProfileLayout = () => {
    const { auth } = useContext(AppContext)
    if (!auth) {
        return <Navigate to='/' replace />
    }
    return (
        <div className="profilelayout-container">
            <section className='container '>
                <div className='profile-layout-children'>
                    <div className='category-profile-layout'>
                        <h3 className='title-category'>Danh mục</h3>
                        <ul>
                            <CategoryItem
                                to='/user/purchase'

                                src='https://salt.tikicdn.com/ts/upload/41/28/7d/4713aa0d2855c5c770799f248692f0c5.png'
                            >
                                Quản lý đơn hàng
                            </CategoryItem>
                        </ul>
                    </div >

                    <div className='page-profilelayout'>
                        <Outlet />
                    </div>
                </div>
            </section>
        </div>

    )
}

export default ProfileLayout