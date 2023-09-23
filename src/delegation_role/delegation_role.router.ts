import { BaseRouter } from '../utils/shared.router';
import { DelegationRoleController } from './delegation_role.controller';
import { DelegationRoleMiddleware } from './delegation_role.middleware';

export class DelegationRoleRouter extends BaseRouter<DelegationRoleController, DelegationRoleMiddleware> {
	constructor() {
		super(DelegationRoleController, DelegationRoleMiddleware);
	}

	routes(): void {
		this.router.get(
			'/delegationroles',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.getDelegationRoles(req, res)
		);
		this.router.get(
			'/delegationroles/delegationrole/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.getDelegationRoleById(req, res)
		);
		this.router.post(
			'/delegationroles/register',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res, next) => [this.middleware.delegationRoleValidator(req, res, next)],
			(req, res) => this.controller.createDelegationRole(req, res)
		);
		this.router.put(
			'/delegationroles/update/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.updateDelegationRole(req, res)
		);
		this.router.delete(
			'/delegationroles/delete/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.deleteDelegationRole(req, res)
		);

		this.router.get(
			'/delegationroles/:delegation_id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.getDelegationRolesByDelegationId(req, res)
		);
	}
}
