import mongoose, { Model, Schema } from "mongoose";
import FavoriteDocument from './favorite.document';


export interface FavoriteModel extends Model<FavoriteDocument> {

}

const favoriteSchema = new Schema({
  userFrom: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  postId: {
    type: String
  },
  title: {
    type: String
  },
  thumbnail: {
    type: String
  },
  createdAt: {
    type: String
  }
})

export const Favorite: FavoriteModel = mongoose.model<FavoriteDocument, FavoriteModel>("Favorite", favoriteSchema);
