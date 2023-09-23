import { BaseRouter } from '../utils/shared.router';
import { CandidateController } from './candidate.controller';
import { CandidateMiddleware } from './candidate.middleware';

export class CandidateRouter extends BaseRouter<CandidateController, CandidateMiddleware> {
	constructor() {
		super(CandidateController, CandidateMiddleware);
	}

	routes(): void {
		this.router.get(
			'/candidates',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.getCandidates(req, res)
		);
		this.router.get(
			'/candidates/candidate/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.getCandidateById(req, res)
		);
		this.router.post(
			'/candidates/register',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res, next) => [this.middleware.candidateValidator(req, res, next)],
			(req, res) => this.controller.createCandidate(req, res)
		);
		this.router.put(
			'/candidates/update/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.updateCandidate(req, res)
		);
		this.router.delete(
			'/candidates/delete/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.deleteCandidate(req, res)
		);

		this.router.get(
			'/candidates/candidate/:user_id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.getCandidateByUserId(req, res)
		);
	}
}
