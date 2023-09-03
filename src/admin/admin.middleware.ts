import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { SharedMiddleware } from '../utils/shared.middleware';
import { Admin } from './admin.model';

export class AdminMiddleware extends SharedMiddleware {
	constructor() {
		super();
	}

	adminValidator(req: Request, res: Response, next: NextFunction) {
		const { username, password } = req.body;

		const valid = new Admin();

		valid.username = username;
		valid.password = password;

		validate(valid).then((error) => {
			if (error.length > 0) {
				return this.httpResponse.Error(res, error);
			} else {
				next();
			}
		});
	}
}
