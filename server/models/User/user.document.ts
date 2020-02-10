import { Document } from 'mongoose';

export default interface UserDocument extends Document {
  name: string,
  email: string,
  password: string,
  username: string,
  role: number;
  image: string,
  token: string;
  tokenExp: number;
  comparePassword: Function,
  generateToken: Function,
};