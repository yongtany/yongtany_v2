import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User/user.model';
import UserDocument from '../models/User/user.document';

const auth = async (req: Request, res: Response, next: NextFunction) => {
  let token = req.cookies.token;

  await User.findByToken(token, (err: Error, user: UserDocument) => {
    if(err) throw err;

    if (!user)
      return res.json({
        isAuth: false,
        error: true
      });

    req.token = token;
    req.user = user;
    next();
  });
};

export default auth;