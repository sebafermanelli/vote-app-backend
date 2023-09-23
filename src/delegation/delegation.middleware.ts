import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { SharedMiddleware } from '../utils/shared.middleware';
import { Delegation } from './delegation.model';

export class DelegationMiddleware extends SharedMiddleware {
	constructor() {
		super();
	}

	delegationValidator(req: Request, res: Response, next: NextFunction) {
		const { id, election_id } = req.body;

		const valid = new Delegation();

		valid.id = id;
		valid.election_id = election_id;

		validate(valid).then((error) => {
			if (error.length > 0) {
				return this.httpResponse.Error(res, error);
			} else {
				next();
			}
		});
	}
}