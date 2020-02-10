import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Row, Col, Typography, Button } from 'antd';
import SidePost from '../components/SidePost/SidePost';
import GridCard from '../components/GridCard/GridCard';
import { POST_SERVER } from '../components/Config';
const { Title } = Typography;

function PostListPage() {

  const [posts, setPosts]: any = useState([]);
  const [CurrentPage, setCurrentPage]: any = useState(0);

  useEffect(() => {
    const endPoint = `${POST_SERVER}?page=1`
    fetchPosts(endPoint);
  }, [])

  const fetchPosts = (endPoint: string) => {
    axios.get(endPoint)
    .then(response => {
      if(response.data.success) {
        setPosts([...posts, ...response.data.posts])
        setCurrentPage(response.data.page)
      }
    })
  }

  const loadMoreItems = () => {
    const endPoint = `${POST_SERVER}?page=${CurrentPage + 1}`

    fetchPosts(endPoint);
  }

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
            <br />
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem'}} >
              <Button 
                onClick={loadMoreItems}
                type='default'
                style={{
                  backgroundColor: '#1A191F',
                  color: 'white'
                }}
              >
                더보기
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default PostListPage;
