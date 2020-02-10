import { Document } from 'mongoose';

export default interface PostDocument extends Document {
  writer: String,
  title: String,
  content: String,
  privacy: Number,
  filePath: String,
  category: String,
  views: Number,
  thumbnail: String,
};