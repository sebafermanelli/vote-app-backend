import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { sequelize } from './config/db/database.connection';
import { AdminRouter } from './admin/admin.router';
import { LoginStrategy } from './auth/strategies/login.strategy';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { AuthRouter } from './auth/auth.router';
import { UserRouter } from './user/user.router';
import { ElectionRouter } from './election/election.router';
import { ListRouter } from './list/list.router';
import { CandidateRouter } from './candidate/candidate.router';
import { DelegationRouter } from './delegation/delegation.router';
import { ElectionUserRouter } from './election_user/election_user.router';

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
		new LoginStrategy().useUser;
		new JwtStrategy().use;
	}

	routers(): Array<express.Router> {
		return [
			new AdminRouter().router,
			new AuthRouter().router,
			new CandidateRouter().router,
			new DelegationRouter().router,
			new ElectionRouter().router,
			new ElectionUserRouter().router,
			new ListRouter().router,
			new UserRouter().router,
		];
	}

	async dbConnect() {
		try {
			await sequelize.sync({ force: true });
			console.log('Connected to database server');
		} catch (error) {
			console.error('Unable to connect to the database: ', error);
		}
	}
}
