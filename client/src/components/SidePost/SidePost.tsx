import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { Link  } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Avatar, Typography, Icon } from 'antd';
import { POST_SERVER } from '../Config';
const { Text, Title } = Typography;

function SidePost() {
    dayjs.extend(relativeTime);
    const [SidePosts, setSidePosts]: any = useState([])

    useEffect(() => {
        axios.get(`${POST_SERVER}/popular`)
            .then(response => {
                if (response.data.success) {
                    setSidePosts(response.data.posts)
                } else {
                    alert('Failed to get Posts')
                }
            })
    }, [])

    const SidePostItem = SidePosts.map(( post: any, index: number) => {
       return (
        <div style={{ display: 'flex', marginBottom: '3rem'}} key={index}>
          <Link to={`/post/${post._id}`}>
            <Avatar 
              src={post.thumbnail} 
              alt={post.title} 
              style={{
                width: '4rem',
                height: '4rem'
              }}
            />
          </Link>
          <div style={{ paddingLeft: '0.5rem' }}>
            <Text strong style={{ color: 'white'}}>{post.title}</Text>
            <br />
            <Text style={{ color: 'white', marginTop: '1rem', fontSize: '0.8rem',opacity: '60%'}}>{dayjs(post.createdAt).fromNow()}</Text>
          </div>
        </div>
      )
    })

    return (
        <div style={{ padding: '1rem', marginTop: '1rem'}}>  
          <Title level={3} style={{ color: 'white'}}>
            <Icon type="file-done" style={{ color: '#1990FF', padding: '0.5rem'}}/>
              인기 포스트
          </Title>
          {SidePostItem}
        </div>
    )
}

export default SidePost;