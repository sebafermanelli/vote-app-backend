import { NextFunction, Request, Response } from 'express';
import { HttpResponse } from './http.response';
import passport from 'passport';
import { Student } from '../student/student.model';
import { Admin } from '../admin/admin.model';

export class SharedMiddleware {
	constructor(public httpResponse: HttpResponse = new HttpResponse()) {}
	passAuth(type: string) {
		return passport.authenticate(type, { session: false });
	}

	async checkAdminRole(req: Request, res: Response, next: NextFunction) {
		const admin = req.user as Admin;

		if (!admin) {
			return this.httpResponse.Unauthorized(res, 'No tienes permiso');
		}
		return next();
	}

	async checkStudentRole(req: Request, res: Response, next: NextFunction) {
		const student = req.user as Student;

		if (!student) {
			return this.httpResponse.Unauthorized(res, 'No tienes permiso');
		}
		return next();
	}
}
