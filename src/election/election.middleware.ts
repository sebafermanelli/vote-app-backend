import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { SharedMiddleware } from '../utils/shared.middleware';
import { Election } from './election.model';

export class ElectionMiddleware extends SharedMiddleware {
	constructor() {
		super();
	}

	electionValidator(req: Request, res: Response, next: NextFunction) {
		const { id, description, admin_id, total_votes } = req.body;

		const valid = new Election();

		valid.id = id;
		valid.description = description;
		valid.admin_id = admin_id;
		valid.total_votes = total_votes;

		validate(valid).then((error) => {
			if (error.length > 0) {
				return this.httpResponse.Error(res, error);
			} else {
				next();
			}
		});
	}
}
