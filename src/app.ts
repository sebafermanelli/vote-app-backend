import express, { Application } from 'express';
import cors from 'cors';
import routesApi from './routes/api.routes';
import routesAdmin from './routes/admin.routes';
import routesStudent from './routes/student.routes';
import { Admin } from './models/admin.model';
import { Student } from './models/students.model';

class App {
	private readonly app: Application;
	private readonly port: string;

	constructor() {
		this.app = express();
		this.port = process.env.PORT || '3000';
		this.listen();
		this.midlewares();
		this.routes();
		void this.dbConnect();
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log('Aplication running at port ' + this.port);
		});
	}

	routes() {
		this.app.use('/api', routesApi);
		this.app.use('/api/admin', routesAdmin);
		this.app.use('/api/student', routesStudent);
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
			await Student.sync();
		} catch (error) {
			console.error('Unable to connect to the database: ', error);
		}
	}
}

export default App;
