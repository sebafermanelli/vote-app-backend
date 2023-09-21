import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { SharedMiddleware } from '../utils/shared.middleware';
import { List } from './list.model';

export class ListMiddleware extends SharedMiddleware {
	constructor() {
		super();
	}

	listValidator(req: Request, res: Response, next: NextFunction) {
		const { id, description, image, votes, election_id } = req.body;

		const valid = new List();

		valid.id = id;
		valid.description = description;
		valid.image = image;
		valid.votes = votes;
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
