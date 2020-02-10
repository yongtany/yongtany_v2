import bcrypt from "bcrypt";
import mongoose, { Model, Schema } from "mongoose";
import jwt from 'jsonwebtoken';
import moment from 'moment';

import UserDocument from './user.document';
const config = require("../../config/keys");

export interface UserModel extends Model<UserDocument> {
    findByToken: Function
}

const userSchema = new Schema({
  name: {
    type:String,
    maxlength:50
  },
  email: {
    type:String,
    trim:true,
    unique: 1 
  },
  password: {
      type: String,
      minlength: 5,
  },
  username: {
      type:String,
      maxlength: 50,
      unique: true
  },
  role : {
    type:Number,
    default: 0 
  },
  image: String,
  token : {
    type: String,
  },
  tokenExp :{
    type: Number
  }
})

const saltRounds = 10;

/** Password hashing & Signing Url middleware. */
userSchema.pre("save", function save(next: any) {
    var user = this as UserDocument;
    if(user.isModified('password')){    
      console.log('password changed')
      bcrypt.genSalt(saltRounds, function(err, salt){
          if(err) return next(err);
  
          bcrypt.hash(user.password, salt, function(err, hash){
              if(err) return next(err);
              user.password = hash; 
              next();
          })
      })
  } else {
      next();
  }
});

userSchema.methods.comparePassword = function(plainPassword: string, cb: any){
  bcrypt.compare(plainPassword, this.password, function(err, isMatch: boolean){
    if (err) return cb(err);
    cb(null, isMatch)
  })
}

userSchema.methods.generateToken = function(cb: any) {
  var user = this;
  var token = jwt.sign(user._id.toHexString(), config.jwtSecret);
  var oneHour = moment().add(1, 'hour').valueOf();

  user.tokenExp = oneHour;
  user.token = token;
  user.save(function (err: Error, user: UserDocument){
    if(err) return cb(err)
    cb(null, user);
});
}

userSchema.statics.findByToken = function (token: string, cb: any) {
    var user = this;

    jwt.verify(token, config.jwtSecret, (err: Error, decode: any) => {
        user.findOne({"_id": decode, "token": token}, function(err: Error, user: UserDocument) {
            if(err) return cb(err);
            cb(null, user);
        })
    })
}

export const User: UserModel = mongoose.model<UserDocument, UserModel>("User", userSchema);