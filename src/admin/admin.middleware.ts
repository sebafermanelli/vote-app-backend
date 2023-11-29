import { NextFunction, Request, Response } from 'express';
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

		this.validator(req, res, next, valid);
	}
}
