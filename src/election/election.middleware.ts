import { NextFunction, Request, Response } from 'express';
import { SharedMiddleware } from '../utils/shared.middleware';
import { Election } from './election.model';

export class ElectionMiddleware extends SharedMiddleware {
	constructor() {
		super();
	}

	electionValidator(req: Request, res: Response, next: NextFunction) {
		const { id, description, total_votes, finalizated, fecha_hora_fin, admin_id } = req.body;

		const valid = new Election();

		valid.id = id;
		valid.description = description;
		valid.total_votes = total_votes;
		valid.finalizated = finalizated;
		valid.fecha_hora_fin = fecha_hora_fin;
		valid.admin_id = admin_id;

		this.validator(req, res, next, valid);
	}
}
