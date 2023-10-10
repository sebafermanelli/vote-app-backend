import { Request, Response } from 'express';
import { HttpResponse } from '../utils/http.response';
import { Candidate } from './candidate.model';

export class CandidateController {
	constructor(private readonly httpResponse: HttpResponse = new HttpResponse()) {}

	async getCandidates(req: Request, res: Response) {
		try {
			const data = await Candidate.findAll();
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
			const data = await Candidate.findOne({ where: { id } });
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
		try {
			const candidate = await Candidate.create(req.body);
			return this.httpResponse.Ok(res, candidate);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async updateCandidate(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await Candidate.update(req.body, { where: { id } });

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
			const data = await Candidate.destroy({ where: { id } });
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
