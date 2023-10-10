import { Request, Response } from 'express';
import { HttpResponse } from '../utils/http.response';
import { ElectionService } from './election.service';
import { DelegationRole } from '../delegation_role/delegation_role.model';
import { Election } from './election.model';
import { List } from '../list/list.model';
import { Delegation } from '../delegation/delegation.model';
import { ElectionUser } from '../election_user/election_user.model';

export class ElectionController {
	constructor(
		private readonly electionService: ElectionService = new ElectionService(),
		private readonly httpResponse: HttpResponse = new HttpResponse()
	) {}

	async getElections(req: Request, res: Response) {
		try {
			const data = await Election.findAll();
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
			const data = await Election.findOne({ where: { id } });
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
			const election = await Election.create(req.body);
			return this.httpResponse.Ok(res, election);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async updateElection(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await Election.update(req.body, { where: { id } });
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
			const data = await Election.destroy({ where: { id } });
			if (!data) {
				return this.httpResponse.NotFound(res, 'Hay un error en borrar');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async getListsByElectionId(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await List.findAll({ where: { election_id: id } });
			if (!data) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async getUsersByElectionId(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await ElectionUser.findAll({ where: { election_id: id } });
			if (!data) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async getDelegationByElectionId(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await Delegation.findOne({ where: { election_id: id } });
			if (!data) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async finalizeElection(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const election = await Election.findOne({ where: { id } });
			if (!election) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}

			const delegation = await Delegation.findOne({ where: { election_id: id } });
			if (!delegation) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}

			const delegationRoles = await DelegationRole.findAll({ where: { delegation_id: delegation.id } });
			if (!delegationRoles) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}

			const lists = await await List.findAll({
				where: { election_id: id },
				order: [['votes', 'DESC']],
			});
			if (!lists) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}

			const data_election = await this.electionService.generateResults(election, lists, delegationRoles);

			return this.httpResponse.Ok(res, data_election);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}
}
