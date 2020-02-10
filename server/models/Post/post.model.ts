import mongoose, { Schema } from "mongoose";
import PostDocument from './post.document';


const postSchema = new Schema({
  writer: {
    type:Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
      type:String,
      maxlength:50,
  },
  content: {
      type: String,
  },
  privacy: {
      type: Number,
  },
  filePath : {
      type: String,
  },
  category: {
    type: Number,
    default: 1
  },
  views : {
      type: Number,
      default: 0 
  },
  thumbnail: {
      type: String
  }
  }, { timestamps: true })


export const Post = mongoose.model<PostDocument>("Post", postSchema);