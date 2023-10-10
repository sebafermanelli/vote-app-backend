import { Request, Response } from 'express';
import { HttpResponse } from '../utils/http.response';
import { ListRole } from './list_role.model';

export class ListRoleController {
	constructor(private readonly httpResponse: HttpResponse = new HttpResponse()) {}

	async getListRoles(req: Request, res: Response) {
		try {
			const data = await ListRole.findAll();
			if (data.length === 0) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async getListRoleById(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await ListRole.findOne({ where: { id } });
			if (!data) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async createListRole(req: Request, res: Response) {
		try {
			const listRole = await ListRole.create(req.body);
			return this.httpResponse.Ok(res, listRole);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async updateListRole(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await ListRole.update(req.body, { where: { id } });

			if (!data) {
				return this.httpResponse.NotFound(res, 'Hay un error en actualizar');
			}

			return this.httpResponse.Ok(res, data);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async deleteListRole(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await ListRole.destroy({ where: { id } });
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
