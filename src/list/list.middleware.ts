import { NextFunction, Request, Response } from 'express';
import { SharedMiddleware } from '../utils/shared.middleware';
import { List } from './list.model';

export class ListMiddleware extends SharedMiddleware {
	constructor() {
		super();
	}

	listValidator(req: Request, res: Response, next: NextFunction) {
		const { id, description, votes, election_id } = req.body;

		const valid = new List();

		valid.id = id;
		valid.description = description;
		valid.votes = votes;
		valid.election_id = election_id;

		this.validator(req, res, next, valid);
	}
}
