import { OK, BAD_REQUEST } from 'http-status-codes';
import { Request, Response } from 'express';
import { Controller, Middleware, Get, Put, Post, Delete } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';

import TestMiddleware from '../middleware/test-middleware';
import { TodoModel } from '../models/Todo';

@Controller('api/example')
export class ExampleController {

    @Get('')
    @Middleware(TestMiddleware)
    private getAllTodos(req: Request, res: Response) {
        // Logger.Info(req.params.msg);
        TodoModel.find({}).then(data => {
          res.status(OK).json({
              todos: data
          });
        });
    }

    @Get(':item')
    private getTodo(req: Request, res: Response) {
        Logger.Info(req.params.item);
        TodoModel.find({item: req.params.item}).then(response => {
          res.status(OK).json({
              todos: response
          });
        });
    }

    @Put(':msg')
    private putMessage(req: Request, res: Response) {
        Logger.Info(req.params.msg);
        return res.status(BAD_REQUEST).json({
            error: req.params.msg,
        });
    }

    @Post(':msg')
    private postMessage(req: Request, res: Response) {
        Logger.Info(req.params.msg);
        return res.status(BAD_REQUEST).json({
            error: req.params.msg,
        });
    }

    @Delete(':msg')
    private delMessage(req: Request, res: Response) {
        try {
            throw new Error(req.params.msg);
        } catch (err) {
            Logger.Err(err, true);
            return res.status(BAD_REQUEST).json({
                error: req.params.msg,
            });
        }
    }
}