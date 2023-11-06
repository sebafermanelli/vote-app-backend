import { BaseRouter } from '../utils/shared.router';
import { DelegationController } from './delegation.controller';
import { DelegationMiddleware } from './delegation.middleware';

export class DelegationRouter extends BaseRouter<DelegationController, DelegationMiddleware> {
	constructor() {
		super(DelegationController, DelegationMiddleware);
	}

	routes(): void {
		this.router.get(
			'/delegations',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.getDelegations(req, res)
		);
		this.router.post(
			'/delegations',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res, next) => [this.middleware.delegationValidator(req, res, next)],
			(req, res) => this.controller.createDelegation(req, res)
		);
		this.router.put(
			'/delegations/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.updateDelegation(req, res)
		);
		this.router.delete(
			'/delegations/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.deleteDelegation(req, res)
		);
		this.router.get(
			'/delegations/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.getDelegationById(req, res)
		);
	}
}
