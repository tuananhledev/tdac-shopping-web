import { Avatar, List, Rate } from 'antd'
import React from 'react'

const Comment = ({ data = [] }) => {

    return (
        <List
            itemLayout="horizontal"
            dataSource={data}
            locale={{ emptyText: 'Chưa có đánh giá' }}
            renderItem={(item, index) => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar src={item?.imageUser} />}
                        title={<div className='title-comment'>
                            <div>{item?.username}</div>
                            <span className='date-comment'>{(new Date(item?.createDate)).toLocaleDateString('en-US')}</span>

                        </div>}
                        description={
                            <div>
                                <Rate disabled value={item?.star} className='star-comment' />
                                <p>{item.content}</p>
                            </div>
                        }
                    />
                </List.Item>
            )}
        />
    )
}

export default Comment