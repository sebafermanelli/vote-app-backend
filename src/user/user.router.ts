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
			(req, res, next) => this.middleware.checkAdminRole(req, res, next, 'jwt'),
			(req, res) => this.controller.getUsers(req, res)
		);
		this.router.post(
			'/users',
			(req, res, next) => this.middleware.checkAdminRole(req, res, next, 'jwt'),
			(req, res, next) => this.middleware.userValidator(req, res, next),
			(req, res) => this.controller.createUser(req, res)
		);
		this.router.put(
			'/users/:id',
			(req, res, next) => this.middleware.checkAdminRole(req, res, next, 'jwt'),
			(req, res) => this.controller.updateUser(req, res)
		);
		this.router.delete(
			'/users/:id',
			(req, res, next) => this.middleware.checkAdminRole(req, res, next, 'jwt'),
			(req, res) => this.controller.deleteUser(req, res)
		);
		this.router.get(
			'/users/:id',
			(req, res, next) => this.middleware.checkUserRole(req, res, next, 'jwt'),
			(req, res) => this.controller.getUserById(req, res)
		);
		this.router.put('/users/:id/code', (req, res) => this.controller.generateCode(req, res));
		this.router.get(
			'/users/:id/elections',
			(req, res, next) => this.middleware.checkUserRole(req, res, next, 'jwt'),
			(req, res) => this.controller.getElectionsByUserId(req, res)
		);
	}
}
