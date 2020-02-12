import React, { useState, useEffect } from 'react'
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Avatar, Row, Col, Typography, Spin } from 'antd';
import SidePost from '../components/SidePost/SidePost';
import Comments from '../components/Comments/Comments';
import Favorite from '../components/Favorite/Favorite'
import { POST_SERVER, COMMENT_SERVER } from '../components/Config';

const { Title, Text } = Typography

function PostDetailPage(props: any) {
  dayjs.extend(relativeTime);
  window.scroll(0, 0);
  const postId = props.match.params.postId;
  const [post, setPost]: any = useState([]);
  const [CommentLists, setCommentLists ]: any = useState([]);
  
  useEffect(() => {
    axios.get(`${POST_SERVER}/${postId}`)
      .then(response => {
        if(response.data.success) {
          setPost(response.data.post)
        } else {
          alert('Couldnt get post')
        }
      })

    axios.get(`${COMMENT_SERVER}/${postId}/getComments`)
      .then(response => {
        if (response.data.success) {
          setCommentLists(response.data.comments)
        } else {
          alert('Failed to get comments Info')
      }
    })
  }, [postId])

  const updateComment = (newComment: any) => {
    setCommentLists(CommentLists.concat(newComment));
  }

  if (post.writer) {
    return (
        <>
          <div style={{ maxWidth: '1200px', margin: '0 auto'}}>
            <Row>
              <Col lg={17} xs={24}>
                <div className="postPage" style={{ color: 'white', width: '100%', margin: '3rem 0 3rem 0', padding: '3rem'}}>
                  <Title style={{ color: 'white'}} level={3}>{post.title}</Title>
                  <img style={{ width: '100%', maxHeight: '400px', marginBottom: '1rem' }} src={post.thumbnail} alt={post.title} />
                  <Avatar src={post.writer.image} /> 
                  <Text strong style={{ color: 'white', fontSize: '1rem', marginLeft: '0.3rem'}}>{post.writer.username}</Text>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Text style={{ color: 'white', opacity: '70%'}}>{dayjs(post.createdAt).fromNow()}</Text>
                  </div>
                  
                  <br />
                  
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Favorite
                      userFrom={localStorage.getItem('userId')}
                      postId={postId}
                      postInfo={post}
                    />
                  </div>

                  <div 
                    className="post-content"
                    style={{ marginTop: '3rem'}}
                    dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>
                <div style={{ padding: '0 3rem 3rem 3rem'}}>
                  <Comments
                    CommentLists={CommentLists}
                    postId={postId}
                    refreshFunction={updateComment}
                  />
                </div>
              </Col>
              <Col lg={7} xs={24}>
                <div style={{padding: '3rem 1rem'}}>
                  <SidePost />
                </div>
              </Col>
            </Row>
          </div>
        </>
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

export default PostDetailPage;
