import { OK, BAD_REQUEST } from 'http-status-codes';
import { Request, Response } from 'express';
import { Controller, Middleware, Get, Put, Post, Delete } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';

import { UserModel } from '../models/User'

@Controller('api/users')
export class UsersController {
  @Get('')
  private getAllUsers(req: Request, res: Response) {
      // Logger.Info(req.params);
      UserModel.find({}).then(data => {
        res.status(OK).json({
            users: data,
        });
      });
  }
  @Post('')
  private createUser(req: Request, res: Response) {
    const userData = new UserModel(req.body);
    Logger.Info(JSON.stringify(req.body));
    userData.save().then(data => {
      res.status(OK).json({
        user: data
      })
    })
  }
}
