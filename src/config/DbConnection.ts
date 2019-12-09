import * as mongoose from "mongoose";
import { Promise } from 'bluebird';
import { Logger } from '@overnightjs/logger';

export default class DbConnection {
  private url: string = '';
  constructor(username: string, password: string) {
    Promise.promisifyAll(mongoose);
    this.url = `mongodb://${username}:${password}@ds039078.mlab.com:39078/todoapp`;
  }

  public connectDB(): void {
    mongoose.connect(this.url, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => Logger.Info('DB Connected!'))
    .catch(err => {
      Logger.Err(`DB Connection Error: ${err.message}`);
    });
  }
}