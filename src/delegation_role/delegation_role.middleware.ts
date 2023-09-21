import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { SharedMiddleware } from '../utils/shared.middleware';
import { DelegationRole } from './delegation_role.model';

export class DelegationRoleMiddleware extends SharedMiddleware {
	constructor() {
		super();
	}

	delegationRoleValidator(req: Request, res: Response, next: NextFunction) {
		const { id, order, delegation_id, role_id, list_role_id } = req.body;

		const valid = new DelegationRole();

		valid.id = id;
		valid.order = order;
		valid.delegation_id = delegation_id;
		valid.role_id = role_id;
		valid.list_role_id = list_role_id;

		validate(valid).then((error) => {
			if (error.length > 0) {
				return this.httpResponse.Error(res, error);
			} else {
				next();
			}
		});
	}
}
