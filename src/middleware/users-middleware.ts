import * as crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';

export const passwordEncryption = (req: Request, res: Response, next: NextFunction) => {
  if(req.body.password) {
    const salt = crypto.randomBytes(16).toString('base64');
    const hash = crypto.createHmac('sha512',salt)
                                      .update(req.body.password)
                                      .digest("base64");
    req.body.password = salt + "$" + hash;
  }

   next();
};