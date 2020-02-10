import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Row, Col, Typography } from 'antd';
import SidePost from '../components/SidePost/SidePost';
import GridCard from '../components/GridCard/GridCard';
import { POST_SERVER } from '../components/Config';
const { Title } = Typography;

function PostListPage() {

  const [posts, setPosts]: any = useState([]);
  

  useEffect(() => {
    axios.get(`${POST_SERVER}/`)
      .then(response => {
        if(response.data.success) {
          setPosts(response.data.posts)
        }
      })
  }, [])

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto'}}>
      <Row>
      <Col lg={7} xs={24}>
          <div style={{padding: '3rem 2rem 0 0'}}>
            <SidePost />
          </div>
        </Col>
        <Col lg={17} xs={24}>
          <div className="postPage" style={{ width: '100%', marginTop: '3rem'}}>
            <Title style={{ color: 'white' }} level={3}>최신 포스트</Title>
            <br />
            <br />
            <Row gutter={[16, 16]}>
            {posts && posts.map((post: any, index: any) => (
                  <GridCard
                    post={post}
                    key={index}
                  />
            ))}
            </Row>
          </div>
        </Col>
        
      </Row>
    </div>
  )
}

export default PostListPage;
