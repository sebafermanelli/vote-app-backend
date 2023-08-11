import express, {Application} from 'express';
import cors from "cors";
import routesAdmin from './routes/admin.routes';
import {Admin} from "./models/admin";

class App {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplicacion corriendo en el puerto ' + this.port);
        })
    }

    routes() {
        this.app.use('/api/admins', routesAdmin);
    }

    midlewares() {
        // Parseo body
        this.app.use(express.json());

        // Cors
        this.app.use(cors());
    }

    async dbConnect() {
        try {
            await Admin.sync();
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}

export default App;