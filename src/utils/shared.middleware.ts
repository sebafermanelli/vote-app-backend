import { NextFunction, Request, Response } from 'express';
import { HttpResponse } from './http.response';
import passport from 'passport';
import { User } from '../user/user.model';
import { Admin } from '../admin/admin.model';

export class SharedMiddleware {
	constructor(public httpResponse: HttpResponse = new HttpResponse()) {}
	passAuth(type: string) {
		return passport.authenticate(type, { session: false });
	}

	async checkAdminRole(req: Request, res: Response, next: NextFunction) {
		const admin = req.user as Admin;

		if (!admin.username) {
			return this.httpResponse.Unauthorized(res, 'No tienes permiso');
		}
		return next();
	}

	async checkUserRole(req: Request, res: Response, next: NextFunction) {
		const user = req.user as User;
		const admin = req.user as Admin;

		if (!user.id) {
			if (!admin.username) {
				return this.httpResponse.Unauthorized(res, 'No tienes permiso');
			}
			return next();
		}
		return next();
	}
}
