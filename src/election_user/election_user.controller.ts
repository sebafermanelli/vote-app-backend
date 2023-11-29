import { Request, Response } from 'express';
import { HttpResponse } from '../utils/http.response';
import { ElectionUser } from './election_user.model';
import { User } from '../user/user.model';
import { List } from '../list/list.model';

export class ElectionUserController {
	constructor(private readonly httpResponse: HttpResponse = new HttpResponse()) {}

	async getElectionUsers(req: Request, res: Response) {
		try {
			const data = await ElectionUser.findAll();
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
			const data = await ElectionUser.findOne({ where: { id } });
			if (!data) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async updateElectionUser(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await ElectionUser.update(req.body, { where: { id } });

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
			const data = await ElectionUser.destroy({ where: { id } });
			if (!data) {
				return this.httpResponse.NotFound(res, 'Hay un error en borrar');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async getElectionsNotVotedYetByUserId(req: Request, res: Response) {
		const { userId } = req.params;
		try {
			const data = await ElectionUser.findAll({ where: { userId, alreadyVote: false } });
			if (!data) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async generateElectionUsers(req: Request, res: Response) {
		const { electionId } = req.params;
		try {
			const users = await User.findAll();
			if (!users) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}

			let data: any = [];
			users.forEach(async (user) => {
				let item = {
					userId: user.id,
					electionId: Number(electionId),
				};

				data = [...data, item];
			});
			data = await ElectionUser.bulkCreate(data);

			return this.httpResponse.Ok(res, data);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async generateVote(req: Request, res: Response) {
		const { userId } = req.params;
		const { electionId, listId } = req.body;

		try {
			const election_user = await ElectionUser.findOne({ where: { userId, electionId } });
			if (!election_user) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			if (election_user.alreadyVote) {
				return this.httpResponse.Error(res, 'Voto existente');
			}

			const list = await List.findOne({ where: { id: listId } });
			if (!list) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}

			const vote = {
				alreadyVote: true,
				votes: list.votes + 1,
			};

			await ElectionUser.update(vote, { where: { id: election_user.id } });
			await List.update(vote, { where: { id: listId } });

			return this.httpResponse.Ok(res, 'Voto registrado');
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}
}
