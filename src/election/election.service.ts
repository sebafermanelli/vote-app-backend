import { DelegationRole } from '../delegation_role/delegation_role.model';
import { List } from '../list/list.model';
import { ListRole } from '../list_role/list_role.model';
import { Election } from './election.model';

export class ElectionService {
	constructor() {}

	async generateResults(
		election: Election,
		lists: Array<List>,
		delegationRoles: Array<DelegationRole>
	): Promise<Election | null> {
		let asignated: Array<number> = [];
		asignated.length = lists.length;
		asignated.forEach((n) => (n = 1));

		delegationRoles.forEach(async (delegationRole: DelegationRole) => {
			let max_quotient = -Infinity;
			let pos = 0;

			lists.forEach(async (list: List, index) => {
				const quotient = list.votes / asignated[index];
				const list_roles = await ListRole.findAll({ where: { id: list.id } });

				if (quotient > max_quotient && list_roles) {
					max_quotient = quotient;
					pos = index;
				}
			});

			asignated[pos] += 1;
			const winner_list_roles = await ListRole.findAll({ where: { list_id: lists[pos].id } });

			winner_list_roles?.forEach(async (listRole: ListRole) => {
				if (listRole.role_id === delegationRole.role_id && listRole.order === delegationRole.order) {
					delegationRole.list_role_id = listRole.id;
					await delegationRole.save();
				}
			});
		});

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
