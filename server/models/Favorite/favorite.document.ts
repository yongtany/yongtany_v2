import { Document } from 'mongoose';

export default interface FavoriteDocument extends Document {
  userFrom: String;
  writer: String;
  postId: String;
  title: String;
  thumbnail: String;
  createdAt: String
};
