declare namespace Express {

  interface Request {

      user: any;
      token: string;
      _id: string;
      check(msg1: String, msg2?: String): any;
      notEmpty(): any;
      validationErrors(): any
  }

}

// declare module 'multer' {
//   global {
    
//   }
//   function DiskStorageOptions(): any
// }