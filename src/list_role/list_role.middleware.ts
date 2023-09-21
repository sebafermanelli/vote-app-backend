import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { SharedMiddleware } from '../utils/shared.middleware';
import { ListRole } from './list_role.model';

export class ListRoleMiddleware extends SharedMiddleware {
	constructor() {
		super();
	}

	listRoleValidator(req: Request, res: Response, next: NextFunction) {
		const { id, order, list_id, role_id, candidate_id } = req.body;

		const valid = new ListRole();

		valid.id = id;
		valid.order = order;
		valid.list_id = list_id;
		valid.role_id = role_id;
		valid.candidate_id = candidate_id;

		validate(valid).then((error) => {
			if (error.length > 0) {
				return this.httpResponse.Error(res, error);
			} else {
				next();
			}
		});
	}
}
