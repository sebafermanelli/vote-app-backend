import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { SharedMiddleware } from '../utils/shared.middleware';
import { Student } from './student.model';

export class StudentMiddleware extends SharedMiddleware {
	constructor() {
		super();
	}

	studentValidator(req: Request, res: Response, next: NextFunction) {
		const {
			id,
			name,
			last_name,
			course,
			address,
			email,
			phone,
			image_url,
			login_code,
		} = req.body;

		const valid = new Student();

		valid.id = id;
		valid.name = name;
		valid.last_name = last_name;
		valid.course = course;
		valid.address = address;
		valid.email = email;
		valid.phone = phone;
		valid.image_url = image_url;
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
