import { BaseRouter } from '../utils/shared.router';
import { ElectionController } from './election.controller';
import { ElectionMiddleware } from './election.middleware';

export class ElectionRouter extends BaseRouter<
	ElectionController,
	ElectionMiddleware
> {
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
		this.router.get(
			'/elections/election/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkUserRole(req, res, next)],
			(req, res) => this.controller.getElectionById(req, res)
		);
		this.router.get(
			'/elections/:admin_id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.getElectionsByAdminId(req, res)
		);
		this.router.post(
			'/elections/register',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res, next) => [this.middleware.electionValidator(req, res, next)],
			(req, res) => this.controller.createElection(req, res)
		);
		this.router.put(
			'/elections/update/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.updateElection(req, res)
		);
		this.router.delete(
			'/elections/delete/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.deleteElection(req, res)
		);
	}
}
