import { Request, Response } from 'express';
import { HttpResponse } from '../utils/http.response';
import { User } from './user.model';
import { Op } from 'sequelize';
import sendEmail from '../utils/mailer';
import { ElectionUser } from '../election_user/election_user.model';

export class UserController {
	constructor(private readonly httpResponse: HttpResponse = new HttpResponse()) {}

	async getUsers(req: Request, res: Response) {
		try {
			const data = await User.findAll();
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
			const data = await User.findOne({ where: { id } });
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
			const data = await User.findOne({
				where: {
					[Op.or]: [{ id }, { email }],
				},
			});
			if (data != null) {
				return this.httpResponse.Error(res, 'Existe dato');
			}
			const user = await User.create(req.body);
			return this.httpResponse.Ok(res, user);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async updateUser(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await User.update(req.body, { where: { id } });

			if (!data) {
				return this.httpResponse.NotFound(res, 'Hay un error en actualizar');
			}

			return this.httpResponse.Ok(res, data);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async deleteUser(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await User.destroy({ where: { id } });
			if (!data) {
				return this.httpResponse.NotFound(res, 'Hay un error en borrar');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async getElectionsByUserId(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await ElectionUser.findAll({ where: { user_id: id } });
			if (!data) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async generateCode(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await User.findOne({ where: { id } });
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
}
