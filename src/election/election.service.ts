import { Delegation } from '../delegation/delegation.model';
import { List } from '../list/list.model';
import { Election } from './election.model';

export class ElectionService {
	constructor() {}

	async generateResults(election: Election, lists: Array<List>): Promise<Election | null> {
		const winnerList = lists.reduce((result, list) => {
			if (result.votes < list.votes) {
				return list;
			}
			return result;
		});

		const roles = {
			rol1_id: winnerList.rol1_id,
			rol2_id: winnerList.rol2_id,
			rol3_id: winnerList.rol3_id,
		};

		const delegation = await Delegation.findOne({ where: { election_id: election.id } });
		await Delegation.update(roles, { where: { id: delegation!.id } });

		let all_votes = 0;
		lists.forEach((list) => {
			all_votes += list.votes;
		});

		election.total_votes = all_votes;
		election.fecha_hora_fin = new Date();
		election.finalizated = true;

		return await election.save();
	}
}
