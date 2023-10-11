import { Request, Response } from 'express';
import { HttpResponse } from '../utils/http.response';
import { Admin } from './admin.model';
import bcrypt from 'bcrypt';
import { Election } from '../election/election.model';

export class AdminController {
	constructor(private readonly httpResponse: HttpResponse = new HttpResponse()) {}

	async getAdmins(req: Request, res: Response) {
		try {
			const data = await Admin.findAll();
			if (data.length === 0) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async getAdminById(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await Admin.findOne({ where: { id } });
			if (!data) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async createAdmin(req: Request, res: Response) {
		let { username, password } = req.body;
		try {
			const data = await Admin.findOne({ where: { username } });
			if (data != null) {
				return this.httpResponse.Error(res, 'Existe dato');
			}
			const hashedPassword = await bcrypt.hash(password, 10);
			req.body.password = hashedPassword;

			const admin = await Admin.create(req.body);
			return this.httpResponse.Ok(res, admin);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async updateAdmin(req: Request, res: Response) {
		const { id } = req.params;
		let { password } = req.body;
		try {
			const hashedPassword = await bcrypt.hash(password, 10);
			req.body.password = hashedPassword;
			const data = await Admin.update(req.body, { where: { id } });

			if (!data) {
				return this.httpResponse.NotFound(res, 'Hay un error en actualizar');
			}

			return this.httpResponse.Ok(res, data);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async deleteAdmin(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await Admin.destroy({ where: { id } });
			if (!data) {
				return this.httpResponse.NotFound(res, 'Hay un error en borrar');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async getElectionsByAdminId(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await Election.findOne({ where: { admin_id: id } });
			if (!data) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}
}
