import { Request, Response } from 'express';
import { HttpResponse } from '../utils/http.response';
import { Delegation } from './delegation.model';

export class DelegationController {
	constructor(private readonly httpResponse: HttpResponse = new HttpResponse()) {}

	async getDelegations(req: Request, res: Response) {
		try {
			const data = await Delegation.findAll();
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
			const data = await Delegation.findOne({ where: { id } });
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
		const { electionId } = req.body;
		try {
			const data = await Delegation.findOne({ where: { electionId } });
			if (data != null) {
				return this.httpResponse.Error(res, 'Existe dato');
			}
			const delegation = await Delegation.create(req.body);
			return this.httpResponse.Ok(res, delegation);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async updateDelegation(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await Delegation.update(req.body, { where: { id } });

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
			const data = await Delegation.destroy({ where: { id } });
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
