import { Request, Response } from 'express';
import { HttpResponse } from '../utils/http.response';
import { DelegationRoleService } from './delegation_role.service';

export class DelegationRoleController {
	constructor(
		private readonly delegationRoleService: DelegationRoleService = new DelegationRoleService(),
		private readonly httpResponse: HttpResponse = new HttpResponse()
	) {}

	async getDelegationRoles(req: Request, res: Response) {
		try {
			const data = await this.delegationRoleService.findAllDelegationRole();
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
			const data = await this.delegationRoleService.findDelegationRoleById(
				Number(id)
			);
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
			const data =
				await this.delegationRoleService.findDelegationRoleByListRoleId(
					list_role_id
				);
			if (data != null) {
				return this.httpResponse.Error(res, 'Existe dato');
			}

			const delegationRole =
				await this.delegationRoleService.createDelegationRole(req.body);
			return this.httpResponse.Ok(res, delegationRole);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async updateDelegationRole(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.delegationRoleService.updateDelegationRole(
				id,
				req.body
			);

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
			const data = await this.delegationRoleService.deleteDelegationRole(id);
			if (!data) {
				return this.httpResponse.NotFound(res, 'Hay un error en borrar');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async getDelegationRolesByDelegationId(req: Request, res: Response) {
		const { delegation_id } = req.params;
		try {
			const data =
				await this.delegationRoleService.findDelegationRolesByDelegationId(
					Number(delegation_id)
				);
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
