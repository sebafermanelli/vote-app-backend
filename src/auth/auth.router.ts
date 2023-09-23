import { SharedMiddleware } from '../utils/shared.middleware';
import { BaseRouter } from '../utils/shared.router';
import { AuthController } from './auth.controller';

export class AuthRouter extends BaseRouter<AuthController, SharedMiddleware> {
	constructor() {
		super(AuthController, SharedMiddleware);
	}

	routes(): void {
		this.router.post('/auth/admin/login', this.middleware.passAuth('loginAdmin'), (req, res) =>
			this.controller.loginAdmin(req, res)
		);
		this.router.post('/auth/user/login', this.middleware.passAuth('loginUser'), (req, res) =>
			this.controller.loginUser(req, res)
		);
	}
}
