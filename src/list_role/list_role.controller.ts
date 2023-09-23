import { Request, Response } from 'express';
import { HttpResponse } from '../utils/http.response';
import { ListRoleService } from './list_role.service';

export class ListRoleController {
	constructor(
		private readonly listRoleService: ListRoleService = new ListRoleService(),
		private readonly httpResponse: HttpResponse = new HttpResponse()
	) {}

	async getListRoles(req: Request, res: Response) {
		try {
			const data = await this.listRoleService.findAllListRole();
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
			const data = await this.listRoleService.findListRoleById(Number(id));
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
			const listRole = await this.listRoleService.createListRole(req.body);
			return this.httpResponse.Ok(res, listRole);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async updateListRole(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.listRoleService.updateListRole(Number(id), req.body);

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
			const data = await this.listRoleService.deleteListRole(Number(id));
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
