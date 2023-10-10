import { Request, Response } from 'express';
import { HttpResponse } from '../utils/http.response';
import { DelegationRole } from './delegation_role.model';

export class DelegationRoleController {
	constructor(private readonly httpResponse: HttpResponse = new HttpResponse()) {}

	async getDelegationRoles(req: Request, res: Response) {
		try {
			const data = await DelegationRole.findAll();
			if (data.length === 0) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async getDelegationRoleById(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await DelegationRole.findOne({ where: { id } });
			if (!data) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async createDelegationRole(req: Request, res: Response) {
		const { list_role_id } = req.body;
		try {
			const data = await DelegationRole.findAll({ where: { list_role_id } });
			if (data != null) {
				return this.httpResponse.Error(res, 'Existe dato');
			}

			const delegationRole = await DelegationRole.create(req.body);
			return this.httpResponse.Ok(res, delegationRole);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async updateDelegationRole(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await DelegationRole.update(req.body, { where: { id } });

			if (!data) {
				return this.httpResponse.NotFound(res, 'Hay un error en actualizar');
			}

			return this.httpResponse.Ok(res, data);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async deleteDelegationRole(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await DelegationRole.destroy({ where: { id } });
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
