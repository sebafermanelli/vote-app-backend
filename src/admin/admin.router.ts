import { BaseRouter } from '../utils/shared.router';
import { AdminController } from './admin.controller';
import { AdminMiddleware } from './admin.middleware';

export class AdminRouter extends BaseRouter<AdminController, AdminMiddleware> {
	constructor() {
		super(AdminController, AdminMiddleware);
	}

	routes(): void {
		this.router.get(
			'/admins',
			(req, res, next) => this.middleware.checkAdminRole(req, res, next, 'jwt'),
			(req, res) => this.controller.getAdmins(req, res)
		);
		this.router.post(
			'/admins',
			(req, res, next) => this.middleware.adminValidator(req, res, next),
			(req, res) => this.controller.createAdmin(req, res)
		);
		this.router.put(
			'/admins/:id',
			(req, res, next) => this.middleware.checkAdminRole(req, res, next, 'jwt'),
			(req, res) => this.controller.updateAdmin(req, res)
		);
		this.router.delete(
			'/admins/:id',
			(req, res, next) => this.middleware.checkAdminRole(req, res, next, 'jwt'),
			(req, res) => this.controller.deleteAdmin(req, res)
		);
		this.router.get(
			'/admins/:id',
			(req, res, next) => this.middleware.checkAdminRole(req, res, next, 'jwt'),
			(req, res) => this.controller.getAdminById(req, res)
		);
		this.router.get(
			'/admins/:id/elections',
			(req, res, next) => this.middleware.checkAdminRole(req, res, next, 'jwt'),
			(req, res) => this.controller.getElectionsByAdminId(req, res)
		);
	}
}
