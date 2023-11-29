import { NextFunction, Request, Response } from 'express';
import { SharedMiddleware } from '../utils/shared.middleware';
import { Delegation } from './delegation.model';

export class DelegationMiddleware extends SharedMiddleware {
	constructor() {
		super();
	}

	delegationValidator(req: Request, res: Response, next: NextFunction) {
		const { id, electionId } = req.body;

		const valid = new Delegation();

		valid.id = id;
		valid.electionId = electionId;

		this.validator(req, res, next, valid);
	}
}
