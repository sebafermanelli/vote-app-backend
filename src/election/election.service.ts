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
			rol1Id: winnerList.rol1Id,
			rol2Id: winnerList.rol2Id,
			rol3Id: winnerList.rol3Id,
		};

		const delegation = await Delegation.findOne({ where: { electionId: election.id } });
		await Delegation.update(roles, { where: { id: delegation!.id } });

		let all_votes = 0;
		lists.forEach((list) => {
			all_votes += list.votes;
		});

		election.totalVotes = all_votes;
		election.fechaHoraFin = new Date();
		election.finalizated = true;

		return await election.save();
	}
}
