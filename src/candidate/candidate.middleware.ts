import { NextFunction, Request, Response } from 'express';
import { SharedMiddleware } from '../utils/shared.middleware';
import { Candidate } from './candidate.model';

export class CandidateMiddleware extends SharedMiddleware {
	constructor() {
		super();
	}

	candidateValidator(req: Request, res: Response, next: NextFunction) {
		const { id, userId } = req.body;

		const valid = new Candidate();

		valid.id = id;
		valid.userId = userId;

		this.validator(req, res, next, valid);
	}
}
