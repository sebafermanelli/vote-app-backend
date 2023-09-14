import { DelegationRole } from './delegation_role.model';

export class DelegationRoleService {
	constructor() {}

	async findAllDelegationRole(): Promise<DelegationRole[]> {
		return await DelegationRole.findAll();
	}

	async findDelegationRoleById(id: number): Promise<DelegationRole | null> {
		return await DelegationRole.findOne({ where: { id } });
	}

	async createDelegationRole(body: DelegationRole): Promise<DelegationRole> {
		return await DelegationRole.create(body);
	}

	async updateDelegationRole(
		id: string,
		body: DelegationRole
	): Promise<[affectedCount: number]> {
		return await DelegationRole.update(body, { where: { id } });
	}

	async deleteDelegationRole(id: string): Promise<number> {
		return await DelegationRole.destroy({ where: { id } });
	}

	async findDelegationRolesByDelegationId(
		delegation_id: number
	): Promise<DelegationRole[] | null> {
		return await DelegationRole.findAll({ where: { delegation_id } });
	}

	async findDelegationRoleByListRoleId(
		list_role_id: number
	): Promise<DelegationRole[] | null> {
		return await DelegationRole.findAll({ where: { list_role_id } });
	}
}
