import { Request, Response } from 'express';
import HTTPStatus from 'http-status';
import multer from 'multer';

import { Post } from '../models/Post/post.model';
const keys = require('../config/keys');

// Multer Storage
let storage = multer.diskStorage({
  // destination: (req, file, cb) => {
  //     cb(null, "uploads/");
  // },
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const fileFilter = (req: Request, file: any, cb: any) => {
  // reject a file
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'video/mp4') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploader = multer({ 
  storage: storage,
  limits : {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter 
}).single("file");

const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: 'djs4injum',
  api_key: keys.cloudClientID,
  api_secret: keys.cloudSecret
});

export function upload(req: Request, res: Response) {
  uploader(req, res, err => {
    cloudinary.uploader.upload(req.file.path, async function(result: any) {
      if (err) return res.json({ success: false, err });
      console.log(req.file.path);
      return res.json({ success: true, url: result.secure_url, fileName: req.file.filename }); 
    })
  });
}

export async function createPost(req: Request, res: Response) {
  const post = new Post(req.body);

  await post.save((err, postInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true, postInfo })
  })
}

export async function getPostById  (req: Request, res: Response){
  await Post.findOne({ "_id": req.params.id })
        .populate('writer')
        .exec((err, post: any) => {
            if (err) return res.status(HTTPStatus.BAD_REQUEST).send(err);
            post.views++;
            post.save((err: Error) => {
              if(err) {
                return res.status(HTTPStatus.BAD_REQUEST).send(err);
              }
            })
            res.status(200).json({ success: true, post })
        })
}

export async function getPostList (req: Request, res: Response) {
  // page가 주어지지 않았다면 1로 간주
  // query는 문자열 형태로 받아 오므로 숫자로 변환
  const page = parseInt(req.query.page || 1, 10);

  // 잘못된 페이지가 주어졌다면 에러
  if (page < 1) {
    return res.status(HTTPStatus.BAD_REQUEST).json()
  }

  await Post.find()
    .sort({ _id: -1 })
    .populate('writer')
    .limit(8)
    .skip((page - 1) * 8)
    .exec((err, posts) => {
      if(err) return res.status(HTTPStatus.BAD_REQUEST).send(err)
      res.status(HTTPStatus.OK).json({ success: true, posts, page })
    })
}

export async function getPopularPosts (req: Request, res: Response) {
  await Post.find()
    .sort({ views: -1 })
    .limit(5)
    .populate('writer')
    .exec((err, posts) => {
      if(err) return res.json({ success: false, err });
      res.status(HTTPStatus.OK).json({ success: true, posts })
    })
}

