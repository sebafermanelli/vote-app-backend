import { Request, Response } from 'express';
import { HttpResponse } from '../utils/http.response';
import { ElectionUserService } from './election_user.service';

export class ElectionUserController {
	constructor(
		private readonly electionUserService: ElectionUserService = new ElectionUserService(),
		private readonly httpResponse: HttpResponse = new HttpResponse()
	) {}

	async getElectionUsers(req: Request, res: Response) {
		try {
			const data = await this.electionUserService.findAllElectionUser();
			if (data.length === 0) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async getElectionUserById(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.electionUserService.findElectionUserById(
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

	async createElectionUser(req: Request, res: Response) {
		try {
			const election = await this.electionUserService.createElectionUser(
				req.body
			);
			return this.httpResponse.Ok(res, election);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async updateElectionUser(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.electionUserService.updateElectionUser(
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

	async deleteElectionUser(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.electionUserService.deleteElectionUser(
				Number(id)
			);
			if (!data) {
				return this.httpResponse.NotFound(res, 'Hay un error en borrar');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async getElectionUsersByElectionId(req: Request, res: Response) {
		const { election_id } = req.params;
		try {
			const data = await this.electionUserService.findElectionUsersByElectionId(
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
}
