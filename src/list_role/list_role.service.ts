import { ListRole } from './list_role.model';

export class ListRoleService {
	constructor() {}

	async findAllListRole(): Promise<ListRole[]> {
		return await ListRole.findAll();
	}

	async findListRoleById(id: number): Promise<ListRole | null> {
		return await ListRole.findOne({ where: { id } });
	}

	async createListRole(body: ListRole): Promise<ListRole> {
		return await ListRole.create(body);
	}

	async updateListRole(
		id: number,
		body: ListRole
	): Promise<[affectedCount: number]> {
		return await ListRole.update(body, { where: { id } });
	}

	async deleteListRole(id: number): Promise<number> {
		return await ListRole.destroy({ where: { id } });
	}
}
