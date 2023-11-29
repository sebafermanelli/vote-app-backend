import { NextFunction, Request, Response } from 'express';
import { SharedMiddleware } from '../utils/shared.middleware';
import { Candidate } from './candidate.model';

export class CandidateMiddleware extends SharedMiddleware {
	constructor() {
		super();
	}

	candidateValidator(req: Request, res: Response, next: NextFunction) {
		const { id, user_id } = req.body;

		const valid = new Candidate();

		valid.id = id;
		valid.user_id = user_id;

		this.validator(req, res, next, valid);
	}
}
