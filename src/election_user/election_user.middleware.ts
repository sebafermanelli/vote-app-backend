import { NextFunction, Request, Response } from 'express';
import { SharedMiddleware } from '../utils/shared.middleware';
import { ElectionUser } from './election_user.model';

export class ElectionUserMiddleware extends SharedMiddleware {
	constructor() {
		super();
	}

	electionUserValidator(req: Request, res: Response, next: NextFunction) {
		const { id, already_vote, user_id, election_id } = req.body;

		const valid = new ElectionUser();

		valid.id = id;
		valid.already_vote = already_vote;
		valid.user_id = user_id;
		valid.election_id = election_id;

		this.validator(req, res, next, valid);
	}
}
