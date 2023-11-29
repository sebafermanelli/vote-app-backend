import { NextFunction, Request, Response } from 'express';
import { SharedMiddleware } from '../utils/shared.middleware';
import { User } from './user.model';

export class UserMiddleware extends SharedMiddleware {
	constructor() {
		super();
	}

	userValidator(req: Request, res: Response, next: NextFunction) {
		const { id, name, lastName, course, address, email, phone, loginCode } = req.body;

		const valid = new User();

		valid.id = id;
		valid.name = name;
		valid.lastName = lastName;
		valid.course = course;
		valid.address = address;
		valid.email = email;
		valid.phone = phone;
		valid.loginCode = loginCode;

		this.validator(req, res, next, valid);
	}
}
