import { BaseRouter } from '../utils/shared.router';
import { ListRoleController } from './list_role.controller';
import { ListRoleMiddleware } from './list_role.middleware';

export class ListRoleRouter extends BaseRouter<ListRoleController, ListRoleMiddleware> {
	constructor() {
		super(ListRoleController, ListRoleMiddleware);
	}

	routes(): void {
		this.router.get(
			'/listroles',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.getListRoles(req, res)
		);
		this.router.get(
			'/listroles/listrole/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.getListRoleById(req, res)
		);
		this.router.post(
			'/listroles/register',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res, next) => [this.middleware.listRoleValidator(req, res, next)],
			(req, res) => this.controller.createListRole(req, res)
		);
		this.router.put(
			'/listroles/update/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.updateListRole(req, res)
		);
		this.router.delete(
			'/listroles/delete/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.deleteListRole(req, res)
		);
	}
}
