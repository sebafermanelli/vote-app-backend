import { Role } from './role.model';

export class RoleService {
	constructor() {}

	async findAllRole(): Promise<Role[]> {
		return await Role.findAll();
	}

	async findRoleById(id: number): Promise<Role | null> {
		return await Role.findOne({ where: { id } });
	}

	async createRole(body: Role): Promise<Role> {
		return await Role.create(body);
	}

	async updateRole(id: number, body: Role): Promise<[affectedCount: number]> {
		return await Role.update(body, { where: { id } });
	}

	async deleteRole(id: number): Promise<number> {
		return await Role.destroy({ where: { id } });
	}
}
