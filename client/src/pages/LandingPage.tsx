import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Row, Col, Typography, Button, Spin } from 'antd';
import SidePost from '../components/SidePost/SidePost';
import GridCard from '../components/GridCard/GridCard';
import { POST_SERVER } from '../components/Config';
// import InstaFeed from '../components/InstaFeed/InstaFeed';

const { Title } = Typography;

function LandingPage() {

  const [posts, setPosts]: any = useState([]);
  const [loading, setLoading]: any = useState(false);
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
    setLoading(true);
    const endPoint = `${POST_SERVER}?page=${CurrentPage + 1}`

    fetchPosts(endPoint);
    setLoading(false);
  }
  if(posts) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto'}}>
        <Row>
        <Col lg={7} xs={24}>
            <div style={{padding: '3rem 2rem 0 0'}}>
              <SidePost />
              {/* <InstaFeed /> */}
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
                        num={index}
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
              {loading ? <div style={{ textAlign: 'center', padding: '2rem 0'}}>
                <Spin
                size="large"
              />
              </div> 
              : null}
              <div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  } else {
    return (
      <div style={{ textAlign: 'center', padding: '10rem 0'}}>
          <Spin
          size="large"
        />
      </div>
  )
  }

  
}

export default LandingPage;
