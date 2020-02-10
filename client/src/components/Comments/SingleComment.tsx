import React, { useState } from 'react'
import axios from 'axios';
import { COMMENT_SERVER } from '../Config';
import { Comment, Avatar, Button, Input } from 'antd';
const { TextArea } = Input;


function SingleComment(props: any) {
  const [CommentValue, setCommentValue]: any = useState("");
  const [OpenReply, setOpenReply]: any = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentValue(e.currentTarget.value)
  }

  const openReply = () => {
    setOpenReply(!OpenReply);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const variables = {
      writer: window.localStorage.getItem('userId'),
      postId: props.postId,
      responseTo: props.comment._id,
      content: CommentValue
    }

    axios.post(`${COMMENT_SERVER}/saveComment`, variables)
        .then(response => {
            if (response.data.success) {
                setCommentValue("")
                setOpenReply(!OpenReply)
                props.refreshFunction(response.data.result)
            } else {
                alert('Failed to save Comment')
            }
        })
  }

  const actions = [<span style={{ color: 'white'}} onClick={openReply} key="comment-basic-reply-to">답변하기</span>,]

  return (
    <div>
      <Comment
        actions={actions}
        author={<p style={{ fontSize: '1rem', color: 'white'}}>{props.comment.writer.name}</p>}
        avatar={
          <Avatar
            src={props.comment.writer.image}
            alt="image"
          />
        }
        content={
          <p>
            {props.comment.content}
          </p>
        }
      ></Comment>
      {OpenReply &&
        <form style={{ display: 'flex '}} onSubmit={handleSubmit}>
          <TextArea
            style={{ width: '100%', borderRadius: '5px '}}
            placeholder="write some comments"
            value={CommentValue}
            onChange={handleChange}
          />
          <Button style={{ width: '20%', height: '52px' }} onClick={handleSubmit}>Submit</Button>
        </form>
      }
    </div>
  )
}

export default SingleComment
