// import * as express from 'express';
import { Request, Response, NextFunction } from 'express';

const TestMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(`total number of wordds.. ${JSON.stringify(req.params)} is ${req.params.msg && req.params.msg.split(' ').length}`);
  // req.msgWordCount = req.params.msg.split(' ').length;
  next();
};

export default TestMiddleware;