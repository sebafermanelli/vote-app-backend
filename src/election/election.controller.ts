import { Request, Response } from 'express';
import { HttpResponse } from '../utils/http.response';
import { ElectionService } from './election.service';
import { ListService } from '../list/list.service';
import { DelegationService } from '../delegation/delegation.service';
import { DelegationRoleService } from '../delegation_role/delegation_role.service';
import { ListRoleService } from '../list_role/list_role.service';

export class ElectionController {
	constructor(
		private readonly electionService: ElectionService = new ElectionService(),
		private readonly httpResponse: HttpResponse = new HttpResponse(),
		private readonly delegationService: DelegationService = new DelegationService(),
		private readonly delegationRoleService: DelegationRoleService = new DelegationRoleService(),
		private readonly listService: ListService = new ListService(),
		private readonly listRoleService: ListRoleService = new ListRoleService()
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
			const data = await this.electionService.updateElection(Number(id), req.body);

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
			const data = await this.electionService.findElectionsByAdminId(Number(admin_id));
			if (!data) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async generateResults(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const election = await this.electionService.findElectionById(Number(id));
			if (!election) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}

			const delegation = await this.delegationService.findDelegationByElectionId(Number(id));
			if (!delegation) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}

			const delegationRoles = await this.delegationRoleService.findDelegationRolesByDelegationId(delegation.id);
			if (!delegationRoles) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}

			const lists = await this.listService.findListsByElectionIdOrderByVotes(Number(id));
			if (!lists) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}

			let asignated: Array<number> = [];
			asignated.length = lists.length;
			asignated.forEach((n) => (n = 1));

			delegationRoles.forEach(async (role) => {
				let max_quotient = -Infinity;
				let pos = 0;

				lists.forEach((list, index) => {
					const quotient = list.votes / asignated[index];
					if (quotient > max_quotient) {
						max_quotient = quotient;
						pos = index;
					}
				});

				if (lists[pos]) {
					asignated[pos] += 1;

					const winner_list_roles = await this.listRoleService.findAllListRolesByListId(lists[pos].id);

					if (!winner_list_roles) {
						return this.httpResponse.NotFound(res, 'No existe dato');
					}
					winner_list_roles?.forEach(async (listRole) => {
						if (listRole.role_id === role.role_id && listRole.order === role.order) {
							let role_update: any = {
								list_role_id: listRole.id,
							};
							await this.delegationRoleService.updateDelegationRole(role.id, role_update);
						}
					});
				}
			});

			let all_votes = 0;
			lists.forEach((list) => {
				all_votes += list.votes;
			});
			console.log(all_votes);
			let election_update: any = {
				total_votes: all_votes,
				fecha_hora_fin: new Date(),
				finalizated: true,
			};
			const data_election = await this.electionService.updateElection(Number(id), election_update);

			return this.httpResponse.Ok(res, {
				election: data_election,
			});
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}
}
