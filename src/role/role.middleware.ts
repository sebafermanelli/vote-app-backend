import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { SharedMiddleware } from '../utils/shared.middleware';
import { Role } from './role.model';

export class RoleMiddleware extends SharedMiddleware {
	constructor() {
		super();
	}

	roleValidator(req: Request, res: Response, next: NextFunction) {
		const { id, description } = req.body;

		const valid = new Role();

		valid.id = id;
		valid.description = description;

		validate(valid).then((error) => {
			if (error.length > 0) {
				return this.httpResponse.Error(res, error);
			} else {
				next();
			}
		});
	}
}
