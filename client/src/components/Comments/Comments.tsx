import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Typography, Input, Button } from 'antd';
import { COMMENT_SERVER } from '../Config';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';

const { Text } = Typography
const { TextArea } = Input;

function Comments(props: any) {
  const [ Comment, setComment ]: any = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.currentTarget.value)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const variables = {
      content: Comment,
      writer: window.localStorage.getItem('userId'),
      postId: props.postId
    }

    axios.post(`${COMMENT_SERVER}/saveComment`, variables)
      .then(response => {
        if(response.data.success) {
          setComment("");
          props.refreshFunction(response.data.result)
        } else {
          alert('Please sign in first')
        }
      })
  }

  return (
    <div>
      <Text style={{ color: 'white'}} strong> replies</Text>
      <hr />

      {/* Comment Listss */}
      {props.CommentLists && props.CommentLists.map((comment:any, index: any) => (

      (!comment.responseTo &&
        <Fragment key={index}>
          <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
          <ReplyComment CommentLists={props.CommentLists} movieId={props.movieId} parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
        </Fragment>
      )
      ))}

      {/* Root Comment Form */}
      <form style={{ display: 'flex '}} onSubmit={handleSubmit}>
        <TextArea
          style={{ width: '100%', borderRadius: '5px '}}
          placeholder="write some comments"
          value={Comment}
          onChange={handleChange}
        />
        <Button style={{ width: '20%', height: '52px' }} onClick={handleSubmit}>Submit</Button>
      </form>
    </div>
  )
}

export default Comments;
