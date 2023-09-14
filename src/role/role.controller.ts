import { Request, Response } from 'express';
import { HttpResponse } from '../utils/http.response';
import { RoleService } from './role.service';

export class RoleController {
	constructor(
		private readonly roleService: RoleService = new RoleService(),
		private readonly httpResponse: HttpResponse = new HttpResponse()
	) {}

	async getRoles(req: Request, res: Response) {
		try {
			const data = await this.roleService.findAllRole();
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
			const data = await this.roleService.findRoleById(Number(id));
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
			const Role = await this.roleService.createRole(req.body);
			return this.httpResponse.Ok(res, Role);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async updateRole(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.roleService.updateRole(Number(id), req.body);

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
			const data = await this.roleService.deleteRole(Number(id));
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
