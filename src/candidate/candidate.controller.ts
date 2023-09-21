import { Request, Response } from 'express';
import { HttpResponse } from '../utils/http.response';
import { CandidateService } from './candidate.service';

export class CandidateController {
	constructor(
		private readonly candidateService: CandidateService = new CandidateService(),
		private readonly httpResponse: HttpResponse = new HttpResponse()
	) {}

	async getCandidates(req: Request, res: Response) {
		try {
			const data = await this.candidateService.findAllCandidate();
			if (data.length === 0) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async getCandidateById(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.candidateService.findCandidateById(Number(id));
			if (!data) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async createCandidate(req: Request, res: Response) {
		const { user_id } = req.body;
		try {
			const data = await this.candidateService.findCandidateByUserId(user_id);
			if (data != null) {
				return this.httpResponse.Error(res, 'Existe dato');
			}
			const candidate = await this.candidateService.createCandidate(req.body);
			return this.httpResponse.Ok(res, candidate);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async updateCandidate(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.candidateService.updateCandidate(id, req.body);

			if (!data) {
				return this.httpResponse.NotFound(res, 'Hay un error en actualizar');
			}

			return this.httpResponse.Ok(res, data);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async deleteCandidate(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.candidateService.deleteCandidate(id);
			if (!data) {
				return this.httpResponse.NotFound(res, 'Hay un error en borrar');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async getCandidateByUserId(req: Request, res: Response) {
		const { user_id } = req.params;
		try {
			const data = await this.candidateService.findCandidateByUserId(user_id);
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
