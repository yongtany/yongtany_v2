import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Row, Col, Typography, Icon } from 'antd';
import { access_token } from '../PrivateConfig';

const { Title } = Typography;

function InstaFeed() {

  const [instaFeeds, setInstaFeeds]: any = useState([]);

  useEffect(() => {
    axios.get(`https://graph.instagram.com/me/media?fields=id,media_url&access_token=${access_token}`)
      .then(response => {
        setInstaFeeds(response.data.data)
        console.log(response.data.data);
      })
  }, [])

  return (
            <Row style={{ padding: '0.5rem'}}>
              <Title style={{ color: 'white '}}level={4}>
                <Icon style={{ color: '#1990FF'}}type="instagram" /> 인스타 피드
              </Title>
              {instaFeeds && instaFeeds.map((feed: any, index: any) => (
                  <Col lg={8} xs={24} key={index}>
                    <img
                      style={{ width: '100px', height: '100px'}} 
                      src={feed.media_url} alt={feed.id} 
                    />
                  </Col>
              ))}
            </Row>
  )
}

export default InstaFeed;
