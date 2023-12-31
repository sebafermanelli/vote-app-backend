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
			this.middleware.passAuth('jwt'),
			(req, res, next) => this.middleware.checkAdminRole(req, res, next),
			(req, res) => this.controller.getAdmins(req, res)
		);
		this.router.post(
			'/admins',
			(req, res, next) => this.middleware.adminValidator(req, res, next),
			(req, res) => this.controller.createAdmin(req, res)
		);
		this.router.put(
			'/admins/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => this.middleware.checkAdminRole(req, res, next),
			(req, res) => this.controller.updateAdmin(req, res)
		);
		this.router.delete(
			'/admins/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => this.middleware.checkAdminRole(req, res, next),
			(req, res) => this.controller.deleteAdmin(req, res)
		);
		this.router.get(
			'/admins/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => this.middleware.checkAdminRole(req, res, next),
			(req, res) => this.controller.getAdminById(req, res)
		);
		this.router.get(
			'/admins/:id/elections',
			this.middleware.passAuth('jwt'),
			(req, res, next) => this.middleware.checkAdminRole(req, res, next),
			(req, res) => this.controller.getElectionsByAdminId(req, res)
		);
	}
}
