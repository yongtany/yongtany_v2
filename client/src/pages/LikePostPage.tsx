import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Row, Col, Typography, Button, Spin } from 'antd';
import SidePost from '../components/SidePost/SidePost';
import GridCard from '../components/GridCard/GridCard';
import { FAVORITE_SERVER } from '../components/Config';

const { Title } = Typography;

function LikePostPage() {

  const [likes, setLikes]: any = useState([]);
  console.log(likes);
  

  useEffect(() => {
    axios.get(`${FAVORITE_SERVER}/getFavoritedMovies`)
      .then(response => {
        if(response.data.success) {
          setLikes(response.data.favorites)
        }
      })
  }, [])

  if(likes) {
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
              <Title style={{ color: 'white' }} level={3}>좋아한 포스트</Title>
              <br />
              <br />
              <Row gutter={[16, 16]}>
                {likes && likes.map((post: any, index: any) => (
                      <GridCard
                        likes={post}
                        num={index}
                        key={index}
                      />
                ))}
              </Row>
              <br />
              
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

export default LikePostPage;
