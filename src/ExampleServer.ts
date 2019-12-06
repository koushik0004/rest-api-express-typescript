import * as bodyParser from 'body-parser';
import * as mongoose from "mongoose";
import { Promise } from 'bluebird';
import * as controllers from './controllers';
import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';

class ExampleServer extends Server {

    private readonly SERVER_STARTED = 'Example server started on port: ';

    constructor() {
        super(true);
        console.log(process.env.NODE_ENV);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.setupControllers();
        this.mongoSetup();
    }

    private mongoSetup(): void {
      Promise.promisifyAll(mongoose);
      const url = "mongodb://admin:admin4@ds039078.mlab.com:39078/todoapp";
      mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
      .then(() => console.log('DB Connected!'))
      .catch(err => {
        console.log(`DB Connection Error: ${err.message}`);
      });
    }

    private setupControllers(): void {
        const ctlrInstances = [];
        for (const name in controllers) {
            // console.log(name);
            if (controllers.hasOwnProperty(name)) {
                const controller = (controllers as any)[name];
                ctlrInstances.push(new controller());
            }
        }
        super.addControllers(ctlrInstances);
    }

    public start(port: number): void {
        this.app.get('*', (req, res) => {
            res.send(this.SERVER_STARTED + port);
        });
        this.app.listen(port, () => {
            Logger.Imp(this.SERVER_STARTED + port);
        });
    }
}

export default ExampleServer;