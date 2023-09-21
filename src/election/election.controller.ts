import { Request, Response } from 'express';
import { HttpResponse } from '../utils/http.response';
import { ElectionService } from './election.service';

export class ElectionController {
	constructor(
		private readonly electionService: ElectionService = new ElectionService(),
		private readonly httpResponse: HttpResponse = new HttpResponse()
	) {}

	async getElections(req: Request, res: Response) {
		try {
			const data = await this.electionService.findAllElection();
			if (data.length === 0) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async getElectionById(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.electionService.findElectionById(Number(id));
			if (!data) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async createElection(req: Request, res: Response) {
		try {
			const election = await this.electionService.createElection(req.body);
			return this.httpResponse.Ok(res, election);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async updateElection(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.electionService.updateElection(
				Number(id),
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

	async deleteElection(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.electionService.deleteElection(Number(id));
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
		const { admin_id } = req.params;
		try {
			const data = await this.electionService.findElectionsByAdminId(
				Number(admin_id)
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
