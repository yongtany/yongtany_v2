import mongoose, { Model, Schema } from "mongoose";
import CommentDocument from './comment.document';


export interface CommentModel extends Model<CommentDocument> {

}

const commentSchema = new Schema({
  writer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  responseTo: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  content: {
    type: String
  }
}, { timestamps: true })

export const Comment: CommentModel = mongoose.model<CommentDocument, CommentModel>("Comment", commentSchema);
