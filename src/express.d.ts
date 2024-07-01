import { Request } from 'express';
import { IUser } from './Database/models/UserModel'; 

declare global {
  namespace Express {
    interface Request {
      user?: IUser; 
      verified?: boolean;
    }
  }
}
