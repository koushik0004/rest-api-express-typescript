import { OK, BAD_REQUEST } from 'http-status-codes';
import { Request, Response } from 'express';
import { Controller, Middleware, Get, Put, Post, Delete, Patch } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';

import { UserModel } from '../models/User'
import { passwordEncryption } from '../middleware/users-middleware';

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

  @Get(':field/:fieldValue')
  private getUserByFieldData(req: Request, res: Response) {
    Logger.Info(`${req.params.field}, ${req.params.fieldValue}`);
    UserModel.find({[req.params.field]: req.params.fieldValue})
      .then(data => {
        res.status(OK).json({
            user: data,
        });
      });
  }

  @Delete('email/:email')
  private deleteUserByEmail(req: Request, res: Response) {
    try {
      UserModel.find({email: req.params.email})
        .remove()
        .exec()
        .then(data => {
          res.status(OK).json({
            msg: 'removed succefully!!' 
          });
        });
    } catch(err) {
      Logger.Err(JSON.stringify(err));
      res.status(BAD_REQUEST).json({
        msg: 'Removing not been possible!!'
      });
    }
  }



  @Post('')
  @Middleware(passwordEncryption)
  private async createUser(req: Request, res: Response) {
    const userData = new UserModel(req.body);
    Logger.Info(JSON.stringify(req.body));
    try {
      await userData.save().then(data => {
        res.status(OK).json({
          user: data
        })
      });
    } catch(err) {
      Logger.Err(JSON.stringify(err));
    }
  }

  @Patch(':_id')
  @Middleware(passwordEncryption)
  private patchUserDetails(req: Request, res: Response) {
    if(!req.params._id) {
      res.status(BAD_REQUEST).json({
        msg: 'User id not been send'
      });
    } else {
      try {
        UserModel.findByIdAndUpdate(req.params._id, {$set: req.body}, {new:true})
          .then(data => {
            res.status(OK).json({
              user: data
            });
          });
      } catch(err) {
        res.status(BAD_REQUEST).json({
          error: err
        });
      }
    }
  }
}
