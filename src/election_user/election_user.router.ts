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
		this.router.get(
			'/electionusers/electionuser/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.getElectionUserById(req, res)
		);
		this.router.post(
			'/electionusers/register',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res, next) => [this.middleware.electionUserValidator(req, res, next)],
			(req, res) => this.controller.createElectionUser(req, res)
		);
		this.router.put(
			'/electionusers/update/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.updateElectionUser(req, res)
		);
		this.router.delete(
			'/electionusers/delete/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.deleteElectionUser(req, res)
		);

		this.router.get(
			'/electionusers/:election_id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.getElectionUsersByElectionId(req, res)
		);

		this.router.post(
			'/electionusers/register/:election_id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.generateElectionUsers(req, res)
		);
		this.router.put(
			'/electionusers/vote/:election_id/:user_id/:list_id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.generateVote(req, res)
		);
	}
}
