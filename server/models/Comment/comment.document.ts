import { Document } from 'mongoose';

export default interface CommentDocument extends Document {
  writer: String,
  postId: String,
  responseTo: String,
  content: String,
};
