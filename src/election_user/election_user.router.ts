import { BaseRouter } from '../utils/shared.router';
import { ElectionUserController } from './election_user.controller';
import { ElectionUserMiddleware } from './election_user.middleware';

export class ElectionUserRouter extends BaseRouter<ElectionUserController, ElectionUserMiddleware> {
	constructor() {
		super(ElectionUserController, ElectionUserMiddleware);
	}

	routes(): void {
		this.router.get(
			'/electionusers',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.getElectionUsers(req, res)
		);
		this.router.put(
			'/electionusers/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.updateElectionUser(req, res)
		);
		this.router.delete(
			'/electionusers/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.deleteElectionUser(req, res)
		);
		this.router.get(
			'/electionusers/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.getElectionUserById(req, res)
		);
		this.router.post(
			'/electionusers/:election_id/generate',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.generateElectionUsers(req, res)
		);
		this.router.put(
			'/electionusers/:user_id/vote',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkUserRole(req, res, next)],
			(req, res) => this.controller.generateVote(req, res)
		);
	}
}
