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
		this.router.post(
			'/candidates',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res, next) => [this.middleware.candidateValidator(req, res, next)],
			(req, res) => this.controller.createCandidate(req, res)
		);
		this.router.put(
			'/candidates/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.updateCandidate(req, res)
		);
		this.router.delete(
			'/candidates/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.deleteCandidate(req, res)
		);
		this.router.get(
			'/candidates/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.getCandidateById(req, res)
		);
	}
}
