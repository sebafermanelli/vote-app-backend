import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { SharedMiddleware } from '../utils/shared.middleware';
import { List } from './list.model';

export class ListMiddleware extends SharedMiddleware {
	constructor() {
		super();
	}

	listValidator(req: Request, res: Response, next: NextFunction) {
		const {
			id,
			election_id,
			description,
			image,
			votes,
			president_id,
			secretary_id,
			delegate1_id,
			delegate2_id,
			delegate3_id,
			delegate4_id,
			delegate5_id,
			delegate6_id,
		} = req.body;

		const valid = new List();

		valid.id = id;
		valid.election_id = election_id;
		valid.description = description;
		valid.image = image;
		valid.votes = votes;
		valid.president_id = president_id;
		valid.secretary_id = secretary_id;
		valid.delegate1_id = delegate1_id;
		valid.delegate2_id = delegate2_id;
		valid.delegate3_id = delegate3_id;
		valid.delegate4_id = delegate4_id;
		valid.delegate5_id = delegate5_id;
		valid.delegate6_id = delegate6_id;

		validate(valid).then((error) => {
			if (error.length > 0) {
				return this.httpResponse.Error(res, error);
			} else {
				next();
			}
		});
	}
}
