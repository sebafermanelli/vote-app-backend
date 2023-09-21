import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { HttpResponse } from '../utils/http.response';
import { Admin } from '../admin/admin.model';
import { User } from '../user/user.model';

export class AuthController extends AuthService {
	constructor(
		private readonly httpResponse: HttpResponse = new HttpResponse()
	) {
		super();
	}

	async loginAdmin(req: Request, res: Response) {
		try {
			const adminEncode: Admin = req.body;

			const encode = await this.generateAdminJWT(adminEncode);
			if (!encode) {
				return this.httpResponse.Unauthorized(res, 'No tienes permisos');
			}

			res.header('Content-Type', 'application/json');
			res.cookie('accessToken', encode.accessToken, { maxAge: 60000 * 60 });
			res.write(JSON.stringify(encode));
			res.end();
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async loginUser(req: Request, res: Response) {
		try {
			const userEncode: User = req.body;

			const encode = await this.generateUserJWT(userEncode);
			if (!encode) {
				return this.httpResponse.Unauthorized(res, 'No tienes permisos');
			}

			res.header('Content-Type', 'application/json');
			res.cookie('accessToken', encode.accessToken, { maxAge: 60000 * 60 });
			res.write(JSON.stringify(encode));
			res.end();
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}
}
