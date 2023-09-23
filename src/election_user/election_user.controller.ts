import { Request, Response } from 'express';
import { HttpResponse } from '../utils/http.response';
import { ElectionUserService } from './election_user.service';
import { ListService } from '../list/list.service';
import { UserService } from '../user/user.service';

export class ElectionUserController {
	constructor(
		private readonly electionUserService: ElectionUserService = new ElectionUserService(),
		private readonly httpResponse: HttpResponse = new HttpResponse(),
		private readonly listService: ListService = new ListService(),
		private readonly userService: UserService = new UserService()
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
			const data = await this.electionUserService.findElectionUserById(Number(id));
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
			const data = await this.electionUserService.createElectionUser(req.body);
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async updateElectionUser(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.electionUserService.updateElectionUser(Number(id), req.body);

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
			const data = await this.electionUserService.deleteElectionUser(Number(id));
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
			const data = await this.electionUserService.findElectionUsersByElectionId(Number(election_id));
			if (!data) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async generateElectionUsers(req: Request, res: Response) {
		const { election_id } = req.params;
		try {
			let data: any = [];
			const users = await this.userService.findAllUser();
			if (!users) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}

			users.forEach(async (user) => {
				let item = {
					user_id: user.id,
					election_id: Number(election_id),
				};

				data = [...data, item];
			});
			data = await this.electionUserService.createElectionUsers(data);

			return this.httpResponse.Ok(res, data);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async generateVote(req: Request, res: Response) {
		const { election_id, user_id, list_id } = req.params;

		try {
			const election_user = await this.electionUserService.findElectionUserByElectionIdAndUserId(
				Number(election_id),
				Number(user_id)
			);
			if (!election_user) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			if (election_user.already_vote) {
				return this.httpResponse.Ok(res, 'Voto existente');
			}

			const list = await this.listService.findListById(Number(list_id));
			if (!list) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}

			const vote: any = {
				already_vote: true,
				votes: list.votes + 1,
			};

			const data_election_user = await this.electionUserService.addVoteElectionUser(election_user.id, vote);
			const data_list = await this.listService.addVoteList(list.id, vote);

			return this.httpResponse.Ok(res, {
				election_user: data_election_user,
				list: data_list,
			});
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}
}
