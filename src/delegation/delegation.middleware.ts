import { NextFunction, Request, Response } from 'express';
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

		this.validator(req, res, next, valid);
	}
}
