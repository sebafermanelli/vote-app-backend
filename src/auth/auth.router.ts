import { SharedMiddleware } from '../utils/shared.middleware';
import { BaseRouter } from '../utils/shared.router';
import { AuthController } from './auth.controller';

export class AuthRouter extends BaseRouter<AuthController, SharedMiddleware> {
	constructor() {
		super(AuthController, SharedMiddleware);
	}

	routes(): void {
		this.router.post(
			'/admins/login',
			this.middleware.passAuth('loginAdmin'),
			(req, res) => this.controller.loginAdmin(req, res)
		);
		this.router.post(
			'/students/login',
			this.middleware.passAuth('loginStudent'),
			(req, res) => this.controller.loginStudent(req, res)
		);
	}
}
