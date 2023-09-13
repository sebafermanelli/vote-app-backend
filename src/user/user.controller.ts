import { Request, Response } from 'express';
import { HttpResponse } from '../utils/http.response';
import { UserService } from './user.service';
import sendEmail from '../utils/mailer';

export class UserController {
	constructor(
		private readonly userService: UserService = new UserService(),
		private readonly httpResponse: HttpResponse = new HttpResponse()
	) {}

	async getUsers(req: Request, res: Response) {
		try {
			const data = await this.userService.findAllUser();
			if (data.length === 0) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async getUserById(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.userService.findUserById(id);
			if (!data) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async createUser(req: Request, res: Response) {
		const { id, email } = req.body;
		try {
			const data = await this.userService.findUserByIdOrEmail(id, email);
			if (data != null) {
				return this.httpResponse.Error(res, 'Existe dato');
			}
			const user = await this.userService.createUser(req.body);
			return this.httpResponse.Ok(res, user);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async updateUser(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.userService.updateUser(id, req.body);

			if (!data) {
				return this.httpResponse.NotFound(res, 'Hay un error en actualizar');
			}

			return this.httpResponse.Ok(res, data);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async generateCode(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.userService.findUserById(id);
			if (!data) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			let randomCode = '';
			for (let i = 0; i < 6; i++) {
				const number = Math.floor(Math.random() * 10);
				randomCode += number;
			}
			data.login_code = randomCode;
			await data.save();
			sendEmail({
				to: data.email,
				subject: 'Codigo de ingreso',
				html: `El codigo para ingresar al sistema de votacion es: ${randomCode}`,
			});
			return this.httpResponse.Ok(res, 'Codigo enviado');
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async deleteUser(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.userService.deleteUser(id);
			if (!data) {
				return this.httpResponse.NotFound(res, 'Hay un error en borrar');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}
}
