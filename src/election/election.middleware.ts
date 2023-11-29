import { NextFunction, Request, Response } from 'express';
import { SharedMiddleware } from '../utils/shared.middleware';
import { Election } from './election.model';

export class ElectionMiddleware extends SharedMiddleware {
	constructor() {
		super();
	}

	electionValidator(req: Request, res: Response, next: NextFunction) {
		const { id, description, totalVotes, finalizated, fechaHoraFin, adminId } = req.body;

		const valid = new Election();

		valid.id = id;
		valid.description = description;
		valid.totalVotes = totalVotes;
		valid.finalizated = finalizated;
		valid.fechaHoraFin = fechaHoraFin;
		valid.adminId = adminId;

		this.validator(req, res, next, valid);
	}
}
