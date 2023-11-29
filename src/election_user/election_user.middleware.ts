import { NextFunction, Request, Response } from 'express';
import { SharedMiddleware } from '../utils/shared.middleware';
import { ElectionUser } from './election_user.model';

export class ElectionUserMiddleware extends SharedMiddleware {
	constructor() {
		super();
	}

	electionUserValidator(req: Request, res: Response, next: NextFunction) {
		const { id, alreadyVote, userId, electionId } = req.body;

		const valid = new ElectionUser();

		valid.id = id;
		valid.alreadyVote = alreadyVote;
		valid.userId = userId;
		valid.electionId = electionId;

		this.validator(req, res, next, valid);
	}
}
