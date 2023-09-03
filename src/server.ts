import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { sequelize } from './db/database.connection';
import { AdminRouter } from './admin/admin.router';
import { LoginStrategy } from './auth/strategies/login.strategy';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { AuthRouter } from './auth/auth.router';
import { StudentRouter } from './student/student.router';

export class Server {
	private readonly app: express.Application;
	private readonly port: number;

	constructor() {
		dotenv.config();
		this.app = express();
		this.port = Number(process.env.PORT);
		this.listen();
		this.midlewares();
		this.app.use('/api', this.routers());
		this.dbConnect();
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log('Application running at port ' + this.port);
		});
	}

	midlewares() {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(
			cors({
				origin: true,
				methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
				credentials: true,
			})
		);
		new LoginStrategy().useAdmin;
		new LoginStrategy().useStudent;
		new JwtStrategy().use;
	}

	routers(): Array<express.Router> {
		return [
			new AdminRouter().router,
			new AuthRouter().router,
			new StudentRouter().router,
		];
	}

	async dbConnect() {
		try {
			await sequelize.sync();
			console.log('Connected to database server');
		} catch (error) {
			console.error('Unable to connect to the database: ', error);
		}
	}
}
