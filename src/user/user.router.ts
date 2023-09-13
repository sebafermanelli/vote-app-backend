import { BaseRouter } from '../utils/shared.router';
import { UserController } from './user.controller';
import { UserMiddleware } from './user.middleware';

export class UserRouter extends BaseRouter<UserController, UserMiddleware> {
	constructor() {
		super(UserController, UserMiddleware);
	}

	routes(): void {
		this.router.get(
			'/users',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.getUsers(req, res)
		);
		this.router.get(
			'/users/user/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkUserRole(req, res, next)],
			(req, res) => this.controller.getUserById(req, res)
		);
		this.router.post(
			'/users/register',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res, next) => [this.middleware.userValidator(req, res, next)],
			(req, res) => this.controller.createUser(req, res)
		);
		this.router.put(
			'/users/update/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.updateUser(req, res)
		);
		this.router.put('/users/code/:id', (req, res) =>
			this.controller.generateCode(req, res)
		);
		this.router.delete(
			'/users/delete/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.deleteUser(req, res)
		);
	}
}
