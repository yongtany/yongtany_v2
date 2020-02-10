import React from 'react'
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Card, Typography, Col, Icon, Avatar } from 'antd';
const { Text} = Typography;
const { Meta } = Card;

function GridCard(props: any) {
  dayjs.extend(relativeTime);
    return (
      <Col lg={8} md={12} xs={24}>
          <Link to={`/post/${props.post._id}`}>
            <Card 
              bordered={false}
              hoverable
              style={{ backgroundColor: '#1A191F', marginBottom: '2rem', width: '100%'}}
              cover={
                <div>
                  <img
                    style={{width: '100%', height: '250px'}}
                    alt="example"
                    src={`${props.post.thumbnail}`}
                  />
                  <div style={{padding: '1rem 1rem 0 1rem'}}>
                    <Avatar src={props.post.writer.image} /> 
                    <Text strong style={{ color: 'white', fontSize: '0.7rem', marginLeft: '0.3rem'}}>{props.post.writer.username}</Text>
                  </div>
                </div>
            }
            >
            <Meta
              title={<Text style={{ color: 'white'}}>{props.post.title}</Text>}
              description={
                <div>
                  <Text style={{ color: 'white', opacity: '50%'}}>{dayjs(props.post.createdAt).fromNow()}</Text>
                  <Text style={{ color: 'white', float: 'right'}}><Icon type="like" key="like" /> 27 Likes </Text>
                </div>
              }
              />
            </Card>
          </Link>
        </Col>
    )
}

export default GridCard
