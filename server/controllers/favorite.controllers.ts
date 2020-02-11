import { Request, Response } from 'express';
import HTTPStatus from 'http-status';

import { Favorite } from '../models/Favorite/favorite.model';

export function addToFavorite(req: Request, res: Response) {
  const favorite = new Favorite(req.body)

  favorite.save((err: Error, doc) => {
    if(err) return res.json({ success: false })
    return res.status(HTTPStatus.OK).json({ success: true });
  })  
}

export function removeFromFavorite(req: Request, res: Response) {
  Favorite.findOneAndDelete({ postId: req.body.postId, userFrom: req.body.userFrom })
    .exec((err: Error, doc) => {
      if(err) return res.status(HTTPStatus.BAD_REQUEST).json({ sccess: false, err });
      res.status(HTTPStatus.OK).json({ success: true, doc })
    })
}


export function favorited(req: Request, res: Response) {
  Favorite.find({'postId': req.body.postId, 'userFrom': req.body.userFrom })
    .exec(( err: Error, favorite: any) => {
      if(err) return res.status(HTTPStatus.BAD_REQUEST).send(err);

      let result = false;
      if(favorite.length !== 0) {
        result = true;
      }

      res.status(HTTPStatus.OK).json({
        success: true,
        favorited: result
      });
    })
}

export function favoriteNumber(req: Request, res: Response) {
  Favorite.find({'postId': req.body.postId })
    .exec(( err: Error, favorite: any ) => {
      if(err) return res.status(HTTPStatus.BAD_REQUEST).send(err)
      res.status(HTTPStatus.OK).json({
        success: true,
        favoriteNumber: favorite.length
      })
    })
}