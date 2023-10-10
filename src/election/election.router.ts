import { BaseRouter } from '../utils/shared.router';
import { ElectionController } from './election.controller';
import { ElectionMiddleware } from './election.middleware';

export class ElectionRouter extends BaseRouter<ElectionController, ElectionMiddleware> {
	constructor() {
		super(ElectionController, ElectionMiddleware);
	}

	routes(): void {
		this.router.get(
			'/elections',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkUserRole(req, res, next)],
			(req, res) => this.controller.getElections(req, res)
		);
		this.router.post(
			'/elections',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res, next) => [this.middleware.electionValidator(req, res, next)],
			(req, res) => this.controller.createElection(req, res)
		);
		this.router.put(
			'/elections/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.updateElection(req, res)
		);
		this.router.delete(
			'/elections/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.deleteElection(req, res)
		);
		this.router.get(
			'/elections/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkUserRole(req, res, next)],
			(req, res) => this.controller.getElectionById(req, res)
		);
		this.router.get(
			'elections/:id/lists',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkUserRole(req, res, next)],
			(req, res) => this.controller.getListsByElectionId(req, res)
		);
		this.router.get(
			'/elections/:id/users',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.getUsersByElectionId(req, res)
		);
		this.router.put(
			'/elections/:id/finalize',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.finalizeElection(req, res)
		);
		this.router.get(
			'/elections/:id/delegation',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.getDelegationByElectionId(req, res)
		);
	}
}
