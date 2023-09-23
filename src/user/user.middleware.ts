import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { SharedMiddleware } from '../utils/shared.middleware';
import { User } from './user.model';

export class UserMiddleware extends SharedMiddleware {
	constructor() {
		super();
	}

	userValidator(req: Request, res: Response, next: NextFunction) {
		const { id, name, last_name, course, address, email, phone, image, login_code } = req.body;

		const valid = new User();

		valid.id = id;
		valid.name = name;
		valid.last_name = last_name;
		valid.course = course;
		valid.address = address;
		valid.email = email;
		valid.phone = phone;
		valid.image = image;
		valid.login_code = login_code;

		validate(valid).then((error) => {
			if (error.length > 0) {
				return this.httpResponse.Error(res, error);
			} else {
				next();
			}
		});
	}
}
