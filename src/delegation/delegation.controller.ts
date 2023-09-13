import { Request, Response } from 'express';
import { HttpResponse } from '../utils/http.response';
import { DelegationService } from './delegation.service';

export class DelegationController {
	constructor(
		private readonly delegationService: DelegationService = new DelegationService(),
		private readonly httpResponse: HttpResponse = new HttpResponse()
	) {}

	async getDelegations(req: Request, res: Response) {
		try {
			const data = await this.delegationService.findAllDelegation();
			if (data.length === 0) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async getDelegationById(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.delegationService.findDelegationById(Number(id));
			if (!data) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async getDelegationByElectionId(req: Request, res: Response) {
		const { election_id } = req.params;
		try {
			const data = await this.delegationService.findDelegationByElectionId(
				Number(election_id)
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

	async createDelegation(req: Request, res: Response) {
		const { election_id } = req.body;
		try {
			const data = await this.delegationService.findDelegationByElectionId(
				election_id
			);
			if (data != null) {
				return this.httpResponse.Error(res, 'Existe dato');
			}
			const delegation = await this.delegationService.createDelegation(
				req.body
			);
			return this.httpResponse.Ok(res, delegation);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async updateDelegation(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.delegationService.updateDelegation(id, req.body);

			if (!data) {
				return this.httpResponse.NotFound(res, 'Hay un error en actualizar');
			}

			return this.httpResponse.Ok(res, data);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async deleteDelegation(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.delegationService.deleteDelegation(id);
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
