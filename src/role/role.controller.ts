import { Request, Response } from 'express';
import { HttpResponse } from '../utils/http.response';
import { Role } from './role.model';

export class RoleController {
	constructor(private readonly httpResponse: HttpResponse = new HttpResponse()) {}

	async getRoles(req: Request, res: Response) {
		try {
			const data = await Role.findAll();
			if (data.length === 0) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async getRoleById(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await Role.findOne({ where: { id } });
			if (!data) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async createRole(req: Request, res: Response) {
		try {
			const role = await Role.create(req.body);
			return this.httpResponse.Ok(res, role);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async updateRole(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await Role.update(req.body, { where: { id } });

			if (!data) {
				return this.httpResponse.NotFound(res, 'Hay un error en actualizar');
			}

			return this.httpResponse.Ok(res, data);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async deleteRole(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await Role.destroy({ where: { id } });
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
