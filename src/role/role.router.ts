import { BaseRouter } from '../utils/shared.router';
import { RoleController } from './role.controller';
import { RoleMiddleware } from './role.middleware';

export class RoleRouter extends BaseRouter<RoleController, RoleMiddleware> {
	constructor() {
		super(RoleController, RoleMiddleware);
	}

	routes(): void {
		this.router.get(
			'/roles',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.getRoles(req, res)
		);
		this.router.get(
			'/roles/role/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.getRoleById(req, res)
		);
		this.router.post(
			'/roles/register',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res, next) => [this.middleware.roleValidator(req, res, next)],
			(req, res) => this.controller.createRole(req, res)
		);
		this.router.put(
			'/roles/update/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.updateRole(req, res)
		);
		this.router.delete(
			'/roles/delete/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.deleteRole(req, res)
		);
	}
}