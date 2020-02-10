import { Request, Response } from 'express';
import HTTPStatus from 'http-status';

import { Comment } from '../models/Comment/comment.model';

export async function saveComment (req: Request, res: Response) {
  const comment = new Comment(req.body)

  await comment.save((err: Error, comment ) => {
    if(err) return res.status(HTTPStatus.BAD_REQUEST).json({ success: false, err})

    Comment.find({ '_id': comment._id })
    .populate('writer')
    .exec((err: Error, result: any) => {
      if(err) return res.json({ success: false, err});
      return res.status(200).json({ success: true, result });
    })
  })
}

export async function getComments(req: Request, res: Response) {
  await Comment.find({ "postId": req.params.id })
    .populate("writer")
    .exec((err: Error, comments: any) => {
      if(err) return res.status(HTTPStatus.BAD_REQUEST).send(err);
      res.status(HTTPStatus.OK).json({
        success: true,
        comments
      })
    })
}

